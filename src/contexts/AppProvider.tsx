import React, { ReactNode } from "react";
import { ThemeProvider } from "./ThemeContext";
import { ProfileProvider } from "./ProfileContext";
import { LanguageProvider } from "./LanguageContext";
import { ProfileLanguageSyncComponent } from "@/components/providers/ProfileLanguageSyncComponent";

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
          </ProfileLanguageSyncComponent>
        </ProfileProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};
