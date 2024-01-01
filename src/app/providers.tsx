"use client";

import Loader from "@/components/Loader";
import { LoaderContextProvider } from "@/contexts/LoaderContext";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Toaster } from "sonner";

type Props = {
	children: ReactNode;
};

export default function Providers({ children }: Props) {
	return (
		<SessionProvider>
			<LoaderContextProvider>
				{children}
				<Loader />
				<Toaster
					closeButton
					theme="system"
					toastOptions={{
						classNames: { success: "bg-foreground", error: "!bg-red-600 !border-red-600 !text-white" },
					}}
				/>
			</LoaderContextProvider>
		</SessionProvider>
	);
}
