"use client";

import { ReactNode } from "react";


import { FC } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { auth } from "@/auth";

interface Props {
    children: ReactNode;
}

const Providers: FC<Props> =  ({ children }) => {
   
    return (
        <SessionProvider refetchOnWindowFocus={true}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <div className="min-h-screen">{children}</div>
            </ThemeProvider>
        </SessionProvider>
    );
};

export default Providers;
