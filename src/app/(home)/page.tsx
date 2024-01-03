import { Icons } from "@/components/Icons";
import { FC } from "react";

interface pageProps {}

const Home: FC<pageProps> = ({}) => {
	return (
		<div className="h-screen bg-gray-500 relative">
			<div className="h-full w-full">
				<div className="h-full mx-auto flex flex-col gap-4 items-center justify-center max-w-xl">
					<Icons.logoDark className="w-20 h-20 fill-primary" />
					<h1 className="text-2xl font-semibold">Welcome to NimbleNudge</h1>
					<p className="text-base font-medium">Select a friend to chat</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
