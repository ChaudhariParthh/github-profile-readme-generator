import { createFileRoute, redirect } from "@tanstack/react-router";

// Old sub-path links (/gitprofile-studio/...) redirect to the real pages.
export const Route = createFileRoute("/gitprofile-studio/$")({
  beforeLoad: ({ params }) => {
    const rest = (params._splat ?? "").replace(/^\/+|\/+$/g, "");
    if (rest === "builder") throw redirect({ to: "/builder", replace: true });
    throw redirect({ to: "/", replace: true });
  },
});
