import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/gitprofile-studio/")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
});
