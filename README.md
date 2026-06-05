SafeVoice AI 🛡️
When Silence is Not an Option
> **Microsoft Build AI Hackathon 2026** — Theme: *AI Meets Data: From Noise to Insight*
An AI-powered workplace compliance platform that transforms raw, unstructured enterprise data into accountability intelligence — protecting victims, preserving evidence, and ensuring POSH Act compliance processes are enforced, not just documented.
---
🎯 The Problem
Every year, thousands of workplace harassment complaints in India are silenced — not because evidence doesn't exist, but because the systems meant to protect victims are compromised from within.
A complaint is filed. The victim is taken to the very person heading the ICC. Pressured. Brainwashed. The complaint withdrawn in 41 hours. The data trail of this cover-up — ICC meeting duration, member absence, late-night messages, timeline violations — existed in enterprise systems. Nobody was watching.
---
💡 The Solution — Three Pillars
Pillar 1 — Guided Anonymous Reporting
Conversational AI intake powered by Microsoft Phi-4 — empathetic, not an intimidating form
Zero login, zero identity stored anywhere
Evidence upload (audio, video, documents) with chain of custody
Unique case token — the only link between reporter and case
Pillar 2 — Evidence Intelligence
Azure Speech-to-Text transcribes audio/video evidence automatically
Microsoft Phi-4 analyzes and summarizes what the evidence proves in plain English
Detects coercive language, pressure tactics, religious coercion patterns
Tamper detection via cryptographic hash at upload
Court-admissible chain-of-custody logging
Pillar 3 — Retaliation Shield
Baseline snapshot locked at moment of filing
Monitors performance ratings, meeting inclusion, system access
Flags statistically significant deviations post-filing
Dead man's switch — alerts external compliance officer automatically
---
🔧 Tech Stack
Technology	Purpose
Microsoft Phi-4	Conversational intake + evidence analysis
Azure Speech-to-Text	Audio/video transcription
Azure Document Intelligence	PDF and document extraction
Azure Language Services	Sentiment + coercion detection
Azure Confidential Computing	Zero-knowledge identity protection
Azure Monitor & Log Analytics	Retaliation pattern detection
HTML / CSS / JavaScript	Frontend portal
Node.js / Express	Backend API server
---
🚀 Getting Started
Prerequisites
Node.js v18+
Azure account
Microsoft Phi-4 deployed via Azure AI Foundry
Azure Speech Services key
Installation
```bash
git clone https://github.com/sivaprasadexplore/safevoice-ai.git
cd safevoice-ai
npm install
cp .env.example .env
# Add your Azure keys to .env
npm start
```
Environment Variables
```env
# Microsoft Phi-4
AZURE_PHI_ENDPOINT=https://your-project.services.ai.azure.com/models
AZURE_PHI_KEY=your_key_here
AZURE_PHI_DEPLOYMENT=Phi-4

# Azure Speech
AZURE_SPEECH_KEY=your_speech_key_here
AZURE_SPEECH_REGION=eastus
```
Quick Demo (No Keys Needed)
Open `index.html` directly in browser — runs in mock mode with realistic demo data.
---
🔐 Data Privacy
SafeVoice AI processes only synthetic data in this demonstration. No real personal data has been used.
In production:
Victim identity is never stored — only a case token
Evidence encrypted at rest and in transit via Azure Confidential Computing
Chain of custody logged for every file access
Role-based access — only independent ICC members can view cases
---
⚖️ Legal Framework
POSH Act 2013 — Prevention of Sexual Harassment at Workplace
Whistleblowers Protection Act 2014
IT Act 2000 — Unauthorized access provisions
SEBI LODR Regulations — Vigil mechanism requirements
---
🗺️ Roadmap
Phase	Timeline	Scope
Phase 1 (MVP)	Now	POSH reporting, evidence AI, case token, ICC compliance
Phase 2	3–6 months	Financial fraud, data misuse, safety violations, multi-language
Phase 3	6–12 months	Enterprise intelligence, SEBI reporting, HRMS integration
---
🤖 AI Tools Disclosure
As required by hackathon guidelines:
GitHub Copilot — Code suggestions
Claude (Anthropic) — Architecture design and documentation
Microsoft Phi-4 — Core AI functionality within the application
All solution design, domain expertise, and architecture reflect human creativity and 19+ years of enterprise experience.
---
👤 Author
Siva Prasad Chilukuri
Enterprise Solution Architect | 19+ Years | ISB Alumni
---
"We don't surveil people. We audit processes. Every cover-up leaves a data trail. We follow it."
