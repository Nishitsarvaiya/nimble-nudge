import ChatInput from "./ChatInput";
import { ScrollArea } from "./ui/scroll-area";

type Props = {};

export default function ChatView({}: Props) {
	return (
		<div className="relative h-full">
			<ScrollArea className="h-full"></ScrollArea>
			<ChatInput />
		</div>
	);
}
