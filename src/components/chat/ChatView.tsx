"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Spinner from "../Spinner";
import { ScrollArea } from "../ui/scroll-area";
import ChatInput from "./ChatInput";

type Props = {};

export default function ChatView({}: Props) {
	const bottomRef = useRef<HTMLDivElement | null>(null);
	const [isChatLoading, setIsChatLoading] = useState<boolean>(true);
	const [showChat, setShowChat] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const simulateDataFetching = () => {
			// Simulate data fetching delay (replace with your actual data fetching logic)
			setTimeout(() => {
				setIsChatLoading(false);
				setShowChat(true);
			}, 1000); // Adjust the delay as needed
		};

		simulateDataFetching();
		const scrollViewport = containerRef.current?.querySelector("[data-radix-scroll-area-viewport]");

		const handleScroll = () => {
			if (scrollViewport) {
				const isAtBottom =
					scrollViewport.scrollTop + scrollViewport.clientHeight === scrollViewport.scrollHeight;
				if (isAtBottom) {
					setShowChat(true);
				}
			}
		};

		if (scrollViewport) {
			scrollViewport.addEventListener("scroll", handleScroll);
		}

		return () => {
			if (scrollViewport) {
				scrollViewport.removeEventListener("scroll", handleScroll);
			}
		};
	}, []);

	useEffect(() => {
		const container = containerRef.current;
		const bottom = bottomRef.current;

		if (container && bottom && showChat) {
			bottom.scrollIntoView();
		}
	}, [showChat]);

	return (
		<div className="relative z-[1]">
			<ScrollArea className="h-screen" ref={containerRef}>
				<div className="h-full py-[120px]">
					{showChat && (
						<div className="h-full px-8 flex flex-col gap-10">
							<div className="group">
								<div className="flex gap-2">
									<div>
										<div className="w-12 h-12 rounded-full overflow-hidden relative">
											<Image
												src="/profile-picture.jpg"
												alt=""
												fill
												style={{ objectFit: "cover" }}
											/>
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
													Its Macbook Air M2 15 inch. It has 8GB of RAM and 256GB SSD. I
													wanted the Midnight color but they told me they didn’t have it in
													stock. But then they called again after 15 minutes and told me that
													it is available now.
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
											<Image
												src="/profile-picture.jpg"
												alt=""
												fill
												style={{ objectFit: "cover" }}
											/>
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
							<div className="group">
								<div className="flex gap-2">
									<div>
										<div className="w-12 h-12 rounded-full overflow-hidden relative">
											<Image
												src="/profile-picture.jpg"
												alt=""
												fill
												style={{ objectFit: "cover" }}
											/>
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
													Its Macbook Air M2 15 inch. It has 8GB of RAM and 256GB SSD. I
													wanted the Midnight color but they told me they didn’t have it in
													stock. But then they called again after 15 minutes and told me that
													it is available now.
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
											<Image
												src="/profile-picture.jpg"
												alt=""
												fill
												style={{ objectFit: "cover" }}
											/>
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
					)}
				</div>
				<div ref={bottomRef}></div>
			</ScrollArea>
			{!isChatLoading && <ChatInput />}

			{isChatLoading && !showChat && (
				<>
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
						<Spinner color="primary" />
					</div>
				</>
			)}
		</div>
	);
}
