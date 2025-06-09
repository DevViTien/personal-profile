"use client";

import React, { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { ProfileProvider } from "./ProfileContext";
import { ProfileLanguageSyncComponent } from "@/components/providers/ProfileLanguageSyncComponent";
import ToastProvider from "@/components/providers/ToastProvider";

interface AppProviderProps {
  children: ReactNode;
  locale: string;
  messages: Record<string, unknown>;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children, locale, messages }) => {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ProfileProvider>
        <ProfileLanguageSyncComponent>
          {children}
          <ToastProvider />
        </ProfileLanguageSyncComponent>
      </ProfileProvider>
    </NextIntlClientProvider>
  );
};
