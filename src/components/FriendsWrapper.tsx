"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Icons } from "./Icons";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function FriendsWrapper() {
	// const session = useSession();
	const [friends, setFriends] = useState<Friend[]>([]);

	useEffect(() => {
		const fetchFriends = async () => {
			const res = await fetch("/api/friends/all")
				.then((res) => res.json())
				.then((data) => setFriends(data.friends))
				.catch((error) => toast.error("Something went wrong!", { position: "top-center" }));
		};
		fetchFriends();
	}, []);

	// useEffect(() => {
	// 	const friendHandler = ({ id, email, name }: Friend) => {
	// 		setFriends((prev) => [...prev, { id, email, name }]);
	// 	};

	// 	if (session.data?.user.id) {
	// 		pusherClient.subscribe(toPusherKey(`user:${session.data?.user.id}:new_friend`));
	// 		console.log("listening to ", `user:${session.data?.user.id}:new_friend`);
	// 		pusherClient.bind("new_friend", friendHandler);
	// 	}

	// 	return () => {
	// 		if (session.data?.user.id) {
	// 			pusherClient.unsubscribe(toPusherKey(`user:${session.data?.user.id}:new_friend`));
	// 			pusherClient.unbind("new_friend", friendHandler);
	// 		}
	// 	};
	// }, [session.data?.user.id]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button asChild variant="ghost" size="icon">
					<div>
						<Icons.users className="w-8 h-8 fill-primary" />
					</div>
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-lg">
				<DialogHeader>
					<DialogTitle className="text-lg leading-none">Friends</DialogTitle>
				</DialogHeader>
				<div className="relative my-2">
					<Icons.search className="w-4 h-4 fill-muted-foreground absolute top-1/2 -translate-y-1/2 left-5" />
					<Input type="text" placeholder="Search chats" className="pl-12" />
				</div>
				<ScrollArea className="max-h-[600px]">
					<ul className="divide-y pr-4">
						{friends.map((friend) => (
							<li className="flex items-center justify-between py-3" key={friend.id} data-id={friend.id}>
								<div className="flex items-center justify-between w-full">
									<div className="flex items-center gap-4">
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
										<div>
											<div className="text-lg font-semibold leading-tight">{friend.name}</div>
											<div className="text-sm font-medium text-muted-foreground">
												{friend.email}
											</div>
										</div>
									</div>
									<div>
										<DropdownMenu>
											<DropdownMenuTrigger>
												<Button variant="ghost" size="icon" asChild>
													<div>
														<MoreHorizontal className="w-4 h-4 fill-primary" />
													</div>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuItem>
													<div className="w-full flex items-center justify-between">
														<div className="leading-none text-sm font-medium">Chat</div>
														<Icons.newMessage className="w-4 h-4 fill-primary" />
													</div>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<div className="w-full flex items-center justify-between">
														<div className="leading-none text-sm font-medium">Unfriend</div>
														<Icons.delete className="w-4 h-4 fill-red-600" />
													</div>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</div>
							</li>
						))}
					</ul>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
