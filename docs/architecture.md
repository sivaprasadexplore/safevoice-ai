SafeVoice AI — Architecture Notes
Overview
SafeVoice AI is a single-page web application backed by a Node.js/Express server that proxies requests to Microsoft Azure AI services.
---
MVP Architecture (Currently Built)
```
Victim (Anonymous Browser)
        │
        │  HTTPS / localhost
        ▼
┌───────────────────────────┐
│   index.html              │  Single-page portal
│   Frontend                │  Zero identity collected
│   Password gate (demo)    │  Production has no login
└──────────┬────────────────┘
           │
           │  REST API calls
           ▼
┌───────────────────────────┐
│   app.js                  │  Node.js / Express backend
│   API Server              │  Holds Azure keys securely in .env
└──────┬────────────────────┘
       │
  ┌────┴──────────────────┐
  │                       │
  ▼                       ▼
Microsoft Phi-4       Azure Speech-to-Text
via Azure AI Foundry  East US region
/openai/v1/           /speech/recognition/
chat/completions      conversation/v1
  │                       │
  ▼                       ▼
Evidence analysis     Audio transcription
4-5 bullet findings   WAV format supported
consolidated summary  Returns DisplayText
```
---
Data Flow — Evidence Upload
```
Victim uploads file(s)
        │
        ├── Audio (WAV) ──► Azure Speech-to-Text ──► Transcript text
        │
        └── Text/Doc ────► FileReader API ──────────► Raw text
                │
                └── All content combined
                        │
                        ▼
                Microsoft Phi-4
                (consolidated analysis)
                        │
                        ▼
                4-5 specific findings
                displayed to victim
```
---
Data Flow — Anonymous Case Token
```
Victim completes intake + evidence
        │
        ▼
Token generated on frontend
SV-XXXX-XXXX-XXXX
(cryptographically random, no identity link)
        │
        ▼
Token shown to victim — save this only
        │
        ▼
Victim uses token to:
  - Check case status
  - Raise SOS alert
  - Reference when calling support contacts
```
---
SOS Alert Flow
```
Victim enters token → sees status → clicks SOS
        │
        ▼
Two-step confirmation (prevents accidental trigger)
        │
        ▼
Severity selected:
  Level 1 → Hostile environment  → ICC notified (2 hrs SLA)
  Level 2 → Retaliation          → ICC + HR (15 min SLA)
  Level 3 → Physical threat      → Security + CEO + Police (immediate)
        │
        ▼
Location sharing (optional):
  GPS  → Browser Geolocation API → coordinates captured
  Manual → Free text → floor/room description
  Skip → SOS sent without location
        │
        ▼
Security team dispatched with case history + location
```
---
Privacy Architecture
```
What is stored:          What is NEVER stored:
─────────────────        ─────────────────────
Case token only          Victim name
Evidence files           Employee ID
(deleted after           Email address
 processing)             Phone number
Timestamp of filing      IP address
SOS alert timestamp      Location (deleted on resolve)
```
---
Azure Services Used (MVP)
Service	Region	Tier	Endpoint Pattern
Microsoft Phi-4	East US	Standard	`/openai/v1/chat/completions`
Azure Speech-to-Text	East US	Free F0	`eastus.stt.speech.microsoft.com`
---
Azure Services — Phase 2 Roadmap
Service	Purpose
Azure Document Intelligence	PDF and image evidence extraction
Azure Language Services	Coercion pattern scoring
Azure Cosmos DB	Case store — token only, no identity
Azure Confidential Computing	Zero-knowledge identity vault
Azure Monitor	Retaliation pattern detection
Azure Static Web Apps	Production deployment with AAD auth
---
Security Design
Keys: All Azure keys stored in `.env` — never in source code or GitHub
Auth: Demo uses simple session password. Production uses Azure Active Directory role-based access — ICC officers only
Evidence: Files processed in memory, deleted from server after analysis. No persistent storage in MVP.
Token: Generated client-side using cryptographically random characters. Not stored on server in MVP. Phase 2 stores token-only record in Azure Cosmos DB.
---
Running Locally
```bash
# Install dependencies
npm install

# Create .env with Azure keys
cp .env.example .env

# Start server
node app.js

# Open browser
http://localhost:3000

# Enter demo password
SafeVoice2026
```
---
File Structure
```
safevoice-ai/
├── index.html          ← Complete frontend (single-file MVP)
├── app.js              ← Express backend + Azure API proxy
├── package.json        ← Dependencies
├── .env.example        ← Environment template (safe to commit)
├── .gitignore          ← Protects .env and secrets
├── README.md           ← Project documentation
└── docs/
    └── architecture.md ← This file
```
---
Why Single-File Frontend
For the MVP we chose a single `index.html` to maximise build speed during the hackathon period. This allowed us to iterate rapidly across all 9 screens without a build toolchain.
Production refactor separates concerns into:
`css/styles.css`
`js/auth.js`
`js/intake.js`
`js/upload.js`
`js/sos.js`
`js/knowledge.js`
---
"We don't surveil people. We audit processes."
