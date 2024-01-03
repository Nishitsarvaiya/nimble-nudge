import { chatHrefConstructor, cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
	sessionId: string;
	senderId: string;
	senderImg: string;
	senderName: string;
	senderMessage: string;
};

export default function UnseenChatToast({ senderId, sessionId, senderImg, senderName, senderMessage }: Props) {
	return (
		<div>
			<a href={`/chat/${chatHrefConstructor(sessionId, senderId)}`} className="flex-1 w-0">
				<div className="flex items-start">
					<div className="flex-shrink-0 pt-0.5">
						<div className="relative h-10 w-10 rounded-full overflow-hidden">
							<Image src="/profile-picture.jpg" alt="" fill style={{ objectFit: "cover" }} />
						</div>
					</div>

					<div className="ml-3 flex-1">
						<p className="text-base font-medium text-foreground">{senderName}</p>
						<p className="text-sm text-foreground">{senderMessage}</p>
					</div>
				</div>
			</a>
		</div>
	);
}
