import { site } from "@/lib/site";

export function GET() {
  const fingerprint = process.env.ANDROID_SHA256_FINGERPRINT ?? "";

  return Response.json(
    [
      {
        relation: ["delegate_permission/common.handle_all_urls"],
        target: {
          namespace: "android_app",
          package_name: site.bundleId,
          sha256_cert_fingerprints: fingerprint ? [fingerprint] : [],
        },
      },
    ],
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
