import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { NextAuthOptions } from "next-auth";
import { db } from "./db";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
	adapter: UpstashRedisAdapter(db),
	providers: [Google()],
};
