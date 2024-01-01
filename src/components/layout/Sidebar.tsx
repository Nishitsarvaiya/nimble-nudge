"use client";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useState } from "react";
import ProfileButton from "../ProfileButton";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import { X } from "lucide-react";

export default function Sidebar() {
	const [isLightTheme, setIsLightTheme] = useState<boolean>(false);

	return (
		<aside className="h-full border-r">
			<div className="flex flex-col items-center justify-between h-full">
				<div className="flex flex-col items-center py-6 gap-4">
					<ProfileButton />
					{/* <Button asChild variant="ghost" size="icon">
						<Link href="/">
							<Icons.logoDark className="w-10 h-10 fill-primary" />
						</Link>
					</Button> */}

					<div className="w-12 h-[1px] bg-gray"></div>
					<div className="flex flex-col items-center gap-1">
						<Button asChild variant="ghost" size="icon">
							<Link href="/">
								<Icons.messages className="w-8 h-8 fill-primary" />
							</Link>
						</Button>
						<Button asChild variant="ghost" size="icon">
							<Link href="/people">
								<Icons.users className="w-8 h-8 fill-primary" />
							</Link>
						</Button>
						<Button asChild variant="ghost" size="icon">
							<Link href="/add-friend">
								<Icons.addUser className="w-8 h-8 fill-primary" />
							</Link>
						</Button>
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="ghost" size="icon">
									<div>
										<Icons.bell className="w-8 h-8 fill-primary p-0" />
									</div>
								</Button>
							</DialogTrigger>
							<DialogContent className="max-w-2xl">
								<DialogHeader>
									<DialogTitle className="text-lg leading-none">Notifications</DialogTitle>
								</DialogHeader>
								<ScrollArea className="max-h-[600px]">
									<ul className="divide-y pr-4">
										<li className="flex items-center justify-between py-3">
											<div className="flex items-center justify-between w-full">
												<div className="flex items-center gap-4">
													<div>
														<div className="w-12 h-12 rounded-full overflow-hidden relative">
															<Image
																src="/profile-picture.jpg"
																alt=""
																fill
																style={{ objectFit: "cover" }}
															/>
														</div>
													</div>
													<div>
														<div className="text-lg font-semibold leading-tight">
															Nishit Sarvaiya
														</div>
														<div className="text-sm text-muted-foreground">
															nishitsarvaiiya@gmail.com
														</div>
													</div>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<Button size="sm" className="text-sm">
													Accept
												</Button>
												<Button size="sm" className="text-sm" variant="outline">
													Decline
												</Button>
											</div>
										</li>
										<li className="flex items-center justify-between py-3">
											<div className="flex items-center justify-between w-full">
												<div className="flex items-center gap-4">
													<div>
														<div className="w-12 h-12 rounded-full overflow-hidden relative">
															<Image
																src="/profile-picture.jpg"
																alt=""
																fill
																style={{ objectFit: "cover" }}
															/>
														</div>
													</div>
													<div>
														<div className="text-lg font-semibold leading-tight">
															Nishit Sarvaiya
														</div>
														<div className="text-sm text-muted-foreground">
															nishitsarvaiiya@gmail.com
														</div>
													</div>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<Button size="sm" className="text-sm">
													Accept
												</Button>
												<Button size="sm" className="text-sm" variant="outline">
													Decline
												</Button>
											</div>
										</li>
										<li className="flex items-center justify-between py-3">
											<div className="flex items-center justify-between w-full">
												<div className="flex items-center gap-4">
													<div>
														<div className="w-12 h-12 rounded-full overflow-hidden relative">
															<Image
																src="/profile-picture.jpg"
																alt=""
																fill
																style={{ objectFit: "cover" }}
															/>
														</div>
													</div>
													<div>
														<div className="text-lg font-semibold leading-tight">
															Nishit Sarvaiya
														</div>
														<div className="text-sm text-muted-foreground">
															nishitsarvaiiya@gmail.com
														</div>
													</div>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<Button size="sm" className="text-sm">
													Accept
												</Button>
												<Button size="sm" className="text-sm" variant="outline">
													Decline
												</Button>
											</div>
										</li>
										<li className="flex items-center justify-between py-3">
											<div className="flex items-center justify-between w-full">
												<div className="flex items-center gap-4">
													<div>
														<div className="w-12 h-12 rounded-full overflow-hidden relative">
															<Image
																src="/profile-picture.jpg"
																alt=""
																fill
																style={{ objectFit: "cover" }}
															/>
														</div>
													</div>
													<div>
														<div className="text-lg font-semibold leading-tight">
															Nishit Sarvaiya
														</div>
														<div className="text-sm text-muted-foreground">
															nishitsarvaiiya@gmail.com
														</div>
													</div>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<Button size="sm" className="text-sm">
													Accept
												</Button>
												<Button size="sm" className="text-sm" variant="outline">
													Decline
												</Button>
											</div>
										</li>
										<li className="flex items-center justify-between py-3">
											<div className="flex items-center justify-between w-full">
												<div className="flex items-center gap-4">
													<div>
														<div className="w-12 h-12 rounded-full overflow-hidden relative">
															<Image
																src="/profile-picture.jpg"
																alt=""
																fill
																style={{ objectFit: "cover" }}
															/>
														</div>
													</div>
													<div>
														<div className="text-lg font-semibold leading-tight">
															Nishit Sarvaiya
														</div>
														<div className="text-sm text-muted-foreground">
															nishitsarvaiiya@gmail.com
														</div>
													</div>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<Button size="sm" className="text-sm">
													Accept
												</Button>
												<Button size="sm" className="text-sm" variant="outline">
													Decline
												</Button>
											</div>
										</li>
										<li className="flex items-center justify-between py-3">
											<div className="flex items-center justify-between w-full">
												<div className="flex items-center gap-4">
													<div>
														<div className="w-12 h-12 rounded-full overflow-hidden relative">
															<Image
																src="/profile-picture.jpg"
																alt=""
																fill
																style={{ objectFit: "cover" }}
															/>
														</div>
													</div>
													<div>
														<div className="text-lg font-semibold leading-tight">
															Nishit Sarvaiya
														</div>
														<div className="text-sm text-muted-foreground">
															nishitsarvaiiya@gmail.com
														</div>
													</div>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<Button size="sm" className="text-sm">
													Accept
												</Button>
												<Button size="sm" className="text-sm" variant="outline">
													Decline
												</Button>
											</div>
										</li>
										<li className="flex items-center justify-between py-3">
											<div className="flex items-center justify-between w-full">
												<div className="flex items-center gap-4">
													<div>
														<div className="w-12 h-12 rounded-full overflow-hidden relative">
															<Image
																src="/profile-picture.jpg"
																alt=""
																fill
																style={{ objectFit: "cover" }}
															/>
														</div>
													</div>
													<div>
														<div className="text-lg font-semibold leading-tight">
															Nishit Sarvaiya
														</div>
														<div className="text-sm text-muted-foreground">
															nishitsarvaiiya@gmail.com
														</div>
													</div>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<Button size="sm" className="text-sm">
													Accept
												</Button>
												<Button size="sm" className="text-sm" variant="outline">
													Decline
												</Button>
											</div>
										</li>
										<li className="flex items-center justify-between py-3">
											<div className="flex items-center justify-between w-full">
												<div className="flex items-center gap-4">
													<div>
														<div className="w-12 h-12 rounded-full overflow-hidden relative">
															<Image
																src="/profile-picture.jpg"
																alt=""
																fill
																style={{ objectFit: "cover" }}
															/>
														</div>
													</div>
													<div>
														<div className="text-lg font-semibold leading-tight">
															Nishit Sarvaiya
														</div>
														<div className="text-sm text-muted-foreground">
															nishitsarvaiiya@gmail.com
														</div>
													</div>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<Button size="sm" className="text-sm">
													Accept
												</Button>
												<Button size="sm" className="text-sm" variant="outline">
													Decline
												</Button>
											</div>
										</li>
										<li className="flex items-center justify-between py-3">
											<div className="flex items-center justify-between w-full">
												<div className="flex items-center gap-4">
													<div>
														<div className="w-12 h-12 rounded-full overflow-hidden relative">
															<Image
																src="/profile-picture.jpg"
																alt=""
																fill
																style={{ objectFit: "cover" }}
															/>
														</div>
													</div>
													<div>
														<div className="text-lg font-semibold leading-tight">
															Nishit Sarvaiya
														</div>
														<div className="text-sm text-muted-foreground">
															nishitsarvaiiya@gmail.com
														</div>
													</div>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<Button size="sm" className="text-sm">
													Accept
												</Button>
												<Button size="sm" className="text-sm" variant="outline">
													Decline
												</Button>
											</div>
										</li>
										<li className="flex items-center justify-between py-3">
											<div className="flex items-center justify-between w-full">
												<div className="flex items-center gap-4">
													<div>
														<div className="w-12 h-12 rounded-full overflow-hidden relative">
															<Image
																src="/profile-picture.jpg"
																alt=""
																fill
																style={{ objectFit: "cover" }}
															/>
														</div>
													</div>
													<div>
														<div className="text-lg font-semibold leading-tight">
															Nishit Sarvaiya
														</div>
														<div className="text-sm text-muted-foreground">
															nishitsarvaiiya@gmail.com
														</div>
													</div>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<Button size="sm" className="text-sm">
													Accept
												</Button>
												<Button size="sm" className="text-sm" variant="outline">
													Decline
												</Button>
											</div>
										</li>
									</ul>
								</ScrollArea>
							</DialogContent>
						</Dialog>
					</div>
				</div>
				<div className="flex flex-col items-center py-10 gap-14">
					<Switch
						id="theme-switcher"
						className="relative rotate-90 origin-center mb-4"
						checked={isLightTheme}
						onCheckedChange={(checked) => setIsLightTheme(checked)}>
						<div className="h-full w-full flex items-center justify-center absolute">
							<div className="h-full flex-1 flex items-center justify-center ml-[-2px]">
								<Icons.sun className="fill-primary h-5 w-5" />
							</div>
							<div className="h-full flex-1 flex items-center justify-center mr-[-2px]">
								<Icons.moon className="fill-primary h-5 w-5 -rotate-90" />
							</div>
						</div>
					</Switch>
				</div>
			</div>
		</aside>
	);
}
