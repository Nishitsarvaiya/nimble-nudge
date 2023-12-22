import ChatView from "@/components/ChatView";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FC } from "react";

interface pageProps {}

const Home: FC<pageProps> = ({}) => {
	return (
		<div className="h-screen bg-gray-500 relative">
			<div className="h-[100px] w-full bg-background px-8 absolute top-0 left-0">
				<div className="h-full flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div>
							<div className="w-[60px] h-[60px] rounded-full overflow-hidden relative">
								<Image src="/profile-picture.jpg" alt="" fill style={{ objectFit: "cover" }} />
							</div>
						</div>
						<div>
							<div className="text-2xl font-semibold">Nishit Sarvaiya</div>
						</div>
					</div>
					<div>
						<Button variant="ghost" size="icon">
							<Icons.sidebar className="w-6 h-6 fill-primary" />
						</Button>
					</div>
				</div>
			</div>
			<ChatView />
		</div>
	);
};

export default Home;
