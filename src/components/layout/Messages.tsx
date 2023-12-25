import Image from "next/image";
import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import ChatCard from "../ChatCard";

type Props = {};

export default function Messages({}: Props) {
	return (
		<div className="h-full max-h-screen">
			<div className="h-[100px] flex items-center justify-between pl-8 pr-5">
				<div className="text-2xl font-semibold">
					Messages <span className="text-base font-medium">(26)</span>
				</div>
				<Button variant="ghost" size="icon">
					<Icons.newMessage className="w-6 h-6 fill-primary" />
				</Button>
			</div>
			<div className="flex items-center justify-between gap-3 pl-8 pr-5 pb-5">
				<div className="flex-1 relative">
					<Icons.search className="w-4 h-4 fill-muted-foreground absolute top-1/2 -translate-y-1/2 left-5" />
					<Input type="text" placeholder="Search chats" className="pl-12" />
				</div>
				<Button variant="ghost" size="icon">
					<Icons.filters className="w-6 h-6 fill-primary" />
				</Button>
			</div>
			<ScrollArea style={{ height: "calc(100% - 176px)" }}>
				<ul>
					<li className="px-8">
						<ChatCard>
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
											<div className="text-sm text-muted-foreground">How are you?</div>
										</div>
									</div>
									<div>
										<div className="text-sm font-medium text-muted-foreground">16:30</div>
									</div>
								</div>
							</Button>
						</ChatCard>
					</li>
					<li className="px-8">
						<ChatCard>
							<Button className="h-auto p-4 rounded-3xl" asChild variant="default">
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
											<div className="text-sm text-accent">How are you?</div>
										</div>
									</div>
									<div>
										<div className="text-sm font-medium text-accent">16:30</div>
									</div>
								</div>
							</Button>
						</ChatCard>
					</li>
					<li className="px-8">
						<ChatCard>
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
											<div className="text-sm text-muted-foreground">How are you?</div>
										</div>
									</div>
									<div>
										<div className="text-sm font-medium text-muted-foreground">16:30</div>
									</div>
								</div>
							</Button>
						</ChatCard>
					</li>
					<li className="px-8">
						<ChatCard>
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
											<div className="text-sm text-muted-foreground">How are you?</div>
										</div>
									</div>
									<div>
										<div className="text-sm font-medium text-muted-foreground">16:30</div>
									</div>
								</div>
							</Button>
						</ChatCard>
					</li>
					<li className="px-8">
						<ChatCard>
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
											<div className="text-sm text-muted-foreground">How are you?</div>
										</div>
									</div>
									<div>
										<div className="text-sm font-medium text-muted-foreground">16:30</div>
									</div>
								</div>
							</Button>
						</ChatCard>
					</li>
					<li className="px-8">
						<ChatCard>
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
											<div className="text-sm text-muted-foreground">How are you?</div>
										</div>
									</div>
									<div>
										<div className="text-sm font-medium text-muted-foreground">16:30</div>
									</div>
								</div>
							</Button>
						</ChatCard>
					</li>
					<li className="px-8">
						<ChatCard>
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
											<div className="text-sm text-muted-foreground">How are you?</div>
										</div>
									</div>
									<div>
										<div className="text-sm font-medium text-muted-foreground">16:30</div>
									</div>
								</div>
							</Button>
						</ChatCard>
					</li>
					<li className="px-8">
						<ChatCard>
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
											<div className="text-sm text-muted-foreground">How are you?</div>
										</div>
									</div>
									<div>
										<div className="text-sm font-medium text-muted-foreground">16:30</div>
									</div>
								</div>
							</Button>
						</ChatCard>
					</li>
					<li className="px-8">
						<ChatCard>
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
											<div className="text-sm text-muted-foreground">How are you?</div>
										</div>
									</div>
									<div>
										<div className="text-sm font-medium text-muted-foreground">16:30</div>
									</div>
								</div>
							</Button>
						</ChatCard>
					</li>
					<li className="px-8">
						<ChatCard>
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
											<div className="text-sm text-muted-foreground">How are you?</div>
										</div>
									</div>
									<div>
										<div className="text-sm font-medium text-muted-foreground">16:30</div>
									</div>
								</div>
							</Button>
						</ChatCard>
					</li>
					<li className="px-8">
						<ChatCard>
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
											<div className="text-sm text-muted-foreground">How are you?</div>
										</div>
									</div>
									<div>
										<div className="text-sm font-medium text-muted-foreground">16:30</div>
									</div>
								</div>
							</Button>
						</ChatCard>
					</li>
				</ul>
			</ScrollArea>
		</div>
	);
}
