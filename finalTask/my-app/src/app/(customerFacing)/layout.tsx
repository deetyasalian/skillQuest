// layout.tsx
"use client";
import { useEffect, useState } from "react";
import { Nav, NavLink } from "@/components/Nav";

export const dynamic = "force-dynamic";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authStatus = localStorage.getItem("authenticated");
        setIsAuthenticated(authStatus === "true");
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authenticated");
        setIsAuthenticated(false);
        
        window.location.href = "/";
    };

    return (
        <>
            <Nav>
                <NavLink href="/">Home</NavLink>
                {isAuthenticated && (
                    <>
                        <NavLink href="/products">Products</NavLink>
                        <NavLink href="/orders">My Orders</NavLink>
                    </>
                )}
            </Nav>
            <div className="container my-6">{children}</div>
        </>
    );
}
