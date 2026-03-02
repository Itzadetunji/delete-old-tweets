import type { ReactNode } from "react";
import { useEffect } from "react";
import { Navigate } from "@tanstack/react-router";
import { useAuthStore } from "#/stores/auth-store";

type AuthGuardProps = {
	children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
	const session = useAuthStore((state) => state.session);
	const hasInitialized = useAuthStore((state) => state.hasInitialized);
	const isLoading = useAuthStore((state) => state.isLoading);
	const initialize = useAuthStore((state) => state.initialize);

	useEffect(() => {
		if (!hasInitialized && !isLoading) {
			void initialize();
		}
	}, [hasInitialized, initialize, isLoading]);

	if (!hasInitialized || isLoading) {
		return null;
	}

	if (!session) {
		return (
			<Navigate
				to="/"
				replace
			/>
		);
	}

	return <>{children}</>;
}
