---
stepsCompleted: [1]
inputDocuments:
  - docs/prd.md
  - docs/requirements.md
  - docs/architecture.md
workflowType: 'architecture'
project_name: 'ztalk'
user_name: 'Lodash'
date: '2026-03-19T23:00:00Z'
---

# ztalk Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## 1. Project Overview

- Name: ztalk
- Goal: Mobile-assisted communication board for people with speech impairments.
- Platforms: Android/iOS (Ionic + Capacitor)
- Data: Local storage first (offline), later optional sync.

## 2. Requirements Summary

### Functional
- Cards: create/edit/delete/tap-to-speak
- Folders: create/rename/delete/assign
- Drag and drop: reorder + move
- Speech: native TTS instant playback

### Non-Functional
- Accessibility: large buttons, high contrast UI
- Offline-first, fast response
- Simple UX

### Constraints
- MVP simple, no backend initially

## 3. Architecture Decisions (initial)

1. Use Ionic Angular application scaffold (already created).  
2. Use Capacitor for cross-platform mobile packaging.  
3. Implement storage with LocalStorage or Capacitor Storage plugin; treat as single source of truth.  
4. Design state model as folder -> cards relation.  
5. Use Web Speech API / Capacitor TTS plugin for native text-to-speech.  
6. Support drag-and-drop within folder/card UI using Ionic reorder groups.

## 4. Next step

- Continue with step-02-context to verify domain context and produce detailed decision records.
- Confirm no additional docs to load, then proceed.
