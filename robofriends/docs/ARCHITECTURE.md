# Architecture

## Objectif

Préparer RoboFriends pour un cycle d'environnements `local -> staging -> production` avec une structure propre et remplaçable.

## Couches

### `src/config`

- Centralise la configuration runtime.
- Lit uniquement des variables `REACT_APP_*`.
- Permet de changer l'API, le partage et le provider d'authentification sans toucher l'UI.

### `src/services`

- `http`: client HTTP minimal.
- `robots`: accès aux données robot via une URL configurable.
- `auth`: façade d'authentification avec provider local remplaçable.
- `share`: génération d'URLs de partage et QR codes.

### `src/components`

- Conserve une responsabilité purement UI.
- Ne connaît pas `fetch`, `localStorage` ni les URLs d'environnement.

### `src/containers`

- Coordonne les flux d'écran.
- Branche les services applicatifs sur les composants.

## Environnements

Fichiers fournis:

- `.env.example`
- `.env.staging`
- `.env.production`

Variables actuelles:

- `REACT_APP_ENVIRONMENT`
- `REACT_APP_API_BASE_URL`
- `REACT_APP_SHARE_BASE_URL`
- `REACT_APP_QR_BASE_URL`
- `REACT_APP_AUTH_PROVIDER`
- `REACT_APP_ENABLE_QR_SHARING`

## Prêt aujourd'hui

- Base frontend structurée pour `staging` et `production`
- Couche de services remplaçable
- Point d'entrée pour backend auth futur
- Point d'entrée pour API métier future

## À faire avant une vraie prod publique

- Backend d'auth sécurisé
- Gestion de tokens et expiration
- Secrets gérés par plateforme
- Observabilité centralisée
- CI/CD avec promotion staging vers prod
