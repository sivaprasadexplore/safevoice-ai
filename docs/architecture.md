# SafeVoice AI — Architecture Notes

## Overview

SafeVoice AI is a single-page web application backed by a Node.js/Express server that proxies requests to Microsoft Azure AI services.

## Architecture Diagram

```
User (Anonymous Browser)
        │
        │  HTTPS
        ▼
┌───────────────────┐
│   index.html      │  ← Single-page portal
│   (Frontend)      │  ← Zero identity collected
└────────┬──────────┘
         │  REST API calls
         ▼
┌───────────────────┐
│   app.js          │  ← Node.js/Express backend
│   (API Server)    │  ← Holds Azure keys securely
└────────┬──────────┘
         │
    ┌────┴────────────────────────────┐
    │                                 │
    ▼                                 ▼
Azure OpenAI GPT-4o           Azure Speech-to-Text
(Evidence analysis,            (Audio transcription,
 guided conversation)          voice evidence)
    │
    ▼
Azure Document Intelligence
(PDF, image processing)
    │
    ▼
Azure Language Services
(Sentiment, coercion detection)

## Privacy Architecture

1. NO identity is ever collected
2. Case token = only link between user and case
3. Azure keys held server-side only (never in frontend)
4. All file uploads processed in memory then discarded
5. In production: Azure Confidential Computing for data isolation

## Azure Services Used

| Service | Tier | Cost for Demo |
|---|---|---|
| Azure OpenAI GPT-4o | S0 | ~$0.01/request |
| Speech-to-Text | F0 Free | 5 hrs/month free |
| Document Intelligence | F0 Free | 500 pages/month free |
| Language Services | F0 Free | 5000 records/month free |

## Running in Mock Mode

Set MOCK_MODE = true in index.html (default) to run without Azure keys.
All AI responses are pre-loaded realistic demos.
Set to false and add .env keys for real Azure integration.
```
