"use client";

import ReactTextareaAutosize from "react-textarea-autosize";
import { Icons } from "../Icons";
import { useRef, useState } from "react";
import { toast } from "sonner";
// import axios from "axios";
import { Button } from "../ui/button";
import axios from "axios";

type Props = { chatPartner: User; chatId: string };

export default function ChatInput({ chatId, chatPartner }: Props) {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const [input, setInput] = useState<string>("");

	const sendMessage = async () => {
		if (!input) return;

		try {
			await axios.post("/api/chat/send", { text: input, chatId });
			setInput("");
			textareaRef.current?.focus();
		} catch {
			toast.error("Something went wrong. Please try again later.");
		} finally {
		}
	};

	return (
		<div className="absolute bottom-6 w-full px-8 z-20">
			<div className="relative">
				<ReactTextareaAutosize
					ref={textareaRef}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							sendMessage();
						}
					}}
					rows={1}
					maxRows={6}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Type message"
					className="block w-full resize-none py-5 pl-8 pr-[84px] rounded-2xl text-lg font-medium text-primary placeholder:text-muted-foreground transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 scrollbar-none bg-background/80 backdrop-blur-md"
				/>
				<Button variant="ghost" size="icon" className="absolute top-1/2 -translate-y-1/2 right-2">
					<Icons.send className="w-6 h-6 fill-primary" />
				</Button>
			</div>
		</div>
	);
}
