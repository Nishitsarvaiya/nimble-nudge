import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";

type Props = {
	children: ReactNode;
};

export default function layout({ children }: Props) {
	return (
		<div className="h-screen w-full overflow-hidden fixed">
			<Sidebar />
			{children}
		</div>
	);
}
