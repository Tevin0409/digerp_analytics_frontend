import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

interface AuthState {
  user: User | null;
  token: string | null;
  tokenExpiry: string | null;
  login: (user: User, token: string, tokenExpiry: string) => void;
  logout: () => void;
  loadUserFromSessionStorage: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        tokenExpiry: null,
        login: (user, token, tokenExpiry) => {
          set({
            user: user,
            token: token,
            tokenExpiry: tokenExpiry,
          });
        },
        logout: () => {
          set({
            user: null,
            token: null,
            tokenExpiry: null,
          });
        },
        loadUserFromSessionStorage: () => {
          const user = sessionStorage.getItem("user");
          const token = sessionStorage.getItem("token");
          const tokenExpiry = sessionStorage.getItem("tokenExpiry");
          if (user && token && tokenExpiry) {
            set({
              user: JSON.parse(user),
              token: token,
              tokenExpiry: tokenExpiry,
            });
          }
        },
      }),
      {
        name: "auth-store",
        storage: createJSONStorage(() => sessionStorage),
      }
    ),
    {
      name: "auth-store",
    }
  )
);
