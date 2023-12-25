"use client";

import React, { ReactNode } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Listview from "@/components/layout/ListView";
import ChatLayout from "@/components/chat/ChatLayout";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

type Props = {
	children: ReactNode;
};

export default function layout({ children }: Props) {
	return (
		<div className="h-screen w-full overflow-hidden fixed main-layout">
			<Sidebar />
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel minSize={25} maxSize={50} defaultSize={25}>
					<Listview />
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={100}>
					<ChatLayout>{children}</ChatLayout>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
