import ChatView from "@/components/ChatView";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { FC } from "react";

interface pageProps {}

const Home: FC<pageProps> = ({}) => {
	return (
		<div className="h-screen bg-gray-500 relative">
			<div className="h-[100px] w-full bg-background px-8 absolute top-0 left-0 z-20">
				<div className="h-full flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div>
							<div className="w-[60px] h-[60px] rounded-full overflow-hidden relative">
								<Image src="/profile-picture.jpg" alt="" fill style={{ objectFit: "cover" }} />
							</div>
						</div>
						<div>
							<div className="text-2xl font-semibold">Nishit Sarvaiya</div>
						</div>
					</div>
					<div>
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon">
									<Icons.sidebar className="w-6 h-6 fill-primary" />
								</Button>
							</SheetTrigger>
							<SheetContent className="px-8">
								<div className="h-full pt-[60px]">
									<div className="px-14">
										<div className="w-full aspect-square rounded-full overflow-hidden relative">
											<Image
												src="/profile-picture.jpg"
												alt=""
												fill
												style={{ objectFit: "cover" }}
											/>
										</div>
									</div>
									<div className="text-center mt-5 mb-10">
										<div className="text-xl font-semibold">Nishit Sarvaiya</div>
										<div className="text-base font-medium text-muted-foreground">
											nishitsarvaiiya@gmail.com
										</div>
									</div>
									<div className="border-y py-5 space-y-10 mb-2">
										<div className="group">
											<div className="text-xs font-semibold text-muted-foreground uppercase mb-2">
												Status
											</div>
											<div className="text-lg font-medium">Living my life one day at a time!</div>
										</div>
										<div className="group">
											<div className="text-xs font-semibold text-muted-foreground uppercase mb-2">
												Phone
											</div>
											<div className="text-lg font-medium">+91 88496 53474</div>
										</div>
										<div className="group">
											<div className="text-xs font-semibold text-muted-foreground uppercase mb-2">
												Date of Birth
											</div>
											<div className="text-lg font-medium">November 13, 1996</div>
										</div>
									</div>
									<div className="flex justify-end">
										<Button variant="secondary" size="sm">
											Unfriend
										</Button>
									</div>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
			<ChatView />
		</div>
	);
};

export default Home;
