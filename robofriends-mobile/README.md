# RoboFriends Mobile

This is the real React Native mobile app workspace for RoboFriends, built with Expo.

## Run

```bash
npm install
npm start
```

If Expo Go times out on your local Wi-Fi, use tunnel mode:

```bash
npm run start:tunnel
```

Then use:

- `a` for Android
- `i` for iOS on macOS
- Expo Go for device testing

## Android deployment

Google Play deployment is prepared with Expo EAS.

Build a production Android bundle:

```bash
npm run build:android
```

Submit to Google Play:

```bash
npm run submit:android
```

Current Android application id:

```text
com.cmgeorges.robofriends
```

## Current scope

- Mobile account flow with persisted session
- Robot directory fetched from the demo API
- Searchable robot cards
- QR avatar sharing panel

## Next mobile steps

- Add native navigation
- Move auth to a real backend
- Add app icons, splash, and platform branding
- Add mobile test coverage

## Google Play notes

- Google Play requires an Android App Bundle (`.aab`) for new apps.
- You will need to sign in to Expo and connect the Google Play Console service account when submitting.

## Troubleshooting

- If Expo Go says the request timed out, first try `npm run start:tunnel`.
- Keep Expo Go updated to the latest version.
- Make sure the phone and computer are on the same network if using normal LAN mode.
