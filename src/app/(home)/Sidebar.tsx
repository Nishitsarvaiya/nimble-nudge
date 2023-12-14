import Image from "next/image";
import React from "react";

type Props = {};

export default function Sidebar({}: Props) {
	return (
		<aside className="fixed h-full top-0 left-0 w-[100px]">
			<div className="flex flex-col h-full">
				<div className="flex flex-col items-center py-8 gap-8">
					<div className="relative w-10 h-10">
						<Image src="/logo-dark.svg" alt="NN" fill />
					</div>
					<div className="w-12 h-[1px] bg-gray"></div>
				</div>
			</div>
		</aside>
	);
}
