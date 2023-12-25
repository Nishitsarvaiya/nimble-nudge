import Image from "next/image";
import ChatInput from "./ChatInput";
import { ScrollArea } from "./ui/scroll-area";

type Props = {};

export default function ChatView({}: Props) {
	return (
		<div className="relative z-[1]">
			<ScrollArea className="h-screen">
				<div className="h-full py-[120px]">
					<div className="h-full px-8 flex flex-col gap-10">
						<div className="group">
							<div className="flex gap-2">
								<div>
									<div className="w-12 h-12 rounded-full overflow-hidden relative">
										<Image src="/profile-picture.jpg" alt="" fill style={{ objectFit: "cover" }} />
									</div>
								</div>
								<div className="flex-1 max-w-2xl">
									<div className="text-base leading-none text-muted-foreground font-medium mb-1">
										Nishit Sarvaiya
									</div>
									<div className="flex flex-col gap-1 items-start">
										<div className="inline-block bg-primary-foreground px-5 py-4 rounded-2xl rounded-tl-[3px]">
											<span className="text-base font-medium">
												Hey! I have a great news to tell you
											</span>
										</div>
										<div className="inline-block bg-primary-foreground px-5 py-4 rounded-2xl">
											<span className="text-base font-medium">I just bought Macbook</span>
										</div>
										<div className="inline-block bg-primary-foreground px-5 py-4 rounded-2xl">
											<span className="text-base font-medium">
												Its Macbook Air M2 15 inch. It has 8GB of RAM and 256GB SSD. I wanted
												the Midnight color but they told me they didn’t have it in stock. But
												then they called again after 15 minutes and told me that it is available
												now.
											</span>
										</div>
									</div>
									<div className="text-sm text-muted-foreground font-medium mt-1">16:30</div>
								</div>
							</div>
						</div>
						<div className="group">
							<div className="flex gap-2 flex-row-reverse">
								<div>
									<div className="w-12 h-12 rounded-full overflow-hidden relative">
										<Image src="/profile-picture.jpg" alt="" fill style={{ objectFit: "cover" }} />
									</div>
								</div>
								<div className="flex-1 max-w-2xl flex flex-col items-end">
									<div className="text-base leading-none text-muted-foreground font-medium mb-1">
										You
									</div>
									<div className="flex flex-col gap-1 items-end">
										<div className="inline-block bg-primary px-5 py-4 rounded-2xl rounded-tr-[3px]">
											<span className="text-base text-primary-foreground font-medium">
												That is such a great news man.
											</span>
										</div>
										<div className="inline-block bg-primary px-5 py-4 rounded-2xl">
											<span className="text-base text-primary-foreground font-medium">
												Let’s celebrate! Drinks are on you
											</span>
										</div>
									</div>
									<div className="text-sm text-muted-foreground font-medium mt-1">16:30</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ScrollArea>
			<ChatInput />
		</div>
	);
}
