'use client';
import { pusherClient } from '@/lib/pusher';
import { chatHrefConstructor, cn, formatTimestamp, toPusherKey } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ChatCard from './ChatCard';
import UnseenChatToast from './UnseenChatToast';
import { Button } from './ui/button';

type Props = {
	friends: ExtendedUser[];
	sessionId: string;
};

export default function ChatList({ friends, sessionId }: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);
	const [activeChats, setActiveChats] = useState<ExtendedUser[]>(friends);

	useEffect(() => {
		pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`));
		pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

		const newFriendHandler = (newFriend: ExtendedUser) => {
			setActiveChats((prev) => [...prev, newFriend]);
		};

		const chatHandler = (message: ExtendedMessage) => {
			const shouldNotify = pathname !== `/chat/${chatHrefConstructor(sessionId, message.senderId)}`;

			if (!shouldNotify) return;

			// should be notified
			toast(
				<UnseenChatToast
					sessionId={sessionId}
					senderId={message.senderId}
					senderImg={message.senderImg}
					senderMessage={message.text}
					senderName={message.senderName}
				/>,
				{ position: 'top-center', duration: 100000 }
			);
			// toast.custom(
			// 	(t) => (
			// 		<UnseenChatToast
			// 			t={t}
			// 			sessionId={sessionId}
			// 			senderId={message.senderId}
			// 			senderImg={message.senderImg}
			// 			senderMessage={message.text}
			// 			senderName={message.senderName}
			// 		/>
			// 	),
			// 	{ position: "top-center" }
			// );

			setUnseenMessages((prev) => [...prev, message]);
		};

		pusherClient.bind('new_message', chatHandler);
		pusherClient.bind('new_friend', newFriendHandler);

		return () => {
			pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`));
			pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));

			pusherClient.unbind('new_message', chatHandler);
			pusherClient.unbind('new_friend', newFriendHandler);
		};
	}, [pathname, sessionId, router]);

	useEffect(() => {
		if (pathname?.includes('chat')) {
			setUnseenMessages((prev) => {
				return prev.filter((msg) => !pathname.includes(msg.senderId));
			});
		}
	}, [pathname]);

	const isChatActive = (senderId: string) => {
		return pathname.includes(senderId);
	};

	return (
		<ul className='space-y-2 py-2'>
			{activeChats.sort().map((friend) => {
				const unseenMessagesCount = unseenMessages.filter((unseenMsg) => {
					return unseenMsg.senderId === friend.id;
				}).length;

				return (
					<li className='px-8 relative' key={friend.id}>
						{unseenMessagesCount > 0 && (
							<div className='w-2 h-2 rounded-full bg-blue-600 absolute left-8 top-1/2 -translate-y-1/2'></div>
						)}
						<ChatCard>
							<Button
								className={cn('h-auto p-4 rounded-3xl', {
									'hover:bg-initial': isChatActive(friend.id),
								})}
								asChild
								variant={isChatActive(friend.id) ? 'default' : 'ghost'}
							>
								<Link
									href={`/chat/${chatHrefConstructor(sessionId, friend.id)}`}
									className='flex items-center justify-between w-full'
								>
									<div className='flex items-center gap-4'>
										<div>
											<div className='w-[60px] h-[60px] rounded-full overflow-hidden relative'>
												<Image
													src='/profile-picture.jpg'
													alt=''
													fill
													style={{ objectFit: 'cover' }}
												/>
											</div>
										</div>
										<div>
											<div className='text-lg'>{friend.name}</div>
											{friend.lastMessage && (
												<div
													className={cn('text-sm', {
														'text-muted': isChatActive(friend.id),
														'text-muted-foreground': !isChatActive(friend.id),
													})}
												>
													{friend.lastMessage.text}
												</div>
											)}
										</div>
									</div>
									<div>
										<div className='text-sm font-medium text-muted-foreground'>
											{friend.lastMessage && formatTimestamp(friend.lastMessage.timestamp)}
										</div>
									</div>
								</Link>
							</Button>
						</ChatCard>
					</li>
				);
			})}
		</ul>
	);
}
