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
		const friendsIds = (await fetchRedis("smembers", `user:${session.user.id}:friends`)) as string[];

		const friends = await Promise.all(
			friendsIds.map(async (friendId) => {
				const friend = (await fetchRedis("get", `user:${friendId}`)) as string;
				const parsedFriend = JSON.parse(friend) as User;

				return {
					id: friendId,
					email: parsedFriend.email,
					name: parsedFriend.name,
				};
			})
		);

		return NextResponse.json({
			friends: friends,
		});
	} catch (error) {
		return new Response("Internal Server Error", { status: 500 });
	}
}
