# UberEats Clone

[![CI Status](https://github.com/Zombizz97/UberEats/actions/workflows/ci.yml/badge.svg)](https://github.com/Zombizz97/UberEats/actions/workflows/ci.yml)

Ce projet contient un client Vue 3 + Vite et une API Node/Express.

- Dossier `client/`: frontend (Vite + Vue 3 + Vuetify)
- Dossier `server/`: backend (Express + Mongoose)

Remplacez OWNER/REPO par l'organisation et le nom de votre dépôt GitHub.

## Développement

- Frontend: voir `client/README.md`
- Backend: voir `server/README.md` (à créer si nécessaire)

## Intégration Continue

Le workflow GitHub Actions `ci.yml` exécute:
- Lint (front + back)
- Tests (front + back) et upload des couvertures comme artefacts (30 jours)
- Build du frontend (Vite)
- Audit de sécurité npm (non bloquant)

En cas d'échec, un résumé est publié dans l'onglet Summary du job "Notify Failure" avec:
- la branche
- le commit
- la liste des jobs en échec et leur statut
