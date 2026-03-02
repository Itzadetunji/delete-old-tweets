import { Link } from "@tanstack/react-router";
import { HomeIcon, KeyRoundIcon, LogOutIcon } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "#/components/ui/sidebar";
import { useAuthStore } from "#/stores/auth-store";

export default function AppSidebar() {
	const user = useAuthStore((state) => state.user);
	const signOut = useAuthStore((state) => state.signOut);
	const isLoading = useAuthStore((state) => state.isLoading);

	return (
		<Sidebar
			collapsible="icon"
			variant="inset"
		>
			<SidebarHeader className="px-3 py-4">
				<p className="text-sm font-semibold">Delete Old Tweets</p>
				<p className="text-sidebar-foreground/70 text-xs truncate">
					{user?.email ?? user?.user_metadata?.full_name ?? "X user"}
				</p>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									isActive
								>
									<Link to="/dashboard">
										<HomeIcon />
										<span>Dashboard</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<KeyRoundIcon />
									<span>OAuth Token</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="p-2">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							onClick={() => {
								void signOut();
							}}
							disabled={isLoading}
						>
							<LogOutIcon />
							<span>{isLoading ? "Signing out..." : "Sign out"}</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
