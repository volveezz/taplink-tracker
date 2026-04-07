import { resolveBootstrapPayload } from "./server/posthog-bootstrap.js";

export default {
  async fetch(request: Request) {
    const payload = await resolveBootstrapPayload(request.url);
    return Response.json(payload, {
      headers: {
        "cache-control": "no-store",
      },
    });
  },
};
