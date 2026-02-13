"use client";

import React, { createContext, useState } from "react";
import { StoreApi } from "zustand";

import { AuthState, createAuthStore } from "@/store/useAuthStore";

const AuthStoreContext = createContext<StoreApi<AuthState> | null>(null);

const AuthProvider = ({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState?: Partial<AuthState>;
}) => {
  const [store] = useState(() => {
    return createAuthStore(initialState);
  });

  return <AuthStoreContext.Provider value={store}>{children}</AuthStoreContext.Provider>;
};

export { AuthStoreContext, AuthProvider };
