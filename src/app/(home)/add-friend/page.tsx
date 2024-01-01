"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addFriendValidator } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import useLoader from "@/hooks/useLoader";

type FormData = z.infer<typeof addFriendValidator>;

const AddFriend: FC = () => {
	const { showLoader, hideLoader } = useLoader();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(addFriendValidator),
	});

	const addFriend = async (email: string) => {
		showLoader();
		try {
			const validatedEmail = addFriendValidator.parse({ email });

			await axios.post("/api/friends/add", {
				email: validatedEmail,
			});

			toast.success("Friend added successfully!", { position: "top-center" });
		} catch (error) {
			if (error instanceof z.ZodError) {
				toast.error(error.message, { position: "top-center" });
				return;
			}

			if (error instanceof AxiosError) {
				toast.error(error.response?.data, { position: "top-center" });
				return;
			}

			setError("email", { message: "Something went wrong." });
		} finally {
			hideLoader();
		}
	};

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		addFriend(data.email);
	};

	return (
		<div className="h-screen bg-gray-500 relative">
			<div className="h-full max-w-lg mx-auto">
				<form
					className="h-full flex flex-col items-center justify-center gap-5"
					onSubmit={handleSubmit(onSubmit)}>
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
								{...register("email")}
								placeholder="John@doe.com"
								className="h-[60px] text-lg pl-14 bg-background"
							/>
						</div>
						{errors.email && <p className="text-sm text-red-400 mt-2"> {errors.email?.message}</p>}
						<Button className="w-full h-[60px] text-lg" type="submit">
							Add
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddFriend;
