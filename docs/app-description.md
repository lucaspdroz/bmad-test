# ztalk App Description

ztalk is a mobile-first communication aid app designed for people with speech disabilities. The app uses an accessible card-based interface to help users express themselves quickly with text-to-speech playback.

## Core features

- Card CRUD: create, edit, delete custom phrase cards
- Folder (group) management: create, rename, delete folders and assign cards
- Drag and drop: reorder cards within folders and move cards between folders
- TTS playback: tap a card to instantly speak the phrase using native device TTS
- Offline-first: local storage persistency with fast load and interaction

## Design principles

- Large, high-contrast UI suitable for low vision and motor accessibility
- Minimal navigation and cognitive overhead
- High responsiveness: instant speech on tap, no lag
- Simplified MVP that can be extended with sync/back-end later

## Target users

- Individuals with speech impairments
- Caregivers, therapists, and communication support teams

## Architecture

- Ionic Angular application (Capacitor) for cross-platform Android/iOS deployment
- Local storage for data and folders
- Modular pages/components for cards, folders, and TTS utilities
- Reusable services for data persistence and text-to-speech integration
