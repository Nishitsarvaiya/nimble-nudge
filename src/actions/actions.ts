"use server";

import { db } from "@/lib/db";

export const clearChatFromDb = async (chatId: string) => {
	await db.del(`chat:${chatId}:messages`);
};
