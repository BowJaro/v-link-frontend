import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { KokoContext } from "./context/KokoContext";
import { Navigation } from "./components/layout/Navigation";
import { ARGONAUTS_DATA_INIT } from "./config/mockData";
import {
    HomePage,
    InnovationMarketplace,
    ArgonautsMarketplace,
    PostArgonautsPage,
    ChallengeMarketplace,
    FundingPage,
    MyInnovationsPage,
    MyProjectsPage,
    RecruitmentPage,
    KokoPage,
    CreateIPPage,
    InnovatorDashboard,
    SeekerDashboard,
    InvestorDashboard,
    AdminDashboard,
    MyTeamsPage,
    MyFundingPage,
} from "./pages";
import ProfilePage from "./pages/profile/ProfilePage";
import DashboardPage from "./pages/dashboard/DashboardPage";
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

export default function AppRouter() {
    const [role] = useState<Role>("innovator");
    const [argonautsList, setArgonautsList] = useState(ARGONAUTS_DATA_INIT);
    const [koko, setKoko] = useState<KokoState>({ innovations: [], argonauts: [], challenges: [], projects: [], roles: [] });
    const [hydrated, setHydrated] = useState(false);

    // Load Koko from localStorage on mount
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
                // ignore
            }
        }
        setHydrated(true);
    }, []);

    // Persist Koko to localStorage
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

    const addNotif = (n: Omit<Notification, "id" | "time" | "read">) => {
        // Notification handling would go here
        console.log("Notification added:", n);
    };

    const addArgonauts = (arg: (typeof ARGONAUTS_DATA_INIT)[0]) =>
        setArgonautsList((p) => [...p, arg]);

    const setPage = (page: string) => {
        // This is for backward compatibility with old-style page navigation
        console.log("setPage called:", page);
    };

    return (
        <KokoContext.Provider value={{ koko, isKoko, toggleKoko, removeKoko }}>
            <div className="app">
                <Navigation />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage setPage={setPage} argonautsList={argonautsList} />} />
                        <Route path="/innovations" element={<InnovationMarketplace setPage={setPage} />} />
                        <Route path="/innovations/create" element={<CreateIPPage setPage={setPage} addNotif={addNotif} />} />
                        <Route path="/my-innovations" element={<MyInnovationsPage setPage={setPage} />} />
                        <Route path="/argonauts" element={<ArgonautsMarketplace setPage={setPage} argonautsList={argonautsList} addNotif={addNotif} />} />
                        <Route path="/argonauts/create" element={<PostArgonautsPage setPage={setPage} addNotif={addNotif} addArgonauts={addArgonauts} />} />
                        <Route path="/challenges" element={<ChallengeMarketplace setPage={setPage} addNotif={addNotif} />} />
                        <Route path="/funding" element={<FundingPage setPage={setPage} />} />
                        <Route path="/recruitment" element={<RecruitmentPage setPage={setPage} addNotif={addNotif} />} />
                        <Route path="/koko" element={<KokoPage setPage={setPage} />} />
                        <Route path="/my-projects" element={<MyProjectsPage setPage={setPage} role={role} />} />
                        <Route path="/my/teams" element={<MyTeamsPage />} />
                        <Route path="/my/funding" element={<MyFundingPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/dashboard" element={role === "innovator" ? <InnovatorDashboard setPage={setPage} addNotif={addNotif} argonautsList={argonautsList} /> : role === "seeker" ? <SeekerDashboard setPage={setPage} addNotif={addNotif} argonautsList={argonautsList} /> : role === "investor" ? <InvestorDashboard setPage={setPage} argonautsList={argonautsList} /> : <AdminDashboard setPage={setPage} argonautsList={argonautsList} />} />
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
        <div className="error-page">
            <h1>404</h1>
            <p>Page not found</p>
        </div>
    );
}
