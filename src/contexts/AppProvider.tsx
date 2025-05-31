import React, { ReactNode } from "react";
import { ThemeProvider } from "./ThemeContext";
import { ProfileProvider } from "./ProfileContext";
import { LanguageProvider } from "./LanguageContext";
import { ProfileLanguageSyncComponent } from "@/components/providers/ProfileLanguageSyncComponent";
import ToastProvider from "@/components/providers/ToastProvider";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <ProfileProvider>
          <ProfileLanguageSyncComponent>
            {children}
            <ToastProvider />
          </ProfileLanguageSyncComponent>
        </ProfileProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};
