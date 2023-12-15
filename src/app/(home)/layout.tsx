import React, { ReactNode } from "react";
import Sidebar from "../../components/Sidebar";

type Props = {
	children: ReactNode;
};

export default function layout({ children }: Props) {
	return (
		<div className="h-screen w-full overflow-hidden fixed">
			<Sidebar />
			<main>{children}</main>
		</div>
	);
}
