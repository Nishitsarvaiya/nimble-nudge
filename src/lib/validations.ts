import { z } from "zod";

export const addFriendValidator = z.object({
	email: z.string().email(),
});

export const messageValidator = z.object({
	id: z.string(),
	senderId: z.string(),
	text: z.string(),
	receiverId: z.string(),
	timestamp: z.number(),
});

export const messageArrayValidator = z.array(messageValidator);

export const signInValidator = z.object({
	email: z.string().min(1, { message: "Please enter your email" }).email({
		message: "Must be a valid email",
	}),
	password: z.string().min(6, { message: "Password must be atleast 6 characters" }),
});

export const signUpValidator = z.object({
	name: z.string().min(1, { message: "Please enter your name" }),
	email: z.string().min(1, { message: "Please enter your email" }).email({
		message: "Must be a valid email",
	}),
	password: z.string().min(6, { message: "Password must be atleast 6 characters" }),
});

export type TMessage = z.infer<typeof messageValidator>;
export type TSignIn = z.infer<typeof signInValidator>;
export type TSignUp = z.infer<typeof signUpValidator>;
