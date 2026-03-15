# RoboFriends Engineering Baseline

Cette branche pose une base plus sérieuse pour la migration mobile et la préparation `staging` / `production` de RoboFriends.

## Ce qui a changé

- UI mobile-first modernisée
- Login, compte et partage QR
- Configuration d'environnement centralisée
- Couche de services pour API, auth et partage
- Documentation d'architecture et de déploiement

## Commandes

```bash
npm install
npm start
```

Node recommande:

```bash
20.x LTS
```

Build staging:

```bash
npm run build:staging
```

Build production:

```bash
npm run build:prod
```

Tests:

```bash
npm test -- --watchAll=false
```

## Documentation

- [Architecture](./docs/ARCHITECTURE.md)
- [Deployment](./docs/DEPLOYMENT.md)

## Réalité produit

- La structure frontend est désormais prête pour `staging` et `production`.
- L'auth actuelle reste locale pour la démo.
- Pour une vraie prod publique, il faut brancher un backend sécurisé derrière `authService`.
- Avec `react-scripts` 4, les builds doivent tourner sous Node 20 LTS, pas Node 23.
