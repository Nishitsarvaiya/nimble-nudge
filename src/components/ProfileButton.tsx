"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

type Props = {};

export default function ProfileButton({}: Props) {
	const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

	const signUserOut = async () => {
		setIsSigningOut(true);

		try {
			await signOut();
		} catch (error) {
			toast.error("There was an error in signing out. Please try again.", { position: "top-center" });
		} finally {
			setIsSigningOut(false);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className="w-14 h-14 border-4 border-gray rounded-xl relative overflow-hidden">
					<Image src="/profile-picture.jpg" alt="" fill style={{ objectFit: "cover" }} />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" side="left" sideOffset={10} alignOffset={-85}>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem onClick={signUserOut}>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
