import { site } from "@/lib/site";

export function GET() {
  const teamId = process.env.APPLE_TEAM_ID ?? "TEAMID";

  return Response.json(
    {
      applinks: {
        apps: [],
        details: [
          {
            appID: `${teamId}.${site.bundleId}`,
            paths: ["/join*", "/identify*", "/auth/*", "/download"],
          },
        ],
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
