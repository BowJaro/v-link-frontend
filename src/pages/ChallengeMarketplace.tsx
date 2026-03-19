import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ChallengeMarketplaceProps {
  addNotif?: (notif: any) => void;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  bounty: number;
  submissionCount: number;
  reviewedCount: number;
  visibility: "public" | "blind" | "selected";
  deadline: string;
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
}

const CHALLENGES: Challenge[] = [
  {
    id: "c1",
    title: "AI Optimization Challenge",
    description: "Develop an AI algorithm to optimize supply chain operations",
    bounty: 50000,
    submissionCount: 24,
    reviewedCount: 5,
    visibility: "public",
    deadline: "2026-04-30",
    tags: ["AI", "Optimization", "Supply Chain"],
    difficulty: "hard",
  },
  {
    id: "c2",
    title: "Sustainable Packaging Design",
    description: "Design eco-friendly packaging for consumer goods",
    bounty: 25000,
    submissionCount: 42,
    reviewedCount: 12,
    visibility: "public",
    deadline: "2026-05-15",
    tags: ["Design", "Sustainability", "Materials"],
    difficulty: "medium",
  },
  {
    id: "c3",
    title: "Healthcare Data Security",
    description: "Implement HIPAA-compliant data protection mechanisms",
    bounty: 75000,
    submissionCount: 18,
    reviewedCount: 3,
    visibility: "blind",
    deadline: "2026-06-01",
    tags: ["Security", "Healthcare", "Compliance"],
    difficulty: "hard",
  },
  {
    id: "c4",
    title: "Mobile App UX Research",
    description: "Conduct UX research for fintech mobile application",
    bounty: 15000,
    submissionCount: 56,
    reviewedCount: 20,
    visibility: "public",
    deadline: "2026-04-15",
    tags: ["UX", "Research", "Mobile"],
    difficulty: "easy",
  },
];

export const ChallengeMarketplace: React.FC<ChallengeMarketplaceProps> = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedVisibility, setSelectedVisibility] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("bounty");

  const filteredChallenges = CHALLENGES.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = !selectedDifficulty || c.difficulty === selectedDifficulty;
    const matchesVisibility = !selectedVisibility || c.visibility === selectedVisibility;
    return matchesSearch && matchesDifficulty && matchesVisibility;
  }).sort((a, b) => {
    if (sortBy === "bounty") return b.bounty - a.bounty;
    if (sortBy === "submissions") return b.submissionCount - a.submissionCount;
    if (sortBy === "difficulty") {
      const order = { easy: 1, medium: 2, hard: 3 };
      return order[b.difficulty as keyof typeof order] - order[a.difficulty as keyof typeof order];
    }
    return 0;
  });

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "0.5rem" }}>Challenges</h1>
          <p style={{ color: "#64748B" }}>Participate in challenges and earn rewards</p>
        </div>
        <button
          style={{
            padding: "0.75rem 1.5rem",
            background: "#3B82F6",
            color: "white",
            border: "none",
            borderRadius: "0.75rem",
            fontWeight: "600",
            cursor: "pointer",
          }}
          onClick={() => navigate("/challenges/new")}
        >
          + Post Challenge
        </button>
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search challenges..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "0.75rem",
            border: "1px solid #E2E8F0",
            borderRadius: "0.75rem",
            maxWidth: "300px",
          }}
        />

        <select
          value={selectedDifficulty || ""}
          onChange={(e) => setSelectedDifficulty(e.target.value || null)}
          style={{
            padding: "0.75rem",
            border: "1px solid #E2E8F0",
            borderRadius: "0.75rem",
            maxWidth: "150px",
          }}
        >
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select
          value={selectedVisibility || ""}
          onChange={(e) => setSelectedVisibility(e.target.value || null)}
          style={{
            padding: "0.75rem",
            border: "1px solid #E2E8F0",
            borderRadius: "0.75rem",
            maxWidth: "150px",
          }}
        >
          <option value="">All Visibility</option>
          <option value="public">Public</option>
          <option value="blind">Blind</option>
          <option value="selected">Selected Only</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: "0.75rem",
            border: "1px solid #E2E8F0",
            borderRadius: "0.75rem",
            maxWidth: "150px",
          }}
        >
          <option value="bounty">Highest Bounty</option>
          <option value="submissions">Most Submissions</option>
          <option value="difficulty">Difficulty</option>
        </select>

        <span style={{ marginLeft: "auto", color: "#64748B", fontSize: "0.9rem" }}>
          Showing {filteredChallenges.length} challenges
        </span>
      </div>

      {/* Challenge Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.5rem" }}>
        {filteredChallenges.map((challenge) => (
          <div
            key={challenge.id}
            style={{
              background: "white",
              border: "1px solid #E2E8F0",
              borderRadius: "1rem",
              padding: "1.5rem",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={() => navigate(`/challenges/${challenge.id}`)}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: "700" }}>{challenge.title}</h3>
              <span
                style={{
                  padding: "0.25rem 0.75rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  background:
                    challenge.difficulty === "easy"
                      ? "#DCFCE7"
                      : challenge.difficulty === "medium"
                        ? "#FEF3C7"
                        : "#FEE2E2",
                  color:
                    challenge.difficulty === "easy"
                      ? "#16A34A"
                      : challenge.difficulty === "medium"
                        ? "#CA8A04"
                        : "#DC2626",
                }}
              >
                {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
              </span>
            </div>

            <p style={{ color: "#64748B", marginBottom: "0.75rem", fontSize: "0.9rem" }}>
              {challenge.description}
            </p>

            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
              {challenge.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: "#DBEAFE",
                    color: "#1E40AF",
                    borderRadius: "0.5rem",
                    fontSize: "0.8rem",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem", marginBottom: "0.75rem", textAlign: "center" }}>
              <div>
                <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Bounty</div>
                <div style={{ fontWeight: "700" }}>${(challenge.bounty / 1000).toFixed(0)}k</div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Submissions</div>
                <div style={{ fontWeight: "700" }}>{challenge.submissionCount}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Reviewed</div>
                <div style={{ fontWeight: "700" }}>{challenge.reviewedCount}</div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#64748B", paddingTop: "0.75rem", borderTop: "1px solid #E2E8F0" }}>
              <span>
                {challenge.visibility === "public"
                  ? "🌐 Public"
                  : challenge.visibility === "blind"
                    ? "👁️ Blind"
                    : "🔒 Selected"}
              </span>
              <span>Due: {new Date(challenge.deadline).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredChallenges.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem", color: "#94A3B8" }}>
          <p>No challenges found</p>
          <button
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1.5rem",
              background: "#F1F5F9",
              border: "1px solid #E2E8F0",
              borderRadius: "0.75rem",
              cursor: "pointer",
            }}
            onClick={() => {
              setSearchTerm("");
              setSelectedDifficulty(null);
              setSelectedVisibility(null);
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};
