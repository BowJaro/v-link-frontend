import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { KokoContext } from "./context/KokoContext";
import { Navigation } from "./components/layout/Navigation";
import { ARGONAUTS_DATA_INIT } from "./data/mockData";
import {
    HomePage,
    InnovationMarketplace,
    ArgonautsMarketplace,
    PostArgonautsPage,
    ChallengeMarketplace,
    FundingPage,
    MyInnovationsPage,
    RecruitmentPage,
    KokoPage,
    CreateIPPage,
    InnovatorDashboard,
    SeekerDashboard,
    InvestorDashboard,
    AdminDashboard,
    MyTeamsPage,
    MyChallengesPage,
    MyArgonautsPage,
} from "./pages";
import ProfilePage from "./pages/profile/ProfilePage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { IPDetailPage } from "./pages/innovations/IPDetailPage";
import { ArgonautsDetailPage } from "./pages/ArgonautsDetailPage";
import { ChallengeDetailPage } from "./pages/ChallengeDetailPage";
import { RecruitmentDetailPage } from "./pages/RecruitmentDetailPage";
import { EditIPPage } from "./pages/innovations/EditIPPage";
import { EditArgonautsPage } from "./pages/EditArgonautsPage";
import { CreateChallengePage } from "./pages/CreateChallengePage";
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

interface KokoItem { id: string; }
interface KokoState {
    innovations: KokoItem[];
    argonauts: KokoItem[];
    challenges: KokoItem[];
    projects: KokoItem[];
    roles: KokoItem[];
}

export default function AppRouter() {
    const [role] = useState<Role>("innovator");
    const [argonautsList, setArgonautsList] = useState(ARGONAUTS_DATA_INIT);
    const [koko, setKoko] = useState<KokoState>({ innovations: [], argonauts: [], challenges: [], projects: [], roles: [] });
    const [hydrated, setHydrated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem("vlink-koko");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setKoko({
                    innovations: parsed.innovations || [],
                    argonauts: parsed.argonauts || [],
                    challenges: parsed.challenges || [],
                    projects: parsed.projects || [],
                    roles: parsed.roles || [],
                });
            } catch {
            }
        }
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (!hydrated) return;
        localStorage.setItem("vlink-koko", JSON.stringify(koko));
    }, [koko, hydrated]);

    const isKoko = (type: keyof KokoState, id: string) => koko[type]?.some((i) => i.id === id) ?? false;
    const toggleKoko = (type: keyof KokoState, item: KokoItem) => setKoko((prev) => {
        const list = prev[type] || [];
        const exists = list.some((i) => i.id === item.id);
        if (exists) return { ...prev, [type]: list.filter((i) => i.id !== item.id) };
        return { ...prev, [type]: [...list, item] };
    });
    const removeKoko = (type: keyof KokoState, id: string) => setKoko((prev) => ({ ...prev, [type]: (prev[type] || []).filter((i) => i.id !== id) }));

    const addNotif = (n: Omit<Notification, "id" | "time" | "read">) => console.log("Notif", n);
    const addArgonauts = (arg: (typeof ARGONAUTS_DATA_INIT)[0]) => setArgonautsList((p) => [...p, arg]);
    const updateArgonauts = (updated: (typeof ARGONAUTS_DATA_INIT)[0]) => setArgonautsList((p) => p.map((a) => (a.id === updated.id ? updated : a)));

    const setPage = (page: string) => {
        if (page === "home") return navigate("/");
        if (page === "innovations" || page === "museion") return navigate("/museion");
        if (page === "create-ip") return navigate("/museion/new");
        if (page.startsWith("ip-")) return navigate(`/museion/${page.replace("ip-", "")}`);
        if (page === "argonauts") return navigate("/argonauts");
        if (page === "post-argonauts") return navigate("/argonauts/new");
        if (page.startsWith("arg-")) return navigate(`/argonauts/${page.replace("arg-", "")}`);
        if (page === "challenges") return navigate("/challenges");
        if (page === "new-challenge") return navigate("/challenges/new");
        if (page === "dashboard") return navigate("/dashboard");
        if (page === "my-koko") return navigate("/my-koko");
        if (page === "my-ips") return navigate("/my-ips");
        if (page === "my-challenges") return navigate("/my-challenges");
        if (page === "my-argonauts") return navigate("/my-argonauts");
        if (page === "my-teams") return navigate("/my-teams");
        if (page === "profile") return navigate("/profile");
        return navigate("/");
    };

    return (
        <KokoContext.Provider value={{ koko, isKoko, toggleKoko, removeKoko }}>
            <div className="app">
                <Navigation />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage argonautsList={argonautsList} />} />
                        <Route path="/museion" element={<InnovationMarketplace setPage={setPage} />} />
                        <Route path="/museion/new" element={<CreateIPPage setPage={setPage} addNotif={addNotif} />} />
                        <Route path="/museion/:id" element={<IPDetailPage />} />
                        <Route path="/museion/:id/edit" element={<EditIPPage setPage={setPage} />} />
                        <Route path="/innovations" element={<Navigate to="/museion" replace />} />
                        <Route path="/challenges" element={<ChallengeMarketplace />} />
                        <Route path="/challenges/new" element={<CreateChallengePage setPage={setPage} addNotif={addNotif} />} />
                        <Route path="/challenges/:id" element={<ChallengeDetailPage />} />
                        <Route path="/argonauts" element={<ArgonautsMarketplace argonautsList={argonautsList} addNotif={addNotif} />} />
                        <Route path="/argonauts/new" element={<PostArgonautsPage setPage={setPage} addNotif={addNotif} addArgonauts={addArgonauts} />} />
                        <Route path="/argonauts/:id" element={<ArgonautsDetailPage />} />
                        <Route path="/argonauts/:id/edit" element={<EditArgonautsPage argonautsList={argonautsList} updateArgonauts={updateArgonauts} addNotif={addNotif} />} />
                        <Route path="/recruit" element={<RecruitmentPage setPage={setPage} addNotif={addNotif} />} />
                        <Route path="/recruit/:id" element={<RecruitmentDetailPage />} />
                        <Route path="/recruitment" element={<Navigate to="/recruit" replace />} />
                        <Route path="/funding" element={<FundingPage setPage={setPage} />} />
                        <Route path="/dashboard" element={role === "innovator" ? <InnovatorDashboard setPage={setPage} addNotif={addNotif} argonautsList={argonautsList} /> : role === "seeker" ? <SeekerDashboard setPage={setPage} addNotif={addNotif} argonautsList={argonautsList} /> : role === "investor" ? <InvestorDashboard setPage={setPage} argonautsList={argonautsList} /> : <AdminDashboard setPage={setPage} argonautsList={argonautsList} />} />
                        <Route path="/my-ips" element={<MyInnovationsPage setPage={setPage} />} />
                        <Route path="/my-challenges" element={<MyChallengesPage />} />
                        <Route path="/my-argonauts" element={<MyArgonautsPage />} />
                        <Route path="/my-teams" element={<MyTeamsPage />} />
                        <Route path="/my-koko" element={<KokoPage setPage={setPage} />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/dashboard-page" element={<DashboardPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </div>
        </KokoContext.Provider>
    );
}

function NotFound() {
    return (
        <div style={{ padding: 40, textAlign: "center", color: "#64748B" }}>
            <h1>404</h1>
            <p>Page not found.</p>
        </div>
    );
}
