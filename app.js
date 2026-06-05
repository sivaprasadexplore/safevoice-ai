// SafeVoice AI — Backend Server
// Microsoft Build AI Hackathon 2026
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const multer  = require('multer');

const app    = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ── SERVE PORTAL ──────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ── INJECT AZURE CONFIG TO FRONTEND ──────────────────
app.get('/config', (req, res) => {
  // Only expose what frontend needs — never expose secret keys directly
  // In production use Azure Managed Identity instead
  res.json({
    endpoint:   process.env.AZURE_OPENAI_ENDPOINT || '',
    deployment: process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o',
    region:     process.env.AZURE_SPEECH_REGION || 'eastus',
    mockMode:   !process.env.AZURE_OPENAI_KEY
  });
});

// ── PROXY: AZURE OPENAI ───────────────────────────────
app.post('/api/analyze', async (req, res) => {
  const { transcript } = req.body;
  if (!transcript) return res.status(400).json({ error: 'No transcript provided' });

  try {
    const response = await fetch(
      `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=2024-02-01`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.AZURE_OPENAI_KEY
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `You are a legal evidence analyst for POSH (Prevention of Sexual Harassment) workplace cases in India. 
Analyze the provided transcript or document and identify:
1. Evidence of harassment, coercion, or intimidation
2. Process violations (ICC quorum, timeline, confidentiality breaches)
3. Coercive language patterns including cultural or religious pressure
4. Strength of evidence for legal proceedings
Format as clear, factual bullet points. Be specific and cite exact phrases where relevant.`
            },
            {
              role: 'user',
              content: `Analyze this evidence from a POSH complaint:\n\n${transcript}`
            }
          ],
          max_tokens: 600,
          temperature: 0.2
        })
      }
    );
    const data = await response.json();
    res.json({ analysis: data.choices[0].message.content });
  } catch (err) {
    console.error('Azure OpenAI error:', err.message);
    res.status(500).json({ error: 'Analysis failed', detail: err.message });
  }
});

// ── PROXY: FILE UPLOAD + TRANSCRIPTION ───────────────
app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  // In production: send file to Azure Speech-to-Text REST API
  // https://eastus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1
  // For demo: return mock transcript
  const mockTranscript = `[Transcription of: ${req.file.originalname}]
This is where Azure Speech-to-Text output would appear.
Duration: ${(req.file.size / 8000).toFixed(1)} seconds estimated.
Language detected: English (India)`;

  res.json({ transcript: mockTranscript, filename: req.file.originalname });
});

// ── CASE TOKEN GENERATOR ──────────────────────────────
app.post('/api/generate-token', (req, res) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let token = 'SV-';
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) token += chars[Math.floor(Math.random() * chars.length)];
    if (i < 3) token += '-';
  }
  const timestamp = new Date().toISOString();
  // In production: store case data (NOT identity) with token in Azure Cosmos DB
  console.log(`[${timestamp}] New case token generated: ${token.substring(0,5)}*** (identity never stored)`);
  res.json({ token, timestamp });
});

// ── HEALTH CHECK ──────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'SafeVoice AI',
    azureOpenAI: !!process.env.AZURE_OPENAI_KEY,
    azureSpeech: !!process.env.AZURE_SPEECH_KEY,
    timestamp: new Date().toISOString()
  });
});

// ── START ──────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🛡️  SafeVoice AI running at http://localhost:${PORT}`);
  console.log(`   Azure OpenAI: ${process.env.AZURE_OPENAI_KEY ? '✅ Connected' : '⚠️  Mock mode (add key to .env)'}`);
  console.log(`   Azure Speech: ${process.env.AZURE_SPEECH_KEY ? '✅ Connected' : '⚠️  Mock mode (add key to .env)'}\n`);
});
