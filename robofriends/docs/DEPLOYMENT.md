# Deployment

## Commandes

### Local

```bash
npm start
```

### Staging

```bash
npm run build:staging
```

### Production

```bash
npm run build:prod
```

## Variables d'environnement

Copier `.env.example` puis injecter les bonnes valeurs selon la cible.

## Recommandations

1. `staging` doit utiliser des endpoints et des credentials isolés.
2. `production` doit recevoir ses variables depuis la plateforme d'hébergement.
3. `REACT_APP_AUTH_PROVIDER=local` reste un mode démo, pas un mode prod.

## Checklist release

1. `npm ci`
2. `npm test -- --watchAll=false`
3. `npm run build:staging`
4. Validation manuelle sur staging
5. `npm run build:prod`
6. Déploiement production
