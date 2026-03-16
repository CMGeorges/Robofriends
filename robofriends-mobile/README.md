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

## Troubleshooting

- If Expo Go says the request timed out, first try `npm run start:tunnel`.
- Keep Expo Go updated to the latest version.
- Make sure the phone and computer are on the same network if using normal LAN mode.
