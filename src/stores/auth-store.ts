import type { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
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

function getOAuthTokensFromSession(session: Session | null) {
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
}

export const useAuthStore = create<AuthStore>((set, get) => ({
	user: null,
	session: null,
	oauthToken: null,
	oauthRefreshToken: null,
	isLoading: false,
	error: null,
	hasInitialized: false,
	initialize: async () => {
		if (get().hasInitialized) {
			return;
		}

		set({ hasInitialized: true });

		if (!supabase) {
			set({
				error:
					"Missing Supabase env vars. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
			});
			return;
		}

		const { data, error } = await supabase.auth.getSession();
		if (error) {
			set({ error: error.message });
		} else {
			const oauthTokens = getOAuthTokensFromSession(data.session);

			set({
				session: data.session,
				user: data.session?.user ?? null,
				...oauthTokens,
				error: null,
			});
		}

		supabase.auth.onAuthStateChange((_event, session) => {
			const oauthTokens = getOAuthTokensFromSession(session);

			set({
				session,
				user: session?.user ?? null,
				...oauthTokens,
				isLoading: false,
				error: null,
			});
		});
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

		const redirectTo =
			typeof window !== "undefined"
				? `${window.location.origin}/protected/dashboard`
				: undefined;

		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "x",
			options: {
				redirectTo,
				skipBrowserRedirect: true,
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
}));
