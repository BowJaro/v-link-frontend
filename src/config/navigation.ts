// Navigation configuration for VIX Platform

export type Role = "admin" | "innovator" | "seeker" | "investor";

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  kokoCount?: boolean;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const getNavSections = (role: Role): NavSection[] => {
  if (role === "admin") {
    return [
      {
        label: "Admin",
        items: [
          { id: "dashboard", label: "Platform Analytics", icon: "📊" },
          { id: "argonauts", label: "Argonauts", icon: "⚔" },
        ],
      },
    ];
  }

  return [
    {
      label: "Platform",
      items: [
        { id: "home", label: "Home", icon: "⬡" },
        { id: "innovations", label: "Innovation Marketplace", icon: "◈" },
        { id: "argonauts", label: "Argonauts", icon: "⚔" },
        { id: "challenges", label: "Challenge Marketplace", icon: "◎" },
        { id: "funding", label: "Funding", icon: "◆" },
      ],
    },
    {
      label: "Discover",
      items: [{ id: "recruitment", label: "Team Recruitment", icon: "👥" }],
    },
    {
      label: "My Workspace",
      items: [
        { id: "my-innovations", label: "My Innovations", icon: "🔬" },
        { id: "my-projects", label: "My Projects", icon: "🗂" },
        { id: "koko", label: "Koko", icon: "⭐", kokoCount: true },
      ],
    },
    {
      label: "Account",
      items: [{ id: "dashboard", label: "Dashboard", icon: "📊" }],
    },
  ];
};

export const isNavItemActive = (itemId: string, currentPage: string): boolean => {
  if (currentPage === itemId) return true;
  if (itemId === "innovations" && currentPage.startsWith("ip-")) return true;
  if (
    itemId === "argonauts" &&
    (currentPage.startsWith("arg-") ||
      currentPage === "post-argonauts" ||
      currentPage.startsWith("edit-arg"))
  )
    return true;
  return false;
};

export const getPageName = (page: string, navSections: NavSection[]): string => {
  if (page.startsWith("ip-")) return "IP / Project Detail";
  if (page.startsWith("arg-") && !page.startsWith("edit-arg"))
    return "Argonauts Mission Detail";
  if (page.startsWith("edit-arg")) return "Edit Argonauts";
  if (page === "post-argonauts") return "Post Argonauts";
  if (page === "koko") return "⭐ Koko";
  return (
    navSections.flatMap((s) => s.items).find((n) => n.id === page)?.label ||
    page
  );
};
