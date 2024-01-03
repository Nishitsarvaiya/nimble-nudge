import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export default function ChatLayout({ children }: Props) {
	return (
		<div className="relative" id="ChatLayout">
			{children}
		</div>
	);
}
