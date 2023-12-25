import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC } from "react";

interface pageProps {}

const AddFriend: FC<pageProps> = ({}) => {
	return (
		<div className="h-screen bg-gray-500 relative">
			<div className="h-full max-w-lg mx-auto">
				<div className="h-full flex flex-col items-center justify-center gap-5">
					<div className="w-full flex flex-col items-center">
						<Icons.addUser className="w-20 h-20 fill-primary mb-4" />
						<div className="text-4xl font-semibold mb-2">Add a Friend</div>
						<p>Add a new friend through their Google email address</p>
					</div>
					<div className="w-full space-y-4">
						<div className="w-full relative">
							<Icons.mail className="w-5 h-5 fill-muted-foreground absolute top-1/2 -translate-y-1/2 left-5" />
							<Input
								type="text"
								placeholder="John@doe.com"
								className="h-[60px] text-lg pl-14 bg-background"
							/>
						</div>
						<Button className="w-full h-[60px] text-lg">Add</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddFriend;
