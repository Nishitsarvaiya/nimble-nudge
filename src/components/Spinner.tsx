import { cn } from "@/lib/utils";
import React from "react";

type Props = {
	color: string;
};

export default function Spinner({ color }: Props) {
	return (
		<div className={cn("relative text-4xl w-[1em] h-[1em]")}>
			<div className="absolute left-[0.4629em] bottom-0 w-[0.084em] h-[0.2777em] rounded-[0.5em] origin-[center_-0.2222em] bg-transparent animate-spinner"></div>
			<div
				className="absolute left-[0.4629em] bottom-0 w-[0.084em] h-[0.2777em] rounded-[0.5em] origin-[center_-0.2222em] bg-transparent animate-spinner rotate-30"
				style={{ animationDelay: "0.083s" }}></div>
			<div
				className="absolute left-[0.4629em] bottom-0 w-[0.084em] h-[0.2777em] rounded-[0.5em] origin-[center_-0.2222em] bg-transparent animate-spinner rotate-60"
				style={{ animationDelay: "0.166s" }}></div>
			<div
				className="absolute left-[0.4629em] bottom-0 w-[0.084em] h-[0.2777em] rounded-[0.5em] origin-[center_-0.2222em] bg-transparent animate-spinner rotate-90"
				style={{ animationDelay: "0.249s" }}></div>
			<div
				className="absolute left-[0.4629em] bottom-0 w-[0.084em] h-[0.2777em] rounded-[0.5em] origin-[center_-0.2222em] bg-transparent animate-spinner rotate-120"
				style={{ animationDelay: "0.332s" }}></div>
			<div
				className="absolute left-[0.4629em] bottom-0 w-[0.084em] h-[0.2777em] rounded-[0.5em] origin-[center_-0.2222em] bg-transparent animate-spinner rotate-150"
				style={{ animationDelay: "0.415s" }}></div>
			<div
				className="absolute left-[0.4629em] bottom-0 w-[0.084em] h-[0.2777em] rounded-[0.5em] origin-[center_-0.2222em] bg-transparent animate-spinner rotate-180"
				style={{ animationDelay: "0.498s" }}></div>
			<div
				className="absolute left-[0.4629em] bottom-0 w-[0.084em] h-[0.2777em] rounded-[0.5em] origin-[center_-0.2222em] bg-transparent animate-spinner rotate-210"
				style={{ animationDelay: "0.581s" }}></div>
			<div
				className="absolute left-[0.4629em] bottom-0 w-[0.084em] h-[0.2777em] rounded-[0.5em] origin-[center_-0.2222em] bg-transparent animate-spinner rotate-240"
				style={{ animationDelay: "0.664s" }}></div>
			<div
				className="absolute left-[0.4629em] bottom-0 w-[0.084em] h-[0.2777em] rounded-[0.5em] origin-[center_-0.2222em] bg-transparent animate-spinner rotate-270"
				style={{ animationDelay: "0.747s" }}></div>
			<div
				className="absolute left-[0.4629em] bottom-0 w-[0.084em] h-[0.2777em] rounded-[0.5em] origin-[center_-0.2222em] bg-transparent animate-spinner rotate-300"
				style={{ animationDelay: "0.830s" }}></div>
			<div
				className="absolute left-[0.4629em] bottom-0 w-[0.084em] h-[0.2777em] rounded-[0.5em] origin-[center_-0.2222em] bg-transparent animate-spinner rotate-330"
				style={{ animationDelay: "0.913s" }}></div>
		</div>
	);
}
