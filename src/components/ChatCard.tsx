import React, { ReactNode } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./ui/context-menu";
import { Icons } from "./Icons";

type Props = {
	children: ReactNode;
};

export default function ChatCard({ children }: Props) {
	return (
		<ContextMenu>
			<ContextMenuTrigger>{children}</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem>
					<div className="w-full flex items-center justify-between">
						<div>Delete</div>
						<Icons.delete className="w-4 h-4 fill-red-500" />
					</div>
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
