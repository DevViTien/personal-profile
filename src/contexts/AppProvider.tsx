import React, { ReactNode } from "react";
import { ThemeProvider } from "./ThemeContext";
import { ProfileProvider } from "./ProfileContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <ProfileProvider>{children}</ProfileProvider>
    </ThemeProvider>
  );
};
