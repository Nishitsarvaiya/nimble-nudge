"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Spinner from "../Spinner";
import { ScrollArea } from "../ui/scroll-area";
import ChatInput from "./ChatInput";
import { cn, formatTimestamp, toPusherKey } from "@/lib/utils";
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
	const [showChat, setShowChat] = useState<boolean>(true);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [messages, setMessages] = useState<Message[]>(initialMessages);

	useEffect(() => {
		const bottom = bottomRef.current;
		bottom?.scrollIntoView();
	}, [messages]);

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

	return (
		<div className="relative z-[1] before:absolute before:w-full before:h-28 before:bg-gradient-to-t from-black via-black to-transparent before:bottom-0 before:z-[1]">
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
													className={cn("inline-flex items-end px-5 py-4 rounded-2xl", {
														"bg-primary text-white dark:bg-blue": isCurrentUser,
														"bg-background text-foreground dark:bg-muted": !isCurrentUser,
														"rounded-tr-[3px]":
															!hasNextMessageFromSameUser && isCurrentUser,
														"rounded-tl-[3px]":
															!hasNextMessageFromSameUser && !isCurrentUser,
													})}>
													<span className="font-medium text-lg">{message.text}</span>
													<span
														className={cn(
															"ml-3 text-xs leading-[16px] text-muted-foreground whitespace-nowrap",
															{
																"text-white": isCurrentUser,
															}
														)}>
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
			<ChatInput chatId={chatId} chatPartner={chatPartner} />
		</div>
	);
}
