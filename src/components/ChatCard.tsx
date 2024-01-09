import React, { ReactNode } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./ui/context-menu";
import { Icons } from "./Icons";
import { toast } from "sonner";
import { clearChatFromDb } from "@/actions/actions";
import { useRouter } from "next/navigation";

type Props = {
	children: ReactNode;
	chatId: string;
};

export default function ChatCard({ chatId, children }: Props) {
	const router = useRouter();

	const clearChatHandler = async () => {
		try {
			await clearChatFromDb(chatId);
			router.push("/");
		} catch (error) {
			toast.error("Something went wrong! Please try again later.");
		}
	};
	return (
		<ContextMenu>
			<ContextMenuTrigger>{children}</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem onClick={clearChatHandler}>
					<div className="w-full flex items-center justify-between">
						<div>Clear chat</div>
						<Icons.delete className="w-4 h-4 fill-red-500" />
					</div>
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
