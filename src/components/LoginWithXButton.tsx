import type { ComponentProps } from "react";
import { Button } from "#/components/ui/button";
import { useAuthStore } from "#/stores/auth-store";
import XLogo from "./XLogo";

type LoginWithXButtonProps = ComponentProps<typeof Button>;

export default function LoginWithXButton({
	children,
	disabled,
	...props
}: LoginWithXButtonProps) {
	const isLoading = useAuthStore((state) => state.isLoading);
	const signInWithX = useAuthStore((state) => state.signInWithX);

	return (
		<Button
			disabled={disabled || isLoading}
			onClick={() => {
				void signInWithX();
			}}
			{...props}
		>
			<XLogo />
			{isLoading ? "Connecting..." : children ?? "Login with X"}
		</Button>
	);
}
