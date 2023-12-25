"use client";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useState } from "react";
import ProfileButton from "../ProfileButton";

export default function Sidebar() {
	const [isLightTheme, setIsLightTheme] = useState<boolean>(false);
	return (
		<aside className="h-full border-r">
			<div className="flex flex-col items-center justify-between h-full">
				<div className="flex flex-col items-center py-6 gap-4">
					<Button asChild variant="ghost" size="icon">
						<Link href="/">
							<Icons.logoDark className="w-10 h-10 fill-primary" />
						</Link>
					</Button>

					<div className="w-12 h-[1px] bg-gray"></div>
					<div className="flex flex-col items-center gap-1">
						<Button asChild variant="ghost" size="icon">
							<Link href="/">
								<Icons.messages className="w-8 h-8 fill-primary" />
							</Link>
						</Button>
						<Button asChild variant="ghost" size="icon">
							<Link href="/people">
								<Icons.users className="w-8 h-8 fill-primary" />
							</Link>
						</Button>
						<Button asChild variant="ghost" size="icon">
							<Link href="/add-friend">
								<Icons.addUser className="w-8 h-8 fill-primary" />
							</Link>
						</Button>
						<Button asChild variant="ghost" size="icon">
							<Link href="/notifications">
								<Icons.bell className="w-8 h-8 fill-primary" />
							</Link>
						</Button>
					</div>
				</div>
				<div className="flex flex-col items-center py-10 gap-14">
					<Switch
						id="theme-switcher"
						className="relative rotate-90"
						checked={isLightTheme}
						onCheckedChange={(checked) => setIsLightTheme(checked)}>
						<div className="h-full w-full flex items-center justify-center absolute">
							<div className="h-full flex-1 flex items-center justify-center ml-[-2px]">
								<Icons.sun className="fill-primary h-5 w-5" />
							</div>
							<div className="h-full flex-1 flex items-center justify-center mr-[-2px]">
								<Icons.moon className="fill-primary h-5 w-5 -rotate-90" />
							</div>
						</div>
					</Switch>
					<ProfileButton />
				</div>
			</div>
		</aside>
	);
}
