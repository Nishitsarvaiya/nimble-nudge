import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter';
import { NextAuthOptions, User } from 'next-auth';
import { db } from './db';
import Google from 'next-auth/providers/google';

function getGoogleCredentials(): { clientId: string; clientSecret: string } {
	const clientId = process.env.GOOGLE_CLIENT_ID;
	const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

	if (!clientId || clientId.length === 0) {
		throw new Error('Missing GOOGLE_CLIENT_ID in getGoogleCredentials');
	}
	if (!clientSecret || clientSecret.length === 0) {
		throw new Error('Missing GOOGLE_CLIENT_SECRET in getGoogleCredentials');
	}

	return { clientId, clientSecret };
}

export const authOptions: NextAuthOptions = {
	adapter: UpstashRedisAdapter(db),
	providers: [
		Google({
			clientId: getGoogleCredentials().clientId,
			clientSecret: getGoogleCredentials().clientSecret,
		}),
	],
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/signin',
	},
	callbacks: {
		async jwt({ token, user }) {
			const dbUser = (await db.get(`user:${token.id}`)) as User | null;

			if (!dbUser) {
				token.id = user!.id;
				return token;
			}

			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				picture: dbUser.image,
			};
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.image = token.picture;
			}

			return session;
		},
		redirect() {
			return '/dashboard';
		},
	},
};
