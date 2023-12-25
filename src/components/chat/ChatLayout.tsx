import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export default function ChatLayout({ children }: Props) {
	return <main className="border-r relative">{children}</main>;
}
