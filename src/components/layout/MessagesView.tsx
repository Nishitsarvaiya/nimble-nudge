import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { chatHrefConstructor } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import ChatList from "../ChatList";
import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

type Props = {};

export default async function MessagesView({}: Props) {
	const session = await getServerSession(authOptions);
	if (!session) notFound();

	const friends = await getFriendsByUserId(session.user.id);

	let friendsWithLastMessage: ExtendedUser[] = [];

	if (friends.length > 0) {
		friendsWithLastMessage = (await Promise.all(
			friends.map(async (friend) => {
				const [lastMessageRaw] = (await fetchRedis(
					"zrange",
					`chat:${chatHrefConstructor(session.user.id, friend.id)}:messages`,
					-1,
					-1
				)) as string[];

				const lastMessage = lastMessageRaw ? (JSON.parse(lastMessageRaw) as Message) : "";

				return {
					...friend,
					lastMessage,
				};
			})
		)) as ExtendedUser[];
	}

	return (
		<div className="h-full max-h-screen">
			<div className="h-[100px] flex items-center justify-between px-8 pr-5">
				<div className="text-2xl font-semibold">
					Messages <span className="text-base font-medium">(26)</span>
				</div>
			</div>
			<ChatList friends={friendsWithLastMessage} sessionId={session.user.id} />
		</div>
	);
}
