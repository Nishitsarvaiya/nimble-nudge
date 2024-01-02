import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const session = await getServerSession(authOptions);
		if (!session) notFound();

		// ids of people who sent current logged in user a friend requests
		const incomingSenderIds = (await fetchRedis(
			"smembers",
			`user:${session.user.id}:incoming_friend_requests`
		)) as string[];

		const incomingFriendRequests = await Promise.all(
			incomingSenderIds.map(async (senderId) => {
				const sender = (await fetchRedis("get", `user:${senderId}`)) as string;
				const senderParsed = JSON.parse(sender) as User;

				return {
					senderId,
					senderEmail: senderParsed.email,
					senderName: senderParsed.name,
				};
			})
		);

		return NextResponse.json({
			incomingFriendRequests: incomingFriendRequests,
			sessionId: session.user.id,
		});
	} catch (error) {
		return new Response("Internal Server Error", { status: 500 });
	}
}
