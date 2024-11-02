"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

export function Nav({ children }: { children: ReactNode }) {
    return <nav className="bg-[#100f0f] text-white flex justify-center px-4">{children}</nav>;
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
    const pathname = usePathname();
    const isActive = pathname === props.href;

    return (
        <Link
            {...props}
            className={cn(
                "p-4 hover:bg-[rgb(238,75,43)] hover:text-white focus-visible:bg-[rgb(238,75,43)] focus-visible:text-white border-b border-[#181818]",
                isActive ? "bg-[#100f0f] text-white" : ""
            )}
        />
    );
}
