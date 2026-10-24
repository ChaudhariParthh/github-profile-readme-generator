import { PRESETS, type Profile } from "@/lib/profile";
import { applyAppearance } from "@/lib/appearance";

export type TemplateDefinition = {
  id: string;
  title: string;
  preview: string;
  presetId: keyof typeof PRESETS;
  appearanceId: string;
};

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: "minimal",
    title: "Minimal",
    preview: "/templates/minimal.png",
    presetId: "Minimal",
    appearanceId: "minimal-mono",
  },
  {
    id: "professional",
    title: "Professional",
    preview: "/templates/professional.png",
    presetId: "Professional",
    appearanceId: "editorial-light",
  },
  {
    id: "animated-developer",
    title: "Animated Developer",
    preview: "/templates/animated-developer.png",
    presetId: "Animated Developer",
    appearanceId: "midnight-aurora",
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    preview: "/templates/ai-engineer.png",
    presetId: "AI Engineer",
    appearanceId: "neon-cyber",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    preview: "/templates/cybersecurity.png",
    presetId: "Cybersecurity",
    appearanceId: "terminal-hacker",
  },
  {
    id: "student-portfolio",
    title: "Student Portfolio",
    preview: "/templates/student-portfolio.png",
    presetId: "Student Portfolio",
    appearanceId: "ocean-depths",
  },
  {
    id: "cosmic-builder",
    title: "Cosmic Builder",
    preview: "/templates/cosmic-builder.png",
    presetId: "Professional",
    appearanceId: "cosmic-galaxy",
  },
  {
    id: "sunset-creator",
    title: "Sunset Creator",
    preview: "/templates/sunset-creator.png",
    presetId: "Student Portfolio",
    appearanceId: "sunset-horizon",
  },
  {
    id: "glass-prism",
    title: "Glass Prism",
    preview: "/templates/glass-prism.png",
    presetId: "Animated Developer",
    appearanceId: "glass-prism",
  },
  {
    id: "mountain-night",
    title: "Mountain Night",
    preview: "/templates/mountain-night.png",
    presetId: "Professional",
    appearanceId: "mountain-night",
  },
];

export function applyTemplate(profile: Profile, templateId: string): Profile {
  const template = TEMPLATES.find((entry) => entry.id === templateId);
  if (!template) return profile;
  return applyAppearance(
    {
      ...PRESETS[template.presetId],
      name: profile.name,
      username: profile.username,
      location: profile.location,
    },
    template.appearanceId,
  );
}
