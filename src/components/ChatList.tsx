"use client";
import Image from "next/image";
import ChatCard from "./ChatCard";
import { Button } from "./ui/button";
import Link from "next/link";
import { chatHrefConstructor } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
	friends: Friend[];
	sessionId: string;
};

export default function ChatList({ friends, sessionId }: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

	useEffect(() => {
		if (pathname?.includes("chat")) {
			setUnseenMessages((prev) => {
				return prev.filter((msg) => !pathname.includes(msg.senderId));
			});
		}
	}, [pathname]);

	return (
		<ul className="space-y-2 py-2">
			{friends.sort().map((friend) => {
				const unseenMessagesCount = unseenMessages.filter((unseenMsg) => {
					return unseenMsg.senderId === friend.id;
				}).length;

				return (
					<li className="px-8 relative" key={friend.id}>
						{unseenMessagesCount > 0 && (
							<div className="w-2 h-2 rounded-full bg-blue-600 absolute left-8 top-1/2 -translate-y-1/2"></div>
						)}
						<ChatCard>
							<Button className="h-auto p-4 rounded-3xl" asChild variant="ghost">
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
										<div>
											<div className="text-lg">{friend.name}</div>
											<div className="text-sm text-muted-foreground">How are you?</div>
										</div>
									</div>
									<div>
										<div className="text-sm font-medium text-muted-foreground">16:30</div>
									</div>
								</Link>
							</Button>
						</ChatCard>
					</li>
				);
			})}
		</ul>
	);
}
