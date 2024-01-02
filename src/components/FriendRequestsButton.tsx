"use client";

import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Icons } from "./Icons";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";

type Props = {};

export default function FriendRequestsButton({}: Props) {
	const session = useSession();
	const router = useRouter();
	const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>([]);

	useEffect(() => {
		const fetchRequests = async () => {
			const res = await fetch("/api/friend-requests")
				.then((res) => res.json())
				.then((data) => setFriendRequests(data.incomingFriendRequests))
				.catch((error) => toast.error("Something went wrong!", { position: "top-center" }));
		};
		fetchRequests();
	}, []);

	useEffect(() => {
		pusherClient.subscribe(toPusherKey(`user:${session.data?.user.id}:incoming_friend_requests`));
		console.log("listening to ", `user:${session.data?.user.id}:incoming_friend_requests`);

		const friendRequestHandler = ({ senderId, senderEmail, senderName }: IncomingFriendRequest) => {
			setFriendRequests((prev) => [...prev, { senderId, senderEmail, senderName }]);
		};

		pusherClient.bind("incoming_friend_requests", friendRequestHandler);

		return () => {
			pusherClient.unsubscribe(toPusherKey(`user:${session.data?.user.id}:incoming_friend_requests`));
			pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
		};
	}, [session.data?.user.id]);

	const acceptFriend = async (senderId: string) => {
		await axios.post("/api/friends/accept", { id: senderId });
		setFriendRequests((prev) => prev.filter((request) => request.senderId !== senderId));
		router.refresh();
	};

	const denyFriend = async (senderId: string) => {
		await axios.post("/api/friends/deny", { id: senderId });
		setFriendRequests((prev) => prev.filter((request) => request.senderId !== senderId));
		router.refresh();
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" size="icon">
					<div>
						<Icons.bell className="w-8 h-8 fill-primary p-0" />
					</div>
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle className="text-lg leading-none">Notifications</DialogTitle>
				</DialogHeader>
				<ScrollArea className="max-h-[600px]">
					<ul className="divide-y pr-4">
						{friendRequests.map((req) => (
							<li className="flex items-center justify-between py-3" key={req.senderId}>
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
											<div className="text-lg font-semibold leading-tight">{req.senderName}</div>
											<div className="text-sm text-muted-foreground">{req.senderEmail}</div>
										</div>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<Button size="sm" className="text-sm" onClick={() => acceptFriend(req.senderId)}>
										Accept
									</Button>
									<Button
										size="sm"
										className="text-sm"
										variant="outline"
										onClick={() => denyFriend(req.senderId)}>
										Decline
									</Button>
								</div>
							</li>
						))}
					</ul>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
