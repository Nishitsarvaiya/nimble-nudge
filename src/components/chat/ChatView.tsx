"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Spinner from "../Spinner";
import { ScrollArea } from "../ui/scroll-area";
import ChatInput from "./ChatInput";
import { cn, toPusherKey } from "@/lib/utils";
import { format } from "date-fns";
import { pusherClient } from "@/lib/pusher";

type Props = {
	chatId: string;
	chatPartner: User;
	sessionId: string;
	initialMessages: Message[];
};

export default function ChatView({ chatId, chatPartner, sessionId, initialMessages }: Props) {
	const bottomRef = useRef<HTMLDivElement | null>(null);
	const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
	const [showChat, setShowChat] = useState<boolean>(true);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [messages, setMessages] = useState<Message[]>(initialMessages);

	// useEffect(() => {
	// 	const simulateDataFetching = () => {
	// 		// Simulate data fetching delay (replace with your actual data fetching logic)
	// 		setTimeout(() => {
	// 			setIsChatLoading(false);
	// 			setShowChat(true);
	// 		}, 1000); // Adjust the delay as needed
	// 	};

	// 	simulateDataFetching();
	// 	const scrollViewport = containerRef.current?.querySelector("[data-radix-scroll-area-viewport]");

	// 	const handleScroll = () => {
	// 		if (scrollViewport) {
	// 			const isAtBottom =
	// 				scrollViewport.scrollTop + scrollViewport.clientHeight === scrollViewport.scrollHeight;
	// 			if (isAtBottom) {
	// 				setShowChat(true);
	// 			}
	// 		}
	// 	};

	// 	if (scrollViewport) {
	// 		scrollViewport.addEventListener("scroll", handleScroll);
	// 	}

	// 	return () => {
	// 		if (scrollViewport) {
	// 			scrollViewport.removeEventListener("scroll", handleScroll);
	// 		}
	// 	};
	// }, []);

	// useEffect(() => {
	// 	const container = containerRef.current;
	// 	const bottom = bottomRef.current;

	// 	if (container && bottom && showChat) {
	// 		bottom.scrollIntoView();
	// 	}
	// }, [showChat]);

	useEffect(() => {
		pusherClient.subscribe(toPusherKey(`chat:${chatId}`));

		const messageHandler = (message: Message) => {
			setMessages((prev) => [message, ...prev]);
		};

		pusherClient.bind("incoming-message", messageHandler);

		return () => {
			pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`));
			pusherClient.unbind("incoming-message", messageHandler);
		};
	}, [chatId]);

	const formatTimestamp = (timestamp: number) => {
		return format(timestamp, "hh:mm bb");
	};

	return (
		<div className="relative z-[1]">
			<ScrollArea className="h-screen" ref={containerRef}>
				<div className="h-full py-[120px]">
					{showChat && (
						<div className="h-full px-8 flex flex-col-reverse">
							{messages.map((message, idx) => {
								const isCurrentUser = message.senderId === sessionId;

								const hasNextMessageFromSameUser =
									messages[idx + 1]?.senderId === messages[idx].senderId;

								const hasPrevMessageFromSameUser =
									messages[idx - 1]?.senderId === messages[idx].senderId;

								return (
									<div
										className={cn("mb-5", { "mb-2": hasPrevMessageFromSameUser })}
										key={`${message.id}-${message.timestamp}`}
										data-same={hasNextMessageFromSameUser}>
										<div
											className={cn("flex gap-2", {
												"justify-end": isCurrentUser,
											})}>
											<div
												className={cn({
													"order-2": isCurrentUser,
													"order-1": !isCurrentUser,
													invisible: hasNextMessageFromSameUser,
												})}>
												<div
													className={cn(
														"w-12 h-12 rounded-full overflow-hidden relative",
														{}
													)}>
													<Image
														src="/profile-picture.jpg"
														alt=""
														fill
														style={{ objectFit: "cover" }}
													/>
												</div>
											</div>
											<div
												className={cn("flex max-w-xl", {
													"order-1 items-end": isCurrentUser,
													"order-2 items-start": !isCurrentUser,
												})}>
												<span
													className={cn(
														"inline-flex items-end px-5 py-4 rounded-2xl text-base font-medium ",
														{
															"bg-primary text-white": isCurrentUser,
															"bg-background text-foreground": !isCurrentUser,
															"rounded-tr-[3px]":
																!hasNextMessageFromSameUser && isCurrentUser,
															"rounded-tl-[3px]":
																!hasNextMessageFromSameUser && !isCurrentUser,
														}
													)}>
													<span className="">{message.text}</span>
													<span className="ml-3  text-xs text-muted-foreground whitespace-nowrap">
														{formatTimestamp(message.timestamp)}
													</span>
												</span>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
				<div ref={bottomRef}></div>
			</ScrollArea>
			{!isChatLoading && <ChatInput chatId={chatId} chatPartner={chatPartner} />}

			{isChatLoading && !showChat && (
				<>
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
						<Spinner />
					</div>
				</>
			)}
		</div>
	);
}
