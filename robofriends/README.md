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

## GitHub Pages CI/CD

This web app can be published for free on GitHub Pages.

Automatic deployment is now defined in:

- [deploy-web-pages.yml](/Users/camsl/OneDrive/Documents/GitHub/Robofriends/.github/workflows/deploy-web-pages.yml)

How it works:

- every push to `master` that touches the web app runs tests
- the app is built with `npm run build:prod`
- the generated `build/` output is pushed to the `gh-pages` branch

GitHub setup required once:

1. Open the repository on GitHub.
2. Go to `Settings` -> `Pages`.
3. Set `Source` to `Deploy from a branch`.
4. Select branch `gh-pages` and folder `/ (root)`.
5. Keep the repo public if you want free public hosting.

Current public URL:

- [cmgeorges.github.io/Robofriends](https://cmgeorges.github.io/Robofriends/)

## Réalité produit

- La structure frontend est désormais prête pour `staging` et `production`.
- L'auth actuelle reste locale pour la démo.
- Pour une vraie prod publique, il faut brancher un backend sécurisé derrière `authService`.
- Avec `react-scripts` 4, les builds doivent tourner sous Node 20 LTS, pas Node 23.
