import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const session = await getServerSession(authOptions);
		if (!session) notFound();

		const count = ((await fetchRedis("smembers", `user:${session.user.id}:incoming_friend_requests`)) as User[])
			.length;

		return NextResponse.json({
			unseenRequestCount: count,
			sessionId: session.user.id,
		});
	} catch (error) {
		return new Response("Internal Server Error", { status: 500 });
	}
}
