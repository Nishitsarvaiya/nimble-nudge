import React, { ReactNode } from "react";
import Sidebar from "../../components/Sidebar";
import Listview from "@/components/ListView";

type Props = {
	children: ReactNode;
};

export default function layout({ children }: Props) {
	return (
		<div className="h-screen w-full overflow-hidden fixed main-layout">
			<Sidebar />
			<Listview />
			<main className="">{children}</main>
			<aside></aside>
		</div>
	);
}
