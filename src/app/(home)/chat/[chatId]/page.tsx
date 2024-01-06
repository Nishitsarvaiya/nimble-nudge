import ChatView from '@/components/chat/ChatView';
import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { messageArrayValidator } from '@/lib/validations';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FC } from 'react';

type Props = {
	params: {
		chatId: string;
	};
};

async function getChatMessages(chatId: string) {
	try {
		const results: string[] = await fetchRedis('zrange', `chat:${chatId}:messages`, 0, -1);

		const dbMessages = results.map((message) => JSON.parse(message) as Message);

		const reversedDbMessages = dbMessages.reverse();

		const messages = messageArrayValidator.parse(reversedDbMessages);

		return messages;
	} catch (error) {
		notFound();
	}
}

export default async function ChatPage({ params }: Props) {
	const { chatId } = params;
	const session = await getServerSession(authOptions);
	if (!session) notFound();

	const { user } = session;

	const [userId1, userId2] = chatId.split('--');

	if (user.id !== userId1 && user.id !== userId2) {
		notFound();
	}

	const chatPartnerId = user.id === userId1 ? userId2 : userId1;

	const chatPartnerRaw = (await fetchRedis('get', `user:${chatPartnerId}`)) as string;
	const chatPartner = JSON.parse(chatPartnerRaw) as User;
	const initialMessages = await getChatMessages(chatId);

	return (
		<div className='h-screen bg-gray-500 relative'>
			<div className='h-[100px] w-full bg-background/70 px-8 absolute top-0 left-0 z-20 backdrop-blur-sm'>
				<div className='h-full flex items-center justify-between'>
					<div className='flex items-center gap-4'>
						<div>
							<div className='w-[60px] h-[60px] rounded-full overflow-hidden relative'>
								<Image src='/profile-picture.jpg' alt='' fill style={{ objectFit: 'cover' }} />
							</div>
						</div>
						<div>
							<div className='text-2xl font-semibold'>{chatPartner.name}</div>
						</div>
					</div>
					<div>
						<Sheet>
							<SheetTrigger asChild>
								<Button variant='ghost' size='icon'>
									<Icons.sidebar className='w-6 h-6 fill-primary' />
								</Button>
							</SheetTrigger>
							<SheetContent className='px-8'>
								<div className='h-full pt-[60px]'>
									<div className='px-14'>
										<div className='w-full aspect-square rounded-full overflow-hidden relative'>
											<Image
												src='/profile-picture.jpg'
												alt=''
												fill
												style={{ objectFit: 'cover' }}
											/>
										</div>
									</div>
									<div className='text-center mt-5 mb-10'>
										<div className='text-xl font-semibold'>{chatPartner.name}</div>
										<div className='text-base font-medium text-muted-foreground'>
											{chatPartner.email}
										</div>
									</div>
									<div className='border-y py-5 space-y-10 mb-2'>
										<div className='group'>
											<div className='text-xs font-semibold text-muted-foreground uppercase mb-2'>
												Status
											</div>
											<div className='text-lg font-medium'>Living my life one day at a time!</div>
										</div>
										<div className='group'>
											<div className='text-xs font-semibold text-muted-foreground uppercase mb-2'>
												Phone
											</div>
											<div className='text-lg font-medium'>+91 88496 53474</div>
										</div>
										<div className='group'>
											<div className='text-xs font-semibold text-muted-foreground uppercase mb-2'>
												Date of Birth
											</div>
											<div className='text-lg font-medium'>November 13, 1996</div>
										</div>
									</div>
									<div className='flex justify-end'>
										<Button variant='secondary' size='sm'>
											Unfriend
										</Button>
									</div>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
			<ChatView
				chatId={chatId}
				chatPartner={chatPartner}
				// sessionImg={session.user.image}
				sessionId={session.user.id}
				initialMessages={initialMessages}
			/>
		</div>
	);
}
