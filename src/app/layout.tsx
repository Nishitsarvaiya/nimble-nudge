import type { Metadata } from "next";
import "./globals.css";
import { primaryFont } from "./fonts";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

export const metadata: Metadata = {
	title: "NimbleNudge | Messenger",
	description: "A Messenger web application built using Next.js, Redis & Next-Auth",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={cn("min-h-screen antialiased", primaryFont.className, primaryFont.variable)}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
