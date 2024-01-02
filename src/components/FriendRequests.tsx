"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import axios from "axios";

type Props = {
	incomingFriendRequests: IncomingFriendRequest[];
};

export default function FriendRequests({ incomingFriendRequests }: Props) {
	const session = useSession();
	const router = useRouter();
	const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(incomingFriendRequests);

	useEffect(() => {
		pusherClient.subscribe(toPusherKey(`user:${session.data?.user.id}:incoming_friend_requests`));
		console.log("listening to ", `user:${session.data?.user.id}:incoming_friend_requests`);

		const friendRequestHandler = ({ senderId, senderEmail, senderName }: IncomingFriendRequest) => {
			console.log("friendRequestHandler got called");
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
		<ul className="divide-y pr-4">
			{friendRequests.map((req) => (
				<li className="flex items-center justify-between py-3" key={req.senderId}>
					<div className="flex items-center justify-between w-full">
						<div className="flex items-center gap-4">
							<div>
								<div className="w-12 h-12 rounded-full overflow-hidden relative">
									<Image src="/profile-picture.jpg" alt="" fill style={{ objectFit: "cover" }} />
								</div>
							</div>
							<div>
								<div className="text-lg font-semibold leading-tight">{req.senderName}</div>
								<div className="text-sm text-muted-foreground">{req.senderEmail}</div>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Button size="sm" className="text-sm">
							Accept
						</Button>
						<Button size="sm" className="text-sm" variant="outline">
							Decline
						</Button>
					</div>
				</li>
			))}
		</ul>
	);
}
