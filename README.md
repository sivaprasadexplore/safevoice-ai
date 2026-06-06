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
Evidence upload (audio, video, docs) with chain of custody
Victim confirms all uploads before AI runs — no accidental triggers
Back navigation — victim can review and edit answers before submitting
Unique case token — the only link between reporter and case
Pillar 2 — Evidence Intelligence
Azure Speech-to-Text transcribes audio evidence automatically (WAV supported)
Microsoft Phi-4 analyzes all evidence together — one consolidated summary
Detects coercive language, career threats, cultural pressure, abuse of power
Tamper detection via cryptographic hash at upload
Court-admissible chain-of-custody logging with timestamps
Pillar 3 — Retaliation Shield + SOS
SOS alert system with 3 severity levels — hostile, retaliation, emergency
Two-step confirmation prevents accidental SOS triggers
Real-time location sharing (GPS or manual) for security team dispatch
Dead man's switch — auto-escalates if authorities don't respond within SLA
Panic button for immediate Level 3 alert when victim cannot type
---
🔧 Tech Stack
Currently Integrated (MVP)
Technology	Purpose	Evidence
Microsoft Phi-4	Evidence analysis + conversational intake	`/api/analyze` in app.js
Azure Speech-to-Text	Audio transcription (WAV)	`/api/transcribe` in app.js
Node.js / Express	Backend API server	`app.js`
HTML / CSS / JavaScript	Frontend portal (single-file MVP)	`index.html`
Planned — Phase 2 & 3
Technology	Purpose	Phase
Azure Document Intelligence	PDF and image evidence extraction	Phase 2
Azure Language Services	Sentiment + coercion pattern scoring	Phase 2
Azure Confidential Computing	Zero-knowledge identity protection	Phase 2
Azure Monitor & Log Analytics	Retaliation pattern detection	Phase 3
Azure Cosmos DB	Case store — token only, no identity	Phase 2
---
🚀 Getting Started
Prerequisites
Node.js v18+
Microsoft Phi-4 deployed via Azure AI Foundry
Azure Speech Services key (East US region)
Installation
```bash
git clone https://github.com/sivaprasadexplore/safevoice-ai.git
cd safevoice-ai
npm install
cp .env.example .env
# Add your Azure keys to .env — see .env.example
node app.js
```
Environment Variables
Create a `.env` file — never commit this to GitHub:
```env
# Microsoft Phi-4 (Azure AI Foundry)
AZURE_PHI_ENDPOINT=https://your-resource.services.ai.azure.com/openai/v1
AZURE_PHI_KEY=your_key_here
AZURE_PHI_DEPLOYMENT=Phi-4

# Azure Speech-to-Text
AZURE_SPEECH_KEY=your_speech_key_here
AZURE_SPEECH_REGION=eastus

PORT=3000
```
Quick Demo (No Azure Keys Needed)
Open `index.html` directly in browser — runs in mock mode with realistic demo data.
```
Access code: SafeVoice2026
```
> **Demo note:** The access code is for hackathon submission only.
> The actual SafeVoice AI application requires **no login** — fully anonymous by design.
Running with Real Azure AI (For Judges)
To see real Microsoft Phi-4 and Azure Speech-to-Text in action:
Step 1 — Add your Azure keys to `.env`:
```env
AZURE_PHI_ENDPOINT=https://your-resource.services.ai.azure.com/openai/v1
AZURE_PHI_KEY=your_key_here
AZURE_PHI_DEPLOYMENT=Phi-4
AZURE_SPEECH_KEY=your_speech_key_here
AZURE_SPEECH_REGION=eastus
```
Step 2 — Set `MOCK_MODE` to `false` in `index.html`:
```javascript
// Find this line in index.html (search for MOCK_MODE)
MOCK_MODE: false,   // ← change from true to false
```
Step 3 — Start the server:
```bash
node app.js
```
Step 4 — Open `http://localhost:3000`, enter password `SafeVoice2026`, upload a WAV audio file or text document — real Phi-4 analysis will appear within seconds.
> **Note:** `MOCK_MODE: true` is set by default in the repository so the public Netlify demo runs without Azure keys. Set to `false` locally with your own keys for real AI integration.
---
📱 Portal — 9 Screens
Screen	Purpose
Home	Clean entry — Report, Status, SOS, Resources
Guided Intake	5 Phi-4 guided questions with back navigation
Evidence Upload	Audio/docs — user confirms before AI analyzes
Case Token	Anonymous token — no identity linked
Check Status	Token-based case tracking — no login needed
SOS Alert	3 severity levels + panic button + location
Alert Sent	Confirmation + ETA + responders notified
Knowledge Hub	POSH rights + mental health + FAQ
Support Contacts	ICC, HR, EAP, Security, Legal — anonymous call log
---
🏗️ Architecture
```
Victim (Anonymous Browser)
        │
        ▼
┌─────────────────────────┐
│  SafeVoice AI Portal    │  ← index.html
│  No login in production │  ← Demo has access code only
└──────────┬──────────────┘
           │ REST API
           ▼
┌─────────────────────────┐
│  Node.js / Express      │  ← app.js
│  Azure keys in .env     │  ← Never in GitHub
└──────────┬──────────────┘
           │
    ┌──────┴──────────┐
    ▼                 ▼
Microsoft Phi-4   Azure Speech-to-Text
(Evidence         (Audio
 analysis)         transcription)
```
---
🗺️ Roadmap
Phase	Timeline	Scope
Phase 1 (MVP)	Now	POSH reporting, Phi-4 evidence analysis, Azure Speech, SOS alerts, case token
Phase 2	3–6 months	Document Intelligence, financial fraud, whistleblower, multi-language support
Phase 3	6–12 months	Leadership dashboard, HRMS integration, SEBI auto-reporting, Azure Monitor
---
🔐 Data Privacy
SafeVoice AI processes only synthetic demo data in this submission. No real personal data used.
Victim identity never stored — case token only
Evidence files deleted after processing
Chain of custody logged for every access
`.env` file with keys is never committed to GitHub
All demo audio and text is synthetically generated for this submission
---
⚖️ Legal Framework
POSH Act 2013 — Prevention of Sexual Harassment at Workplace
Whistleblowers Protection Act 2014
IT Act 2000 — Unauthorized access provisions
SEBI LODR Regulations — Vigil mechanism requirements
---
🏭 Architecture Note
For the MVP we chose a single-file frontend to maximise build speed during the hackathon. The production version follows a component-based architecture with separate modules for auth, intake, evidence processing, SOS, and the leadership dashboard.
---
🤖 AI Tools Disclosure
As required by hackathon guidelines:
Tool	Used For
GitHub Copilot	Code suggestions
Claude (Anthropic)	Architecture design, solution ideation, documentation
Microsoft Phi-4	Core AI functionality within the application
Azure Speech-to-Text	Audio evidence transcription
All solution design, domain expertise, and architecture reflect human creativity and 19+ years of enterprise experience.
---
👤 Team
Name	Role
Siva Prasad Chilukuri	Solution Architect · Developer · Domain Expert
Background: 19+ years across enterprise software — PeopleSoft HCM/FSCM, Solution Architecture, Customer Success, Business Analysis. ISB Executive Management Program Alumni. Delivered enterprise solutions for Edelman, Honeywell, Cox Enterprises, Citibank, General Motors, FedEx.
---
📄 License
MIT License — see LICENSE file for details.
---
"We don't surveil people. We audit processes. Every cover-up leaves a data trail. We follow it."
