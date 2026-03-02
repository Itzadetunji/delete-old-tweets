import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "#/stores/auth-store";

export const requireAuth = async () => {
	const auth = useAuthStore.getState();

	if (!auth.hasInitialized) {
		await auth.initialize();
	}

	const { session } = useAuthStore.getState();

	if (!session) {
		throw redirect({ to: "/" });
	}
};

const ProtectedRouteLayout = () => {
	return <Outlet />;
};

export const Route = createFileRoute("/protected" as never)({
	component: ProtectedRouteLayout,
});
