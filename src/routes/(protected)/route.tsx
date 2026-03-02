import { Outlet, createFileRoute } from "@tanstack/react-router";
import AuthGuard from "#/components/AuthGuard";

const ProtectedRouteLayout = () => {
	return (
		<AuthGuard>
			<Outlet />
		</AuthGuard>
	);
};

export const Route = createFileRoute("/(protected)" as never)({
	component: ProtectedRouteLayout,
});
