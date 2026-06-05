# SafeVoice AI 🛡️
### *When Silence is Not an Option*

> **Microsoft Build AI Hackathon 2026** — Theme: *AI Meets Data: From Noise to Insight*

An AI-powered workplace compliance platform that transforms raw, unstructured enterprise data into accountability intelligence — protecting victims, preserving evidence, and ensuring POSH Act compliance processes are enforced, not just documented.

---

## 🎯 The Problem

Every year, thousands of workplace harassment complaints in India are silenced — not because evidence doesn't exist, but because the systems meant to protect victims are compromised from within.

A complaint is filed. The victim is taken to the very person heading the ICC. Pressured. Brainwashed. The complaint withdrawn in 41 hours. The data trail of this cover-up — ICC meeting duration, member absence, late-night messages, timeline violations — existed in enterprise systems. **Nobody was watching.**

---

## 💡 The Solution — Three Pillars

### Pillar 1 — Guided Anonymous Reporting
- Conversational AI intake — empathetic, not an intimidating form
- Zero login, zero identity stored anywhere
- Evidence upload (audio, video, documents) with chain of custody
- Unique case token — the only link between reporter and case

### Pillar 2 — Evidence Intelligence
- Azure Speech-to-Text transcribes audio/video evidence automatically
- Azure OpenAI analyzes and summarizes what the evidence proves
- Detects coercive language, pressure tactics, religious coercion patterns
- Tamper detection via cryptographic hash at upload
- Court-admissible chain-of-custody logging

### Pillar 3 — Retaliation Shield
- Baseline snapshot locked at moment of filing
- Monitors performance ratings, meeting inclusion, system access
- Flags statistically significant deviations post-filing
- Dead man's switch — alerts external compliance officer automatically

---

## 🏗️ Architecture

```
Reporter (Anonymous)
        │
        ▼
┌─────────────────────────────────────────┐
│         SafeVoice AI Portal              │
│   (Zero login · Zero identity stored)   │
└────────────────┬────────────────────────┘
                 │
        ┌────────▼────────┐
        │  Azure OpenAI   │  ← Conversational intake
        │    GPT-4o       │  ← Evidence narrative
        └────────┬────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
Azure        Azure Doc    Azure
Speech    Intelligence  Language
to Text      (PDFs)     Services
(Audio)                (Sentiment)
    │            │            │
    └────────────┼────────────┘
                 │
        ┌────────▼────────┐
        │  Case Token     │  ← Identity-free
        │  Generator      │
        └────────┬────────┘
                 │
        ┌────────▼────────┐
        │ Azure Monitor   │  ← Retaliation Shield
        │ & Log Analytics │
        └─────────────────┘
```

---

## 🔧 Tech Stack

| Technology | Purpose |
|---|---|
| Azure OpenAI GPT-4o | Conversational intake + evidence analysis |
| Azure Speech-to-Text | Audio/video transcription |
| Azure Document Intelligence | PDF and document extraction |
| Azure Language Services | Sentiment + coercion detection |
| Azure Confidential Computing | Zero-knowledge identity protection |
| Azure Monitor & Log Analytics | Retaliation pattern detection |
| HTML / CSS / JavaScript | Frontend portal |
| Node.js | Backend API |
| Python | Data processing scripts |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Azure account with OpenAI access (East US region)
- Azure Speech Services key
- Azure Document Intelligence key

### Installation

```bash
# Clone the repository
git clone https://github.com/sivaprasadexplore/safevoice-ai.git
cd safevoice-ai

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Add your Azure keys to .env file
# (Never commit .env to GitHub)
```

### Environment Variables

Create a `.env` file in the root directory:

```env
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_KEY=your_key_here
AZURE_OPENAI_DEPLOYMENT=gpt-4o

AZURE_SPEECH_KEY=your_speech_key_here
AZURE_SPEECH_REGION=eastus

AZURE_DOCUMENT_KEY=your_doc_intelligence_key_here
AZURE_DOCUMENT_ENDPOINT=https://your-resource.cognitiveservices.azure.com/
```

### Run the Application

```bash
# Start the development server
npm start

# Open in browser
http://localhost:3000
```

---

## 📁 Project Structure

```
safevoice-ai/
├── index.html              ← Main portal (single page app)
├── app.js                  ← Backend API server
├── package.json
├── .env.example            ← Environment template (safe to commit)
├── .gitignore              ← Protects .env and secrets
├── README.md
└── docs/
    └── architecture.md     ← Detailed architecture notes
```

---

## 🔐 Data Privacy

SafeVoice AI processes **only synthetic, artificially generated data** in this demonstration. No real personal data, complaint records, or employee information has been used.

In production, the system is architected on **Azure Confidential Computing** with zero-knowledge identity protection — meaning victim identity is never stored in any retrievable form. All evidence is encrypted at upload with chain-of-custody logging ensuring court admissibility.

All demo data was generated specifically for this hackathon submission and contains no sensitive personal information.

**Data handling principles:**
- Victim identity is never stored — only a case token
- Evidence encrypted at rest and in transit
- Chain of custody logged for every file access
- Role-based access — only independent ICC members can view cases
- Auto-deletion after legally mandated retention period

---

## ⚖️ Legal Framework

SafeVoice AI is designed for compliance with:
- **POSH Act 2013** — Prevention of Sexual Harassment at Workplace
- **Whistleblowers Protection Act 2014**
- **IT Act 2000** — Unauthorized access provisions
- **SEBI LODR Regulations** — Vigil mechanism requirements

---

## 🗺️ Roadmap

| Phase | Timeline | Scope |
|---|---|---|
| Phase 1 (MVP) | Now | POSH reporting, evidence AI, case token, ICC compliance |
| Phase 2 | 3–6 months | Financial fraud, data misuse, safety violations, multi-language |
| Phase 3 | 6–12 months | Enterprise intelligence, SEBI auto-reporting, HRMS integration |

---

## 🤖 AI Tools Used

In compliance with hackathon guidelines, the following AI tools were used in development:

- **GitHub Copilot** — Code suggestions and boilerplate
- **Claude (Anthropic)** — Architecture design, documentation, and solution ideation
- **Azure OpenAI GPT-4o** — Core AI functionality within the application

All meaningful engineering decisions, system design, domain expertise, and solution architecture reflect human creativity and 19+ years of enterprise experience.

---

## 👤 Author

**Siva Prasad Chilukuri**
Enterprise Solution Architect | 19+ Years
ISB Executive Management Program Alumni

---

## 📄 License

MIT License — see LICENSE file for details.

---

*"We don't surveil people. We audit processes. Every cover-up leaves a data trail. We follow it."*
