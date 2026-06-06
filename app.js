require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const multer  = require('multer');

const app    = express();
const upload = multer({ dest: 'uploads/', limits: { fileSize: 50*1024*1024 } });

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

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

// ── PHI-4 ANALYSIS ────────────────────────────────────
app.post('/api/analyze', async (req, res) => {
  const { transcript } = req.body;
  if (!transcript) return res.status(400).json({ error: 'No transcript provided' });

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(
      `${process.env.AZURE_PHI_ENDPOINT}/chat/completions`,
      {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.AZURE_PHI_KEY}`
        },
        body: JSON.stringify({
          model: 'Phi-4',
          messages: [
            {
              role: 'system',
              content: 'You are a POSH legal analyst for India. Analyze the evidence provided and give exactly 4-5 bullet points starting with -. Each bullet is one specific finding. No headings. No explanations. Analyze what is given.'
            },
            {
              role: 'user',
              content: `Analyze this workplace harassment evidence:\n\n${transcript}`
            }
          ],
          max_tokens: 500,
          temperature: 0.2
        })
      }
    );
    clearTimeout(timeout);
    const data = await response.json();
    console.log('Phi-4 response status:', response.status);
    if(!response.ok){
      console.error('Phi-4 API error:', JSON.stringify(data));
      return res.status(500).json({ error: 'Phi-4 API error', detail: data });
    }
    const analysis = data.choices?.[0]?.message?.content || '';
    console.log('Phi-4 analysis length:', analysis.length);
    res.json({ analysis });
  } catch (err) {
    console.error('Phi-4 error type:', err.name);
    console.error('Phi-4 error message:', err.message);
    console.error('Phi-4 error cause:', err.cause);
    if(err.name === 'AbortError'){
      return res.status(504).json({ error: 'Phi-4 timeout' });
    }
    res.status(500).json({ error: 'Analysis failed', detail: err.message });
  }
});

// ── AZURE SPEECH-TO-TEXT ──────────────────────────────
app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const fs   = require('fs');
  const file = req.file;

  console.log(`Transcribing: ${file.originalname} (${file.mimetype}, ${file.size} bytes)`);

  try {
    const audioBuffer = fs.readFileSync(file.path);
    const region      = process.env.AZURE_SPEECH_REGION || 'eastus';
    const key         = process.env.AZURE_SPEECH_KEY;

    // Azure Speech supports: wav, ogg, mp3, m4a, flac via REST
    // Set content type based on file type
    const mimeType = file.mimetype || 'audio/wav';
    const speechEndpoint = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-IN&format=detailed`;

    const response = await fetch(speechEndpoint, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': mimeType,
        'Accept': 'application/json'
      },
      body: audioBuffer
    });

    const text = await response.text();
    console.log('Speech API raw response:', text.substring(0, 200));

    let transcript = '';
    try {
      const data = JSON.parse(text);
      // Extract from detailed format
      if (data.NBest && data.NBest.length > 0) {
        transcript = data.NBest[0].Display || data.NBest[0].Lexical || '';
      } else if (data.DisplayText) {
        transcript = data.DisplayText;
      }
    } catch(e) {
      console.log('JSON parse error:', e.message);
    }

    // Clean up temp file
    fs.unlinkSync(file.path);

    if (transcript && transcript.trim().length > 0) {
      res.json({ transcript, filename: file.originalname });
    } else {
      // Return empty so frontend knows to use mock
      res.json({ transcript: '', filename: file.originalname });
    }

  } catch (err) {
    console.error('Speech error:', err.message);
    try { require('fs').unlinkSync(file.path); } catch(e){}
    res.json({ transcript: '', filename: file.originalname });
  }
});

// ── TOKEN GENERATOR ───────────────────────────────────
app.post('/api/generate-token', (req, res) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let token = 'SV-';
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) token += chars[Math.floor(Math.random() * chars.length)];
    if (i < 3) token += '-';
  }
  res.json({ token, timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🛡️  SafeVoice AI running at http://localhost:${PORT}`);
  console.log(`   Model:   Microsoft Phi-4`);
  console.log(`   Phi-4:   ${process.env.AZURE_PHI_KEY    ? '✅ Connected' : '⚠️  Mock mode'}`);
  console.log(`   Speech:  ${process.env.AZURE_SPEECH_KEY ? '✅ Connected' : '⚠️  Mock mode'}`);
  console.log(`   Portal:  http://localhost:${PORT}\n`);
});

// ── DEBUG ROUTE: test speech directly ─────────────────
app.get('/api/test-speech', async (req, res) => {
  const region = process.env.AZURE_SPEECH_REGION || 'eastus';
  const key    = process.env.AZURE_SPEECH_KEY;
  res.json({
    region,
    keyPresent: !!key,
    keyPrefix:  key ? key.substring(0,6)+'...' : 'none',
    endpoint: `https://${region}.stt.speech.microsoft.com`
  });
});
