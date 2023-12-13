"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FC, useState } from "react";
import { toast } from "sonner";

interface pageProps {}

const SignInPage: FC<pageProps> = ({}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const signInWithGoogle = async () => {
		setIsLoading(true);
		try {
			await signIn("google");
		} catch (error) {
			toast.error("Something went wrong! Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<main>
			<section className="h-screen w-full fixed">
				<div className="h-full max-w-xl px-5 mx-auto">
					<div className="h-full flex flex-col items-center justify-center">
						<div className="w-24 mb-10">
							<Image src="/logo-dark.svg" alt="" width={200} height={148} priority />
						</div>
						<Button
							variant="outline"
							className="h-[65px] w-full text-xl mb-3 disabled:opacity-100"
							title="Sign in with Google"
							isLoading={isLoading}
							onClick={signInWithGoogle}>
							{isLoading ? (
								<Loader2 className="h-8 w-8 animate-spin stroke-primary" />
							) : (
								"Sign in with Google"
							)}
						</Button>
						<Button variant="outline" className="h-[65px] w-full text-xl">
							Sign in with Facebook
						</Button>
					</div>
				</div>
			</section>
		</main>
	);
};

export default SignInPage;
