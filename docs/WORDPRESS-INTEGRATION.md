# TodayNepal WordPress integration

Vercel deployment alone cannot rewrite a WordPress path on a separate server.

Steps:
1. Verify a READY standalone Vercel deployment and test every main tool.
2. Back up the WordPress site and check there is no conflicting /design page.
3. Create /design on the existing WordPress site with a verified iframe embed, or set up an authorized reverse proxy.
4. Validate mobile layout, file downloads and microphone permission.
5. Verify public https://todaynepal.com/design/ rather than assuming that a Vercel deployment means this URL is working.

On November 6 2026, the connected WordPress API returned HTTP 500 (WordPress critical error) when querying this route. The page cannot be treated as live until the WordPress issue is repaired and public access is checked.

Do not modify the WordPress news homepage or DNS without separate verification.
