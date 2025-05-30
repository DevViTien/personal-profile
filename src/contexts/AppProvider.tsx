import React, { ReactNode } from "react";
import { ThemeProvider } from "./ThemeContext";
import { ProfileProvider } from "./ProfileContext";
import { LanguageProvider } from "./LanguageContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <ProfileProvider>{children}</ProfileProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};
