import Image from "next/image";
import ChatCard from "../ChatCard";
import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ChatList from "../ChatList";
import { toast } from "sonner";
import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id";
import { notFound } from "next/navigation";

type Props = {};

export default async function MessagesView({}: Props) {
	const session = await getServerSession(authOptions);
	if (!session) notFound();

	const friends = await getFriendsByUserId(session.user.id);
	console.log("friends", friends);

	return (
		<div className="h-full max-h-screen">
			<div className="h-[100px] flex items-center justify-between pl-8 pr-5">
				<div className="text-2xl font-semibold">
					Messages <span className="text-base font-medium">(26)</span>
				</div>
			</div>
			<div className="flex items-center justify-between gap-3 pl-8 pr-5 pb-5">
				<div className="flex-1 relative">
					<Icons.search className="w-4 h-4 fill-muted-foreground absolute top-1/2 -translate-y-1/2 left-5" />
					<Input type="text" placeholder="Search chats" className="pl-12" />
				</div>
				<Button variant="ghost" size="icon">
					<Icons.filters className="w-6 h-6 fill-primary" />
				</Button>
			</div>
			{friends.length == 0 && (
				<div className="px-8 py-5">
					<div className="flex flex-col items-center justify-center">
						<Icons.messages className="w-8 h-8 fill-muted-foreground" />
						<div className="text-base font-medium text-center text-muted-foreground mt-4">Your chats</div>
					</div>
				</div>
			)}

			<ScrollArea style={{ maxHeight: "calc(100% - 176px)" }}>
				<ChatList friends={friends} sessionId={session.user.id} />
			</ScrollArea>
		</div>
	);
}
