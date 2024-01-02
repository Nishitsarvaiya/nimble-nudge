"use client";

import useLoader from "@/hooks/useLoader";
import Spinner from "./Spinner";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export default function Loader() {
	const { isLoading } = useLoader();

	return (
		<div className={cn("fixed inset-0 pointer-events-none", { hidden: !isLoading })}>
			<div className="w-full h-full bg-background/80 backdrop-blur-[2px] grid place-items-center">
				<div className="w-20 h-20 grid place-items-center bg-background rounded-2xl border border-gray-500 shadow-xl pointer-events-none">
					<Spinner color="" />
				</div>
			</div>
		</div>
	);
}
