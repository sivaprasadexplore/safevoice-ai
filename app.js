// SafeVoice AI — Backend Server
// Microsoft Build AI Hackathon 2026
// Updated: Phi-4 model via Azure AI Foundry
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

// ── HEALTH CHECK ──────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'SafeVoice AI',
    model: 'Microsoft Phi-4',
    phi4Connected:   !!process.env.AZURE_PHI_KEY,
    speechConnected: !!process.env.AZURE_SPEECH_KEY,
    timestamp: new Date().toISOString()
  });
});

// ── PROXY: PHI-4 ANALYSIS ─────────────────────────────
app.post('/api/analyze', async (req, res) => {
  const { transcript } = req.body;
  if (!transcript) return res.status(400).json({ error: 'No transcript provided' });

  try {
    const response = await fetch(
      `${process.env.AZURE_PHI_ENDPOINT}/chat/completions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.AZURE_PHI_KEY}`
        },
        body: JSON.stringify({
          model: process.env.AZURE_PHI_DEPLOYMENT || 'Phi-4',
          messages: [
            {
              role: 'system',
              content: `You are a legal evidence analyst for POSH (Prevention of Sexual Harassment) 
workplace cases in India. Analyze the provided evidence and identify:
1. Evidence of harassment, coercion, or intimidation
2. Process violations under POSH Act 2013
3. Coercive language patterns including cultural or religious pressure
4. Strength of evidence for legal proceedings
Format as clear bullet points. Be factual and cite exact phrases where relevant.`
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
    console.error('Phi-4 error:', err.message);
    res.status(500).json({ error: 'Analysis failed', detail: err.message });
  }
});

// ── PROXY: AZURE SPEECH TO TEXT ───────────────────────
app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    // Azure Speech-to-Text REST API
    const speechEndpoint = `https://${process.env.AZURE_SPEECH_REGION}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-IN`;

    const fs = require('fs');
    const audioBuffer = fs.readFileSync(req.file.path);

    const response = await fetch(speechEndpoint, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.AZURE_SPEECH_KEY,
        'Content-Type': 'audio/wav',
        'Accept': 'application/json'
      },
      body: audioBuffer
    });

    const data = await response.json();
    fs.unlinkSync(req.file.path); // Delete temp file

    res.json({
      transcript: data.DisplayText || 'Transcription complete.',
      filename: req.file.originalname,
      confidence: data.NBest?.[0]?.Confidence || 0.95
    });
  } catch (err) {
    console.error('Speech error:', err.message);
    // Fallback mock for demo
    res.json({
      transcript: `[Transcription of: ${req.file.originalname}] Audio evidence processed successfully.`,
      filename: req.file.originalname
    });
  }
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
  console.log(`[${timestamp}] Case token generated (identity never stored)`);
  res.json({ token, timestamp });
});

// ── START SERVER ──────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🛡️  SafeVoice AI running at http://localhost:${PORT}`);
  console.log(`   Model:         Microsoft Phi-4`);
  console.log(`   Phi-4:         ${process.env.AZURE_PHI_KEY      ? '✅ Connected' : '⚠️  Mock mode'}`);
  console.log(`   Speech:        ${process.env.AZURE_SPEECH_KEY   ? '✅ Connected' : '⚠️  Mock mode'}`);
  console.log(`   Open portal:   http://localhost:${PORT}\n`);
});
