"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLoader from "@/hooks/useLoader";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { toast } from "sonner";

type Props = {
	session: Session;
};

export default function ProfileButton({ session }: Props) {
	const { showLoader, hideLoader } = useLoader();

	const signUserOut = async () => {
		showLoader();
		try {
			await signOut();
		} catch (error) {
			toast.error("There was an error in signing out. Please try again.", { position: "top-center" });
		} finally {
			hideLoader();
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className="w-14 h-14 border-4 border-gray rounded-xl relative overflow-hidden">
					<Image src="/profile-picture.jpg" alt="" fill style={{ objectFit: "cover" }} />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" side="left" sideOffset={10}>
				<DropdownMenuLabel>
					<div className="flex flex-col space-y-1">
						<p className="leading-none">{session.user.name}</p>
						<p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem onClick={signUserOut}>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
