"use client";

import React, { ReactNode } from "react";
import { ProfileProvider } from "./ProfileContext";
import { ProfileLanguageSyncComponent } from "@/components/providers/ProfileLanguageSyncComponent";
import ToastProvider from "@/components/providers/ToastProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <ProfileLanguageSyncComponent>
          {children}
          <ToastProvider />
        </ProfileLanguageSyncComponent>
      </ProfileProvider>
    </ThemeProvider>
  );
};
