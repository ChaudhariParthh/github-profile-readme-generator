import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ReadmePreview } from "@/components/ReadmePreview";
import { seedProfile } from "@/lib/profile";

describe("ReadmePreview import", () => {
  it("calls onImport with the typed username when the Import button is clicked", () => {
    const onImport = vi.fn();
    render(<ReadmePreview p={seedProfile} onImport={onImport} />);

    const input = screen.getByPlaceholderText("username");
    fireEvent.change(input, { target: { value: "ChaudhariParthh" } });
    fireEvent.click(screen.getByRole("button", { name: /import/i }));

    expect(onImport).toHaveBeenCalledWith("ChaudhariParthh");
  });

  it("does not call onImport when input is empty", () => {
    const onImport = vi.fn();
    render(<ReadmePreview p={seedProfile} onImport={onImport} />);
    fireEvent.click(screen.getByRole("button", { name: /import/i }));
    expect(onImport).not.toHaveBeenCalled();
  });

  it("trims whitespace and ignores surrounding spaces", () => {
    const onImport = vi.fn();
    render(<ReadmePreview p={seedProfile} onImport={onImport} />);

    const input = screen.getByPlaceholderText("username");
    fireEvent.change(input, { target: { value: "  ChaudhariParthh  " } });
    fireEvent.click(screen.getByRole("button", { name: /import/i }));

    expect(onImport).toHaveBeenCalledWith("ChaudhariParthh");
  });
});
