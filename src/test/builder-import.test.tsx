import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { Builder } from "@/routes/builder";
import { fetchGitHubProfile } from "@/lib/github";

const mockFetch = vi.mocked(fetchGitHubProfile);

vi.mock("@/lib/github", () => ({
  fetchGitHubProfile: vi.fn(),
}));

const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

describe("Builder GitHub import", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockResolvedValue({
      user: { login: "ChaudhariParthh", name: "Parth Chaudhari", bio: "Hi", location: "Earth", twitter_username: null, blog: null, avatar_url: "", html_url: "", public_repos: 26, followers: 0, following: 1 },
      repos: [], top: [], languages: [], languageStats: [], warning: null, followers: 0, following: 0, publicRepos: 26,
    });
  });

  it("imports the typed GitHub username via ReadmePreview Import button", async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router}>
          <Builder />
        </RouterProvider>
      </QueryClientProvider>,
    );

    // ReadmePreview import UI is shown by default (seedProfile.username is empty).
    const input = screen.getByPlaceholderText("username");
    fireEvent.change(input, { target: { value: "ChaudhariParthh" } });
    fireEvent.click(screen.getByRole("button", { name: /import/i }));

    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith("ChaudhariParthh"));

    // After successful import, username is set and import UI is replaced by the readme.
    await waitFor(() => expect(screen.queryByPlaceholderText("username")).not.toBeInTheDocument());
  });

  it("calls fetchGitHubProfile with p.username when no argument is passed", async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router}>
          <Builder />
        </RouterProvider>
      </QueryClientProvider>,
    );

    const input = screen.getByPlaceholderText("username");
    fireEvent.change(input, { target: { value: "otheruser" } });
    fireEvent.click(screen.getByRole("button", { name: /import/i }));

    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith("otheruser"));
  });
});
