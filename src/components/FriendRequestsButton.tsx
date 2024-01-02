"use client";

import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Icons } from "./Icons";

export default function FriendRequestsButton() {
	const [unseenRequestCount, setUnseenRequestCount] = useState<number>(0);
	const session = useSession();

	useEffect(() => {
		const fetchUnseenRequestCount = async () => {
			const res = await fetch("/api/friend-request-count")
				.then((res) => res.json())
				.then((data) => setUnseenRequestCount(data.unseenRequestCount))
				.catch((error) => toast.error("Something went wrong!", { position: "top-center" }));
		};
		fetchUnseenRequestCount();
	}, []);

	useEffect(() => {
		const friendRequestHandler = () => {
			setUnseenRequestCount((prev) => prev + 1);
		};

		const addedFriendHandler = () => {
			setUnseenRequestCount((prev) => prev - 1);
		};

		if (session.data?.user.id) {
			pusherClient.subscribe(toPusherKey(`user:${session.data?.user.id}:incoming_friend_requests`));
			pusherClient.subscribe(toPusherKey(`user:${session.data?.user.id}:friends`));

			pusherClient.bind("incoming_friend_requests", friendRequestHandler);
			pusherClient.bind("new_friend", addedFriendHandler);
		}

		return () => {
			if (session.data?.user) {
				pusherClient.unsubscribe(toPusherKey(`user:${session.data?.user.id}:incoming_friend_requests`));
				pusherClient.unsubscribe(toPusherKey(`user:${session.data?.user.id}:friends`));

				pusherClient.unbind("new_friend", addedFriendHandler);
				pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
			}
		};
	}, [session.data?.user.id]);

	return (
		<div className="relative">
			<Icons.bell className="w-8 h-8 fill-primary p-0" />
			{unseenRequestCount > 0 && (
				<div className="rounded-full w-5 h-5 text-xs flex justify-center items-center text-background bg-foreground leading-none absolute -right-2 -top-2">
					{unseenRequestCount}
				</div>
			)}
		</div>
	);
}
