import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { primaryFont } from "./fonts";
import clsx from "clsx";

export const metadata: Metadata = {
	title: "NimbleNudge | Messenger",
	description: "A Messenger web application built using Next.js, Redis & Next-Auth",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={clsx(primaryFont.className, primaryFont.variable)}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
