'use client';

import { pusherClient } from '@/lib/pusher';
import { toPusherKey } from '@/lib/utils';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import FriendRequestsButton from './FriendRequestsButton';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';

type Props = {
	sessionId: string;
};

export default function FriendRequestsWrapper({ sessionId }: Props) {
	// const session = useSession();
	const router = useRouter();
	const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>([]);

	useEffect(() => {
		const fetchRequests = async () => {
			const res = await fetch('/api/friend-requests')
				.then((res) => res.json())
				.then((data) => setFriendRequests(data.incomingFriendRequests))
				.catch((error) => toast.error('Something went wrong!', { position: 'top-center' }));
		};
		fetchRequests();
	}, []);

	useEffect(() => {
		const friendRequestHandler = ({ senderId, senderEmail, senderName }: IncomingFriendRequest) => {
			setFriendRequests((prev) => [...prev, { senderId, senderEmail, senderName }]);
		};

		if (sessionId) {
			pusherClient.subscribe(toPusherKey(`user:${sessionId}:incoming_friend_requests`));

			pusherClient.bind('incoming_friend_requests', friendRequestHandler);
		}

		return () => {
			if (sessionId) {
				pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:incoming_friend_requests`));
				pusherClient.unbind('incoming_friend_requests', friendRequestHandler);
			}
		};
	}, [sessionId]);

	const acceptFriend = async (senderId: string) => {
		await axios.post('/api/friends/accept', { id: senderId });
		setFriendRequests((prev) => prev.filter((request) => request.senderId !== senderId));
		router.refresh();
	};

	const denyFriend = async (senderId: string) => {
		await axios.post('/api/friends/deny', { id: senderId });
		setFriendRequests((prev) => prev.filter((request) => request.senderId !== senderId));
		router.refresh();
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' size='icon'>
					<FriendRequestsButton />
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-2xl'>
				<DialogHeader>
					<DialogTitle className='text-lg leading-none'>Friend Requests</DialogTitle>
				</DialogHeader>
				<ScrollArea className='max-h-[600px]'>
					{friendRequests.length > 0 ? (
						<ul className='divide-y pr-4'>
							{friendRequests.map((req) => (
								<li className='flex items-center justify-between py-3' key={req.senderId}>
									<div className='flex items-center justify-between w-full'>
										<div className='flex items-center gap-4'>
											<div>
												<div className='w-12 h-12 rounded-full overflow-hidden relative'>
													<Image
														src='/profile-picture.jpg'
														alt=''
														fill
														style={{ objectFit: 'cover' }}
													/>
												</div>
											</div>
											<div>
												<div className='text-lg font-semibold leading-tight'>
													{req.senderName}
												</div>
												<div className='text-sm text-muted-foreground'>{req.senderEmail}</div>
											</div>
										</div>
									</div>
									<div className='flex items-center gap-2'>
										<Button
											size='sm'
											className='text-sm'
											onClick={() => acceptFriend(req.senderId)}
										>
											Accept
										</Button>
										<Button
											size='sm'
											className='text-sm'
											variant='outline'
											onClick={() => denyFriend(req.senderId)}
										>
											Decline
										</Button>
									</div>
								</li>
							))}
						</ul>
					) : (
						<p className='font-medium text-muted-foreground'>Nothing to show here</p>
					)}
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
