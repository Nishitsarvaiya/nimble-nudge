"use client";

import Image from "next/image";
import { Icons } from "./Icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useRef, useState } from "react";

type Props = {};

export default function Messages({}: Props) {
	const titleRef = useRef<HTMLDivElement | null>(null);
	const searchBarRef = useRef<HTMLDivElement | null>(null);
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const [scrollAreaHeight, setScrollAreaHeight] = useState<number>(0);

	const calculateScrollAreaHeight = () => {
		const titleHeight = titleRef.current?.clientHeight || 0;
		const searchBarHeight = searchBarRef.current?.clientHeight || 0;
		const wrapperHeight = wrapperRef.current?.clientHeight || 0;
		return wrapperHeight - (titleHeight + searchBarHeight);
	};

	useEffect(() => {
		setScrollAreaHeight(calculateScrollAreaHeight());

		window.addEventListener("resize", () => {
			setScrollAreaHeight(calculateScrollAreaHeight());
		});

		return () => {
			window.removeEventListener("resize", () => {});
		};
	}, []);

	return (
		<div className="pt-10 h-full flex flex-col max-h-screen" ref={wrapperRef}>
			<div className="flex items-center justify-between pl-8 pr-5 mb-5" ref={titleRef}>
				<div className="text-2xl font-semibold">
					Messages <span className="text-base font-medium">(26)</span>
				</div>
				<Button variant="ghost" size="icon">
					<Icons.newMessage className="w-6 h-6 fill-primary" />
				</Button>
			</div>
			<div className="flex items-center justify-between gap-3 pl-8 pr-5 mb-5" ref={searchBarRef}>
				<div className="flex-1 relative">
					<Icons.search className="w-4 h-4 fill-muted-foreground absolute top-1/2 -translate-y-1/2 left-5" />
					<Input type="text" placeholder="Search chats" className="pl-12" />
				</div>
				<Button variant="ghost" size="icon">
					<Icons.filters className="w-6 h-6 fill-primary" />
				</Button>
			</div>
			<ScrollArea className={`h-[${scrollAreaHeight}px]`}>
				<ul className="">
					<li className="px-8 pb-1 mb-1 border-b border-b-accent">
						<Button className="h-auto p-4 rounded-3xl" asChild variant="ghost">
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center gap-4">
									<div>
										<div className="w-[60px] h-[60px] rounded-full overflow-hidden relative">
											<Image
												src="/profile-picture.jpg"
												alt=""
												fill
												style={{ objectFit: "cover" }}
											/>
										</div>
									</div>
									<div>
										<div className="text-lg">Nishit Sarvaiya</div>
										<div className="text-sm">How are you?</div>
									</div>
								</div>
								<div>
									<div className="text-sm font-bold text-muted-foreground">16:30</div>
								</div>
							</div>
						</Button>
					</li>
					<li className="px-8 pb-1 mb-1 border-b border-b-accent">
						<Button className="h-auto p-4 rounded-3xl" asChild variant="ghost">
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center gap-4">
									<div>
										<div className="w-[60px] h-[60px] rounded-full overflow-hidden relative">
											<Image
												src="/profile-picture.jpg"
												alt=""
												fill
												style={{ objectFit: "cover" }}
											/>
										</div>
									</div>
									<div>
										<div className="text-lg">Nishit Sarvaiya</div>
										<div className="text-sm">How are you?</div>
									</div>
								</div>
								<div>
									<div className="text-sm font-bold text-muted-foreground">16:30</div>
								</div>
							</div>
						</Button>
					</li>
					<li className="px-8 pb-1 mb-1 border-b border-b-accent">
						<Button className="h-auto p-4 rounded-3xl" asChild variant="ghost">
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center gap-4">
									<div>
										<div className="w-[60px] h-[60px] rounded-full overflow-hidden relative">
											<Image
												src="/profile-picture.jpg"
												alt=""
												fill
												style={{ objectFit: "cover" }}
											/>
										</div>
									</div>
									<div>
										<div className="text-lg">Nishit Sarvaiya</div>
										<div className="text-sm">How are you?</div>
									</div>
								</div>
								<div>
									<div className="text-sm font-bold text-muted-foreground">16:30</div>
								</div>
							</div>
						</Button>
					</li>
					<li className="px-8 pb-1 mb-1 border-b border-b-accent">
						<Button className="h-auto p-4 rounded-3xl" asChild variant="ghost">
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center gap-4">
									<div>
										<div className="w-[60px] h-[60px] rounded-full overflow-hidden relative">
											<Image
												src="/profile-picture.jpg"
												alt=""
												fill
												style={{ objectFit: "cover" }}
											/>
										</div>
									</div>
									<div>
										<div className="text-lg">Nishit Sarvaiya</div>
										<div className="text-sm">How are you?</div>
									</div>
								</div>
								<div>
									<div className="text-sm font-bold text-muted-foreground">16:30</div>
								</div>
							</div>
						</Button>
					</li>
					<li className="px-8 pb-1 mb-1 border-b border-b-accent">
						<Button className="h-auto p-4 rounded-3xl" asChild variant="ghost">
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center gap-4">
									<div>
										<div className="w-[60px] h-[60px] rounded-full overflow-hidden relative">
											<Image
												src="/profile-picture.jpg"
												alt=""
												fill
												style={{ objectFit: "cover" }}
											/>
										</div>
									</div>
									<div>
										<div className="text-lg">Nishit Sarvaiya</div>
										<div className="text-sm">How are you?</div>
									</div>
								</div>
								<div>
									<div className="text-sm font-bold text-muted-foreground">16:30</div>
								</div>
							</div>
						</Button>
					</li>
					<li className="px-8 pb-1 mb-1 border-b border-b-accent">
						<Button className="h-auto p-4 rounded-3xl" asChild variant="ghost">
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center gap-4">
									<div>
										<div className="w-[60px] h-[60px] rounded-full overflow-hidden relative">
											<Image
												src="/profile-picture.jpg"
												alt=""
												fill
												style={{ objectFit: "cover" }}
											/>
										</div>
									</div>
									<div>
										<div className="text-lg">Nishit Sarvaiya</div>
										<div className="text-sm">How are you?</div>
									</div>
								</div>
								<div>
									<div className="text-sm font-bold text-muted-foreground">16:30</div>
								</div>
							</div>
						</Button>
					</li>
					<li className="px-8 pb-1 mb-1 border-b border-b-accent">
						<Button className="h-auto p-4 rounded-3xl" asChild variant="ghost">
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center gap-4">
									<div>
										<div className="w-[60px] h-[60px] rounded-full overflow-hidden relative">
											<Image
												src="/profile-picture.jpg"
												alt=""
												fill
												style={{ objectFit: "cover" }}
											/>
										</div>
									</div>
									<div>
										<div className="text-lg">Nishit Sarvaiya</div>
										<div className="text-sm">How are you?</div>
									</div>
								</div>
								<div>
									<div className="text-sm font-bold text-muted-foreground">16:30</div>
								</div>
							</div>
						</Button>
					</li>
					<li className="px-8 pb-1 mb-1 border-b border-b-accent">
						<Button className="h-auto p-4 rounded-3xl" asChild variant="ghost">
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center gap-4">
									<div>
										<div className="w-[60px] h-[60px] rounded-full overflow-hidden relative">
											<Image
												src="/profile-picture.jpg"
												alt=""
												fill
												style={{ objectFit: "cover" }}
											/>
										</div>
									</div>
									<div>
										<div className="text-lg">Nishit Sarvaiya</div>
										<div className="text-sm">How are you?</div>
									</div>
								</div>
								<div>
									<div className="text-sm font-bold text-muted-foreground">16:30</div>
								</div>
							</div>
						</Button>
					</li>
					<li className="px-8 pb-1 mb-1 border-b border-b-accent">
						<Button className="h-auto p-4 rounded-3xl" asChild variant="ghost">
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center gap-4">
									<div>
										<div className="w-[60px] h-[60px] rounded-full overflow-hidden relative">
											<Image
												src="/profile-picture.jpg"
												alt=""
												fill
												style={{ objectFit: "cover" }}
											/>
										</div>
									</div>
									<div>
										<div className="text-lg">Nishit Sarvaiya</div>
										<div className="text-sm">How are you?</div>
									</div>
								</div>
								<div>
									<div className="text-sm font-bold text-muted-foreground">16:30</div>
								</div>
							</div>
						</Button>
					</li>
					<li className="px-8 pb-1 mb-1 border-b border-b-accent">
						<Button className="h-auto p-4 rounded-3xl" asChild variant="ghost">
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center gap-4">
									<div>
										<div className="w-[60px] h-[60px] rounded-full overflow-hidden relative">
											<Image
												src="/profile-picture.jpg"
												alt=""
												fill
												style={{ objectFit: "cover" }}
											/>
										</div>
									</div>
									<div>
										<div className="text-lg">Nishit Sarvaiya</div>
										<div className="text-sm">How are you?</div>
									</div>
								</div>
								<div>
									<div className="text-sm font-bold text-muted-foreground">16:30</div>
								</div>
							</div>
						</Button>
					</li>
				</ul>
			</ScrollArea>
		</div>
	);
}
