import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const handler = NextAuth({
	providers: [Google({})],
});

export { handler as GET, handler as POST };
