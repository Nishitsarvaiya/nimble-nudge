import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { db } from '@/lib/db';

export async function POST(req: Request) {
	try {
		const { name, email, password } = await req.json();
		const dbUserID = (await db.get(`user:email:${email}`)) as string;
		if (dbUserID) {
			throw new Error('Error: USER ALREADY EXISTS');
		}
		const encryptedPassword = await hash(password, 10);
		const uid = nanoid();
		await db.set(`user:${uid}`, { name: name, email: email, id: uid, password: encryptedPassword });
		await db.set(`user:email:${email}`, uid);

		return NextResponse.json({
			user: {
				email: email,
			},
		});
	} catch (err: any) {
		return new NextResponse(
			JSON.stringify({
				error: err.message,
			}),
			{
				status: 500,
			}
		);
	}
}
