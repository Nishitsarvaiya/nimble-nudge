import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import bcrypt from "bcryptjs";
import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./db";

interface ICredentials {
	email: string;
	password: string;
}

export const authOptions: NextAuthOptions = {
	adapter: UpstashRedisAdapter(db),
	providers: [
		Credentials({
			credentials: {
				email: {
					type: "email",
					label: "Email",
					placeholder: "John@doe.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const { email, password } = credentials as ICredentials;
				const dbUserID = (await db.get(`user:email:${email}`)) as string;

				if (!dbUserID) {
					return null;
				}

				const dbUser = (await db.get(`user:${dbUserID}`)) as any;

				const doesPasswordMatch = await bcrypt.compare(password, dbUser.password);
				if (!doesPasswordMatch) {
					return null;
				}

				return {
					id: dbUser.id,
					email: dbUser.email,
					name: dbUser.name,
				};
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/signin",
	},
	callbacks: {
		session: ({ session, token }) => {
			console.log("Session Callback", { session, token });
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
				},
			};
		},
		jwt: ({ token, user }) => {
			console.log("JWT Callback", { token, user });
			if (user) {
				const u = user as unknown as any;
				return {
					...token,
					id: u.id,
				};
			}
			return token;
		},
		// redirect() {
		// 	return '/';
		// },
	},
};
