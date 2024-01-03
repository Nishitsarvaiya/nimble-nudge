import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Session } from "next-auth";
import Link from "next/link";
import FriendRequestsWrapper from "../FriendRequestsWrapper";
import ProfileButton from "../ProfileButton";

type Props = {
	session: Session;
};

export default function Sidebar({ session }: Props) {
	return (
		<aside className="h-full border-r">
			<div className="flex flex-col items-center justify-between h-full">
				<div className="flex flex-col items-center py-6 gap-4">
					<ProfileButton session={session} />
					{/* <Button asChild variant="ghost" size="icon">
						<Link href="/">
							<Icons.logoDark className="w-10 h-10 fill-primary" />
						</Link>
					</Button> */}

					<div className="w-12 h-[1px] bg-gray"></div>
					<div className="flex flex-col items-center gap-1">
						<Button asChild variant="ghost" size="icon">
							<Link href="/">
								<Icons.messages className="w-8 h-8 fill-primary" />
							</Link>
						</Button>
						{/* <FriendsWrapper sessionId={session.user.id} /> */}

						<Button asChild variant="ghost" size="icon">
							<Link href="/add-friend">
								<Icons.addUser className="w-8 h-8 fill-primary" />
							</Link>
						</Button>
						<FriendRequestsWrapper sessionId={session.user.id} />
					</div>
				</div>
				<div className="flex flex-col items-center py-10 gap-14">
					<Switch id="theme-switcher" className="relative rotate-90 origin-center mb-4">
						<div className="h-full w-full flex items-center justify-center absolute">
							<div className="h-full flex-1 flex items-center justify-center ml-[-2px]">
								<Icons.sun className="fill-primary h-5 w-5" />
							</div>
							<div className="h-full flex-1 flex items-center justify-center mr-[-2px]">
								<Icons.moon className="fill-primary h-5 w-5 -rotate-90" />
							</div>
						</div>
					</Switch>
				</div>
			</div>
		</aside>
	);
}
