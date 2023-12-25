import React, { ReactNode } from "react";
import Sidebar from "../../components/Sidebar";
import Listview from "@/components/ListView";
import ChatLayout from "@/components/ChatLayout";

type Props = {
	children: ReactNode;
};

export default function layout({ children }: Props) {
	return (
		<div className="h-screen w-full overflow-hidden fixed main-layout">
			<Sidebar />
			<Listview />
			<ChatLayout>{children}</ChatLayout>
		</div>
	);
}
