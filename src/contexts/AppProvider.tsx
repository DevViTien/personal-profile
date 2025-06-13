"use client";

import React, { ReactNode } from "react";
import { ProfileProvider } from "./ProfileContext";
import { ProfileLanguageSyncComponent } from "@/components/providers/ProfileLanguageSyncComponent";
import ToastProvider from "@/components/providers/ToastProvider";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
      <ProfileProvider>
        <ProfileLanguageSyncComponent>
          {children}
          <ToastProvider />
        </ProfileLanguageSyncComponent>
      </ProfileProvider>
  );
};
