import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { APP_NAME, APP_TAGLINE } from "../../config/constants";
import styles from "./Navigation.module.css";

interface NavItem {
    label: string;
    path: string;
    icon: string;
}

const mainNavItems: NavItem[] = [
    { label: "Home", path: "/", icon: "🏠" },
    { label: "Museion", path: "/museion", icon: "🔬" },
    { label: "Challenges", path: "/challenges", icon: "🎯" },
    { label: "Argonauts", path: "/argonauts", icon: "🚀" },
    { label: "Funding", path: "/funding", icon: "💼" },
    { label: "Recruit", path: "/recruit", icon: "👥" },
];

const userNavItems: NavItem[] = [
    { label: "Dashboard", path: "/dashboard", icon: "📊" },
    { label: "My Koko", path: "/my-koko", icon: "⭐" },
    { label: "My IPs", path: "/my-ips", icon: "📁" },
    { label: "My Challenges", path: "/my-challenges", icon: "✅" },
    { label: "My Argonauts", path: "/my-argonauts", icon: "⚔" },
    { label: "My Teams", path: "/my-teams", icon: "🤝" },
    { label: "Profile", path: "/profile", icon: "👤" },
];

export const Navigation = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    {/* Logo/Brand */}
                    <Link to="/" className={styles.brand}>
                        <div className={styles.logo}>
                            <span className={styles.logoText}>{APP_NAME}</span>
                            <span className={styles.tagline}>{APP_TAGLINE}</span>
                        </div>
                    </Link>

                    {/* Main Navigation */}
                    <div className={styles.mainNav}>
                        {mainNavItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`${styles.navLink} ${isActive(item.path) ? styles.active : ""
                                    }`}
                            >
                                <span className={styles.icon}>{item.icon}</span>
                                <span className={styles.label}>{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* User Navigation */}
                    <div className={styles.userNav}>
                        {userNavItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`${styles.navIcon} ${isActive(item.path) ? styles.active : ""
                                    }`}
                                title={item.label}
                            >
                                {item.icon}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={styles.mobileToggle}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? "✕" : "☰"}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    <div className={styles.mobileMenuContent}>
                        <div className={styles.section}>
                            <h3>Marketplace</h3>
                            {mainNavItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={styles.mobileLink}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className={styles.icon}>{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </div>
                        <div className={styles.section}>
                            <h3>My Activity</h3>
                            {userNavItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={styles.mobileLink}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className={styles.icon}>{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
