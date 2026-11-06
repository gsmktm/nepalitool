# TodayNepal Studio 🇳🇵

Original Nepal-first digital tool studio for todaynepal.com/design. Inspired by the public feature categories on aNepali.com, not a copy of its branding, content, source code, proprietary fonts, or original design.

## Routes

- / — home; /tools/ — directory
- /fonts/ — curated previews and official links to twelve open-licensed font families
- /unicode-to-preeti/ and /preeti-to-unicode/ — bidirectional font conversion
- /easy-nepali-typing/ — best-effort local phonetic transliteration
- /voice-typing/ — browser Speech Recognition if supported
- /typing-test/ — typing speed and accuracy
- /documents/ — browser document editing, text export and print to PDF
- /poster-maker/ — original PNG social poster generator
- /background-remover/ — solid-color color-key removal, NOT AI segmentation
- /profile-maker/ — Nepal-themed PNG frames
- /nepali-numbers/ — Nepali and English digit conversion
- /about/, /privacy/, /support/ — information

All navigation links are functional; no accounts or backend upload API.

## Development

Node.js 20+; run npm install, then npm run dev, or npm run build for production. Vercel detects Vite.

## Integration

Deploy the standalone Vercel project from this repository. It will be available on its own vercel.app domain. The actual todaynepal.com/design URL belongs to a separate WordPress origin and needs a WordPress page embed or an authoritative reverse-proxy rule, with public verification.

A WordPress Custom HTML block may embed the verified standalone URL using an iframe with width 100%, min-height 1150px, border 0 and microphone permission. For first-party path links, use a reverse proxy rather than an iframe. Do not alter DNS or existing WordPress home pages automatically.

## Privacy

Text conversion, document editing, image processing and PNG exports are local to the browser. Draft plain text is stored in localStorage. Voice recognition may be processed remotely by the browser vendor. Google Fonts load from Google's CDN.

## Attribution

- Original design and app code: TodayNepal Studio.
- @lacspace/preeti v1.1.0 — Lacspace Free Licence v1.0, https://developer.lacspace.com/licenses/lacspace-free-1.0 ; project https://github.com/lacspace/packages
- Google Fonts are linked to the original official licensing/author pages. No third-party proprietary font binaries are copied.
- Not affiliated with aNepali.com.

## Honest limits

This is a substantial initial implementation, not identical full feature parity with aNepali's proprietary 200+ font catalog or advanced background-removal tool. Complex Preeti combinations, browser speech support and actual WordPress integration need browser/production QA.
