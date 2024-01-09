"use client";
import { pusherClient } from "@/lib/pusher";
import { chatHrefConstructor, cn, formatTimestamp, toPusherKey } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";
import ChatCard from "./ChatCard";
import UnseenChatToast from "./UnseenChatToast";
import { Button } from "./ui/button";
import { Icons } from "./Icons";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { XCircle } from "lucide-react";

type Props = {
	friends: ExtendedUser[];
	sessionId: string;
};

export default function ChatList({ friends, sessionId }: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);
	const [search, setSearch] = useState<string>("");
	const [activeChats, setActiveChats] = useState<ExtendedUser[]>(friends);
	const [filteredChats, setFilteredChats] = useState<ExtendedUser[]>(activeChats);

	useEffect(() => {
		pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`));
		pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

		const newFriendHandler = (newFriend: ExtendedUser) => {
			setActiveChats((prev) => [...prev, newFriend]);
		};

		const chatHandler = (message: ExtendedMessage) => {
			const shouldNotify = pathname !== `/chat/${chatHrefConstructor(sessionId, message.senderId)}`;

			if (!shouldNotify) return;

			// should be notified
			toast(
				<UnseenChatToast
					sessionId={sessionId}
					senderId={message.senderId}
					senderImg={message.senderImg}
					senderMessage={message.text}
					senderName={message.senderName}
				/>,
				{ position: "top-center", duration: 100000 }
			);

			setUnseenMessages((prev) => [...prev, message]);
		};

		pusherClient.bind("new_message", chatHandler);
		pusherClient.bind("new_friend", newFriendHandler);

		return () => {
			pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`));
			pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));

			pusherClient.unbind("new_message", chatHandler);
			pusherClient.unbind("new_friend", newFriendHandler);
		};
	}, [pathname, sessionId, router]);

	useEffect(() => {
		if (pathname?.includes("chat")) {
			setUnseenMessages((prev) => {
				return prev.filter((msg) => !pathname.includes(msg.senderId));
			});
		}
	}, [pathname]);

	useEffect(() => {
		setFilteredChats(activeChats.filter((chat) => chat.name.toLowerCase().startsWith(search)));
	}, [search]);

	const isChatActive = (senderId: string) => {
		return pathname.includes(senderId);
	};

	const searchHandler: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) =>
		setSearch(e.target.value);

	return (
		<>
			<div className="flex items-center justify-between gap-3 px-8 pb-5">
				<div className="flex-1 relative">
					<Icons.search className="w-4 h-4 fill-muted-foreground absolute top-1/2 -translate-y-1/2 left-5" />
					<Input
						type="text"
						placeholder="Search chats"
						className="px-12"
						value={search}
						onChange={searchHandler}
					/>
					{search && (
						<Button asChild variant="ghost" className="p-0" onClick={() => setSearch("")}>
							<span className="absolute top-1/2 -translate-y-1/2 right-5">
								<XCircle className="w-4 h-4 fill-none stroke-muted-foreground" />
							</span>
						</Button>
					)}
				</div>
				{/* <Button variant='ghost' size='icon'>
					<Icons.filters className='w-6 h-6 fill-primary' />
				</Button> */}
			</div>

			{/* if No active chats */}
			{activeChats.length == 0 ? (
				<div className="px-8 py-5">
					<div className="flex flex-col items-center justify-center">
						<Icons.messages className="w-8 h-8 fill-muted-foreground" />
						<div className="text-base font-medium text-center text-muted-foreground mt-4">Your chats</div>
					</div>
				</div>
			) : null}
			{/* if No active chats */}

			{filteredChats.length == 0 ? (
				<div className="px-8 py-5">
					<div className="flex flex-col items-center justify-center">
						<Icons.messages className="w-8 h-8 fill-muted-foreground" />
						<div className="text-base font-medium text-center text-muted-foreground mt-4">No results</div>
					</div>
				</div>
			) : (
				<ScrollArea style={{ maxHeight: "calc(100% - 176px)" }}>
					<ul className="space-y-2 py-2">
						{filteredChats.sort().map((friend) => {
							const unseenMessagesCount = unseenMessages.filter((unseenMsg) => {
								return unseenMsg.senderId === friend.id;
							}).length;

							return (
								<li className="px-8 relative" key={friend.id}>
									{unseenMessagesCount > 0 && (
										<div className="w-2 h-2 rounded-full bg-blue-600 absolute left-8 top-1/2 -translate-y-1/2"></div>
									)}
									<ChatCard>
										<Button
											className={cn("h-auto p-4 rounded-3xl", {
												"hover:bg-initial": isChatActive(friend.id),
											})}
											asChild
											variant={isChatActive(friend.id) ? "default" : "ghost"}>
											<Link
												href={`/chat/${chatHrefConstructor(sessionId, friend.id)}`}
												className="flex items-center justify-between w-full">
												<div className="flex items-center gap-4">
													<div>
														<div className="w-[60px] h-[60px] rounded-full overflow-hidden relative">
															<Image
																src="/profile-picture.jpg"
																alt=""
																fill
																style={{ objectFit: "cover" }}
															/>
														</div>
													</div>
													<div className="max-w-[150px]">
														<div className="text-lg">{friend.name}</div>
														{friend.lastMessage && (
															<div
																className={cn(
																	"text-sm text-ellipsis font-medium overflow-clip",
																	{
																		"text-muted": isChatActive(friend.id),
																		"text-muted-foreground": !isChatActive(
																			friend.id
																		),
																	}
																)}>
																{friend.lastMessage.text}
															</div>
														)}
													</div>
												</div>
												<div>
													<div className="text-xs font-medium text-muted-foreground">
														{friend.lastMessage &&
															formatTimestamp(friend.lastMessage.timestamp)}
													</div>
												</div>
											</Link>
										</Button>
									</ChatCard>
								</li>
							);
						})}
					</ul>
				</ScrollArea>
			)}
		</>
	);
}
