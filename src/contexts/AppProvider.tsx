import React, { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "./ThemeContext";
import { ProfileProvider } from "./ProfileContext";
import { ProfileLanguageSyncComponent } from "@/components/providers/ProfileLanguageSyncComponent";
import ToastProvider from "@/components/providers/ToastProvider";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <NextIntlClientProvider>
      <ThemeProvider>
        <ProfileProvider>
          <ProfileLanguageSyncComponent>
            {children}
            <ToastProvider />
          </ProfileLanguageSyncComponent>
        </ProfileProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};
