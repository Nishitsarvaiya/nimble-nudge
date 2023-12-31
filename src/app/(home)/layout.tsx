import React, { ReactNode } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Listview from "@/components/layout/ListView";
import ChatLayout from "@/components/chat/ChatLayout";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import MainLayout from "@/components/layout/MainLayout";

type Props = {
	children: ReactNode;
};

export default async function layout({ children }: Props) {
	const session = await getServerSession(authOptions);
	return (
		<div className="h-screen w-full overflow-hidden fixed main-layout">
			<Sidebar session={session!} />
			<Listview />
			<MainLayout>{children}</MainLayout>
			{/* <ResizablePanelGroup direction="horizontal">
				<ResizablePanel minSize={25} maxSize={50} defaultSize={25} className="min-w-[400px]">
					<Listview />
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={75}>
					<ChatLayout>{children}</ChatLayout>
				</ResizablePanel>
			</ResizablePanelGroup> */}
		</div>
	);
}
