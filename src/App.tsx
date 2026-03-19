// @ts-nocheck
import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { KokoProvider } from "./context/KokoContext";
import { Navigation } from "./components/layout/Navigation";
import "./styles/global.css";
import "./styles/layout.css";

type Role = "admin" | "innovator" | "seeker" | "investor";

interface Notification {
  id: string;
  type: string;
  text: string;
  time: string;
  read: boolean;
}

interface KokoItem {
  id: string;
}

interface KokoState {
  innovations: KokoItem[];
  argonauts: KokoItem[];
  challenges: KokoItem[];
  projects: KokoItem[];
  roles: KokoItem[];
}

export default function App() {
  const [page, setPage] = useState("home");
  const [role, setRole] = useState<Role>("innovator");
  const [notifs, setNotifs] = useState<Notification[]>([
    {
      id: "n1",
      type: "argonauts",
      text: "New Argonauts mission: Net-Zero Smart City – apply now!",
      time: "2h ago",
      read: false,
    },
    {
      id: "n2",
      type: "invite",
      text: "You have been invited to join the Net-Zero Smart City Argonauts mission.",
      time: "4h ago",
      read: false,
    },
    {
      id: "n3",
      type: "approval",
      text: "'AI Crop Detection' has been approved and published.",
      time: "1d ago",
      read: true,
    },
  ]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [argonautsList, setArgonautsList] = useState(ARGONAUTS_DATA_INIT);

  // KOKO state
  const [koko, setKoko] = useState<KokoState>({
    innovations: [],
    argonauts: [],
    challenges: [],
    projects: [],
    roles: [],
  });

  const isKoko = (type: keyof KokoState, id: string) =>
    (koko[type] || []).some((item) => item.id === id);

  const toggleKoko = (type: keyof KokoState, item: KokoItem) => {
    setKoko((prev) => {
      const list = prev[type] || [];
      const exists = list.some((i) => i.id === item.id);
      if (exists)
        return { ...prev, [type]: list.filter((i) => i.id !== item.id) };
      setNotifs((n) => [
        {
          id: "notif" + Date.now(),
          type: "koko",
          text: `"${item.id}" added to Koko.`,
          time: "Just now",
          read: false,
        },
        ...n,
      ]);
      return { ...prev, [type]: [...list, item] };
    });
  };

  const removeKoko = (type: keyof KokoState, id: string) =>
    setKoko((prev) => ({
      ...prev,
      [type]: (prev[type] || []).filter((i) => i.id !== id),
    }));

  const totalKoko =
    koko.innovations.length +
    koko.argonauts.length +
    koko.challenges.length +
    koko.projects.length +
    koko.roles.length;

  const addNotif = (n: Omit<Notification, "id" | "time" | "read">) =>
    setNotifs((prev) => [
      {
        id: "n" + Date.now(),
        ...n,
        time: "Just now",
        read: false,
      },
      ...prev,
    ]);

  const unread = notifs.filter((n) => !n.read).length;
  const rc = ROLE_CFG[role];
  const curUser = USERS.find((u) => u.role === role) || USERS[0];

  const addArgonauts = (arg: (typeof ARGONAUTS_DATA_INIT)[0]) =>
    setArgonautsList((p) => [...p, arg]);
  const updateArgonauts = (updated: (typeof ARGONAUTS_DATA_INIT)[0]) =>
    setArgonautsList((p) =>
      p.map((a) => (a.id === updated.id ? updated : a))
    );

  const navSections = getNavSections(role);

  const isActive = (id: string) => isNavItemActive(id, page);

  const renderPage = () => {
    if (page.startsWith("ip-")) {
      const ipId = page.replace("ip-", "");
      const ip = IP_DATA.find((i) => i.id === ipId);
      const proj = PROJECTS.find((p) => p.ipId === ipId);
      return (
        <IPDetailPage
          ip={ip}
          project={proj}
          setPage={setPage}
          role={role}
          addNotif={addNotif}
        />
      );
    }
    if (page.startsWith("arg-") && !page.startsWith("edit-arg")) {
      const argId = page.replace("arg-", "");
      const arg = argonautsList.find((a) => a.id === argId);
      if (!arg)
        return (
          <div style={{ padding: 60, textAlign: "center", color: "#94A3B8" }}>
            Mission not found.
          </div>
        );
      return (
        <ArgonautsDetailPage
          arg={arg}
          setPage={setPage}
          role={role}
          addNotif={addNotif}
          updateArgonauts={updateArgonauts}
        />
      );
    }
    if (page.startsWith("edit-arg-")) {
      const argId = page.replace("edit-arg-", "");
      const arg = argonautsList.find((a) => a.id === argId);
      return (
        <PostArgonautsPage
          setPage={setPage}
          addNotif={addNotif}
          addArgonauts={addArgonauts}
          editData={arg}
          onUpdate={(updated) => {
            updateArgonauts(updated);
            setPage("arg-" + argId);
          }}
        />
      );
    }

    switch (page) {
      case "home":
        return <HomePage setPage={setPage} argonautsList={argonautsList} />;
      case "innovations":
        return <InnovationMarketplace setPage={setPage} />;
      case "argonauts":
        return (
          <ArgonautsMarketplace
            setPage={setPage}
            argonautsList={argonautsList}
            addNotif={addNotif}
          />
        );
      case "post-argonauts":
        return (
          <PostArgonautsPage
            setPage={setPage}
            addNotif={addNotif}
            addArgonauts={addArgonauts}
          />
        );
      case "challenges":
        return <ChallengeMarketplace setPage={setPage} addNotif={addNotif} />;
      case "funding":
        return <FundingPage setPage={setPage} />;
      case "my-innovations":
        return <MyInnovationsPage setPage={setPage} />;
      case "my-projects":
        return <MyProjectsPage setPage={setPage} role={role} />;
      case "recruitment":
        return <RecruitmentPage setPage={setPage} addNotif={addNotif} />;
      case "koko":
        return <KokoPage setPage={setPage} />;
      case "create-ip":
        return <CreateIPPage setPage={setPage} addNotif={addNotif} />;
      case "dashboard":
        if (role === "innovator")
          return (
            <InnovatorDashboard
              setPage={setPage}
              addNotif={addNotif}
              argonautsList={argonautsList}
            />
          );
        if (role === "seeker")
          return (
            <SeekerDashboard
              setPage={setPage}
              addNotif={addNotif}
              argonautsList={argonautsList}
            />
          );
        if (role === "investor")
          return (
            <InvestorDashboard
              setPage={setPage}
              argonautsList={argonautsList}
            />
          );
        if (role === "admin")
          return (
            <AdminDashboard
              setPage={setPage}
              argonautsList={argonautsList}
            />
          );
        return null;
      default:
        return <HomePage setPage={setPage} argonautsList={argonautsList} />;
    }
  };

  const pageName = getPageName(page, navSections);

  const kokoContextValue = {
    koko,
    isKoko,
    toggleKoko,
    removeKoko,
  };

  return (
    <KokoContext.Provider value={kokoContextValue}>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* SIDEBAR */}
        <div
          style={{
            width: 248,
            background: "#fff",
            borderRight: "1px solid #E8EDFB",
            display: "flex",
            flexDirection: "column",
            padding: "18px 10px",
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            zIndex: 100,
            boxShadow: "3px 0 16px rgba(37,99,235,0.06)",
            overflowY: "auto",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0 6px",
              marginBottom: 22,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "linear-gradient(135deg,#1D4ED8,#7C3AED)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 900,
                color: "#fff",
                boxShadow: "0 4px 14px rgba(124,58,237,0.45)",
                flexShrink: 0,
              }}
            >
              V
            </div>
            <div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 900,
                  color: "#1E293B",
                  fontFamily: "'Syne',sans-serif",
                  lineHeight: 1,
                }}
              >
                VIX
              </div>
              <div
                style={{
                  fontSize: 8,
                  color: "#94A3B8",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontFamily: "'DM Sans',sans-serif",
                }}
              >
                VNU HCMC · Innovation
              </div>
            </div>
          </div>

          {/* Role switcher */}
          <div
            style={{
              background: "#F8FAFC",
              borderRadius: 12,
              padding: 9,
              marginBottom: 18,
              border: "1px solid #E8EDFB",
            }}
          >
            <div
              style={{
                fontSize: 8,
                fontWeight: 700,
                color: "#94A3B8",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: 7,
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              Demo Role
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
              {Object.entries(ROLE_CFG).map(([r, cfg]) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r as Role);
                    setPage("dashboard");
                  }}
                  style={{
                    padding: "6px 8px",
                    borderRadius: 9,
                    border:
                      role === r ? `1.5px solid ${cfg.color}` : "1.5px solid #E8EDFB",
                    background: role === r ? cfg.bg : "transparent",
                    color: role === r ? cfg.color : "#94A3B8",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: 9.5,
                    fontFamily: "'DM Sans',sans-serif",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    justifyContent: "center",
                  }}
                >
                  <span>{cfg.icon}</span>
                  {cfg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Nav */}
          {navSections.map((section) => (
            <div key={section.label} style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: 8.5,
                  fontWeight: 700,
                  color: "#94A3B8",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  padding: "0 8px",
                  marginBottom: 5,
                  fontFamily: "'DM Sans',sans-serif",
                }}
              >
                {section.label}
              </div>
              {section.items.map((item) => {
                const active = isActive(item.id);
                const isKokoNav = item.id === "koko";
                const isArgNav = item.id === "argonauts";
                return (
                  <button
                    key={item.id}
                    onClick={() => setPage(item.id)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 9,
                      padding: "9px 11px",
                      borderRadius: 10,
                      marginBottom: 1,
                      background: active
                        ? isKokoNav
                          ? "#FFFBEB"
                          : isArgNav
                            ? "#F5F0FF"
                            : "#EFF6FF"
                        : "transparent",
                      border: `1px solid ${active
                        ? isKokoNav
                          ? "#FDE68A"
                          : isArgNav
                            ? "#DDD6FE"
                            : "#BFDBFE"
                        : "transparent"
                        }`,
                      color: active
                        ? isKokoNav
                          ? "#D97706"
                          : isArgNav
                            ? "#7C3AED"
                            : "#2563EB"
                        : "#64748B",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: active ? 700 : 500,
                      fontFamily: "'DM Sans',sans-serif",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "#F8FAFC";
                        (e.currentTarget as HTMLButtonElement).style.color = "#374151";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "transparent";
                        (e.currentTarget as HTMLButtonElement).style.color = "#64748B";
                      }
                    }}
                  >
                    <span style={{ fontSize: 14, color: isArgNav ? "#7C3AED" : undefined }}>
                      {item.icon}
                    </span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.kokoCount && totalKoko > 0 && (
                      <span
                        style={{
                          fontSize: 9,
                          background: active ? "#D97706" : "#F59E0B",
                          color: "#fff",
                          borderRadius: 8,
                          padding: "1px 6px",
                          fontWeight: 700,
                          minWidth: 18,
                          textAlign: "center",
                        }}
                      >
                        {totalKoko}
                      </span>
                    )}
                    {isArgNav && (
                      <span
                        style={{
                          fontSize: 8,
                          background: active ? "#7C3AED" : "#F5F0FF",
                          color: active ? "#fff" : "#7C3AED",
                          borderRadius: 6,
                          padding: "2px 5px",
                          fontWeight: 700,
                        }}
                      >
                        NEW
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}

          {/* Footer */}
          <div style={{ marginTop: "auto", borderTop: "1px solid #F1F5F9", paddingTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "0 4px" }}>
              <Avatar name={curUser.name} size={32} color={rc.color} />
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#1E293B",
                    fontFamily: "'DM Sans',sans-serif",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {curUser.name}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "#94A3B8",
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  {rc.icon} {rc.label}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div
          style={{
            flex: 1,
            marginLeft: 248,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {/* Top bar */}
          <div
            style={{
              background: "#fff",
              borderBottom: "1px solid #E8EDFB",
              padding: "0 28px",
              height: 54,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "sticky",
              top: 0,
              zIndex: 90,
              boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#1E293B",
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              {pageName}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Koko shortcut */}
              <button
                onClick={() => setPage("koko")}
                title="My Koko"
                style={{
                  position: "relative",
                  background: page === "koko" ? "#FFFBEB" : "#F8FAFC",
                  border: `1.5px solid ${page === "koko" ? "#F59E0B" : "#E8EDFB"}`,
                  borderRadius: 10,
                  width: 38,
                  height: 38,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: 16,
                }}
              >
                ⭐
                {totalKoko > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                      width: 17,
                      height: 17,
                      borderRadius: "50%",
                      background: "#F59E0B",
                      color: "#fff",
                      fontSize: 8,
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {totalKoko}
                  </div>
                )}
              </button>

              {/* Notif bell */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  style={{
                    background: "#F8FAFC",
                    border: "1.5px solid #E8EDFB",
                    borderRadius: 10,
                    width: 38,
                    height: 38,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: 16,
                    position: "relative",
                  }}
                >
                  🔔
                  {unread > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: -4,
                        right: -4,
                        width: 17,
                        height: 17,
                        borderRadius: "50%",
                        background: "#EF4444",
                        color: "#fff",
                        fontSize: 8,
                        fontWeight: 900,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {unread}
                    </div>
                  )}
                </button>

                {notifOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      width: 360,
                      background: "#fff",
                      border: "1px solid #E8EDFB",
                      borderRadius: 16,
                      boxShadow: "0 16px 50px rgba(0,0,0,0.15)",
                      zIndex: 200,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "13px 17px",
                        borderBottom: "1px solid #F1F5F9",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: "#1E293B",
                          fontFamily: "'Syne',sans-serif",
                        }}
                      >
                        Notifications
                      </span>
                      <button
                        onClick={() =>
                          setNotifs((n) =>
                            n.map((x) => ({
                              ...x,
                              read: true,
                            }))
                          )
                        }
                        style={{
                          fontSize: 11,
                          color: "#2563EB",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Mark all read
                      </button>
                    </div>
                    <div style={{ maxHeight: 340, overflow: "auto" }}>
                      {notifs.map((n) => (
                        <div
                          key={n.id}
                          onClick={() =>
                            setNotifs((p) =>
                              p.map((x) =>
                                x.id === n.id ? { ...x, read: true } : x
                              )
                            )
                          }
                          style={{
                            display: "flex",
                            gap: 11,
                            padding: "11px 17px",
                            background: n.read ? "#fff" : "#EFF6FF",
                            borderBottom: "1px solid #F8FAFC",
                            cursor: "pointer",
                          }}
                        >
                          <span style={{ fontSize: 17, flexShrink: 0 }}>
                            {NOTIF_ICONS[n.type as keyof typeof NOTIF_ICONS] ||
                              "🔔"}
                          </span>
                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                fontSize: 12,
                                color: "#374151",
                                lineHeight: 1.5,
                                fontFamily: "'DM Sans',sans-serif",
                              }}
                            >
                              {n.text}
                            </div>
                            <div
                              style={{
                                fontSize: 10,
                                color: "#94A3B8",
                                marginTop: 2,
                                fontFamily: "'DM Sans',sans-serif",
                              }}
                            >
                              {n.time}
                            </div>
                          </div>
                          {!n.read && (
                            <div
                              style={{
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                background: "#2563EB",
                                flexShrink: 0,
                                marginTop: 5,
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Role chip */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  background: rc.bg,
                  border: `1.5px solid ${rc.color}28`,
                  borderRadius: 10,
                  padding: "6px 12px",
                }}
              >
                <Avatar name={curUser.name} size={22} color={rc.color} />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: rc.color,
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  {rc.icon} {rc.label}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              flex: 1,
              padding: "28px",
              overflow: "auto",
              background: "#F0F4FC",
            }}
          >
            {renderPage()}
          </div>
        </div>
      </div>
    </KokoContext.Provider>
  );
}
