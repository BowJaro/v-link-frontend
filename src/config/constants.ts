// Design tokens for V-LINK Innovation Platform

export const APP_NAME = "V-LINK";
export const APP_TAGLINE = "Connect. Innovate. Collaborate.";

export const TRL_COLORS = {
  1: "#EF4444",
  2: "#F97316",
  3: "#F59E0B",
  4: "#EAB308",
  5: "#84CC16",
  6: "#22C55E",
  7: "#10B981",
  8: "#06B6D4",
  9: "#3B82F6",
} as const;

export const TRL_LABELS = {
  1: "Basic Principles",
  2: "Technology Concept",
  3: "Experimental Proof",
  4: "Lab Validation",
  5: "Relevant Environment",
  6: "Prototype Demo",
  7: "System Prototype",
  8: "System Complete",
  9: "Actual System",
} as const;

export const CAT_COLORS = {
  AgriTech: "#16A34A",
  FinTech: "#2563EB",
  CleanTech: "#0891B2",
  HealthTech: "#DB2777",
  Logistics: "#EA580C",
  EnergyTech: "#CA8A04",
  Manufacturing: "#7C3AED",
  GovTech: "#475569",
  EdTech: "#9333EA",
  BioTech: "#059669",
} as const;

export const ROLE_CFG = {
  admin: { color: "#7C3AED", bg: "#F5F0FF", label: "Admin", icon: "⚙" },
  innovator: { color: "#2563EB", bg: "#EFF6FF", label: "Innovator", icon: "🔬" },
  seeker: { color: "#D97706", bg: "#FFFBEB", label: "Seeker", icon: "🏢" },
  investor: { color: "#059669", bg: "#F0FDF4", label: "Investor", icon: "💼" },
} as const;

export const STATUS_CFG = {
  draft: { label: "Draft", color: "#94A3B8" },
  pending: { label: "Pending Review", color: "#F59E0B" },
  published: { label: "Published", color: "#10B981" },
  rejected: { label: "Rejected", color: "#EF4444" },
  active: { label: "Active Project", color: "#2563EB" },
} as const;

export const PERM_COLOR = {
  owner: "#7C3AED",
  editor: "#2563EB",
  contributor: "#10B981",
  viewer: "#94A3B8",
} as const;

export const NEWS_TYPE_COLORS = {
  update: "#2563EB",
  research: "#7C3AED",
  funding: "#10B981",
  milestone: "#D97706",
  announcement: "#0891B2",
  general: "#94A3B8",
} as const;

export const FIELDS_LIST: string[] = [
  "AgriTech",
  "FinTech",
  "CleanTech",
  "HealthTech",
  "Logistics",
  "EnergyTech",
  "Manufacturing",
  "GovTech",
  "EdTech",
  "BioTech",
];

export const ARGONAUTS_STATUS = {
  open: { label: "Open", color: "#10B981", icon: "🟢" },
  forming: { label: "Team Forming", color: "#F59E0B", icon: "🟡" },
  launched: { label: "Project Launched", color: "#2563EB", icon: "🚀" },
  closed: { label: "Closed", color: "#94A3B8", icon: "⚫" },
} as const;

export const DISCIPLINES_LIST = [
  "AI & Machine Learning",
  "Materials Science",
  "Robotics & Automation",
  "Biomedical Engineering",
  "Environmental Science",
  "Software Engineering",
  "Data Science",
  "Mechanical Engineering",
  "Chemical Engineering",
  "Electrical Engineering",
  "Social Sciences",
  "Business & Commercialization",
] as const;

export const NOTIF_ICONS = {
  approval: "✅",
  solution: "📥",
  investment: "💰",
  nda: "📋",
  match: "🎯",
  project: "🤝",
  recruit: "👋",
  update: "📢",
  news: "📰",
  koko: "⭐",
  argonauts: "⚔",
  invite: "📨",
  accepted: "🎉",
  candidate: "👤",
  formed: "🚀",
} as const;
