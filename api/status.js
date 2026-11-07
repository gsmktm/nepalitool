// Read-only availability endpoint. No user identifiers or secrets.
export function GET() {
  const result = {
    ok: true,
    application: "TodayNepal Studio",
    apiVersion: 1,
    kind: "read-only",
    features: ["festivals", "festival-dates", "daily-quote"],
    deployment: process.env.VERCEL_ENV || "local"
  };
  return Response.json(result, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=30, stale-while-revalidate=60",
      "X-Content-Type-Options": "nosniff"
    }
  });
}
