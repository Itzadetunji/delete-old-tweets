import type { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { supabase } from "#/lib/supabase";

type AuthStore = {
	user: User | null;
	session: Session | null;
	oauthToken: string | null;
	oauthRefreshToken: string | null;
	isLoading: boolean;
	error: string | null;
	hasInitialized: boolean;
	initialize: () => Promise<void>;
	signInWithX: () => Promise<void>;
	signOut: () => Promise<void>;
};

const getOAuthTokensFromSession = (session: Session | null) => {
	if (!session) {
		return {
			oauthToken: null,
			oauthRefreshToken: null,
		};
	}

	const providerTokenSession = session as Session & {
		provider_token?: string;
		provider_refresh_token?: string;
	};

	return {
		oauthToken: providerTokenSession.provider_token ?? null,
		oauthRefreshToken: providerTokenSession.provider_refresh_token ?? null,
	};
};

export const useAuthStore = create<AuthStore>()(
	persist(
		(set, get) => ({
			user: null,
			session: null,
			oauthToken: null,
			oauthRefreshToken: null,
			isLoading: false,
			error: null,
			hasInitialized: false,
			initialize: async () => {
				if (get().hasInitialized || get().isLoading) {
					return;
				}

				set({ isLoading: true });

				if (!supabase) {
					set({
						hasInitialized: true,
						isLoading: false,
						error:
							"Missing Supabase env vars. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
					});
					return;
				}

				const { data, error } = await supabase.auth.getSession();
				if (error) {
					set({ error: error.message });
				} else {
					const persistedSession = get().session;
					const resolvedSession = data.session ?? persistedSession;
					const oauthTokens = getOAuthTokensFromSession(resolvedSession);

					set({
						session: resolvedSession,
						user: resolvedSession?.user ?? null,
						...oauthTokens,
						error: null,
					});
				}

				supabase.auth.onAuthStateChange((_event, session) => {
					const oauthTokens = getOAuthTokensFromSession(session);

					set({
						hasInitialized: true,
						session,
						user: session?.user ?? null,
						...oauthTokens,
						isLoading: false,
						error: null,
					});
				});

				set({ hasInitialized: true, isLoading: false });
			},
			signInWithX: async () => {
				if (!supabase) {
					set({
						error:
							"Missing Supabase env vars. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
					});
					return;
				}

				set({ isLoading: true, error: null });

				

				const { data, error } = await supabase.auth.signInWithOAuth({
					provider: "x",
					options: {
						redirectTo: "http://localhost:3000/dashboard",
					},
				});

				if (error) {
					set({ isLoading: false, error: error.message });
					return;
				}

				if (data.url && typeof window !== "undefined") {
					window.location.assign(data.url);
					return;
				}

				set({ isLoading: false, error: "Unable to start X authentication flow." });
			},
			signOut: async () => {
				if (!supabase) {
					return;
				}

				set({ isLoading: true, error: null });
				const { error } = await supabase.auth.signOut();

				if (error) {
					set({ isLoading: false, error: error.message });
					return;
				}

				set({
					user: null,
					session: null,
					oauthToken: null,
					oauthRefreshToken: null,
					isLoading: false,
					error: null,
				});
			},
		}),
		{
			name: "auth-store",
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				user: state.user,
				session: state.session,
				oauthToken: state.oauthToken,
				oauthRefreshToken: state.oauthRefreshToken,
			}),
		},
	),
);
