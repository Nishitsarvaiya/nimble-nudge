'use client';
import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
	const [isLightTheme, setIsLightTheme] = useState<boolean>(false);
	return (
		<aside className='fixed h-full top-0 left-0 w-[100px] border-r border-r-gray'>
			<div className='flex flex-col items-center justify-between h-full'>
				<div className='flex flex-col items-center py-10 gap-10'>
					<Link href='/'>
						<Icons.logoDark className='w-10 h-10 fill-primary' />
					</Link>
					<div className='w-12 h-[1px] bg-gray'></div>
					<div className='flex flex-col items-center gap-1'>
						<Button asChild variant='ghost' size='icon'>
							<Link href='/'>
								<Icons.messages className='w-8 h-8 fill-primary' />
							</Link>
						</Button>
						<Button asChild variant='ghost' size='icon'>
							<Link href='/people'>
								<Icons.users className='w-8 h-8 fill-primary' />
							</Link>
						</Button>
						<Button asChild variant='ghost' size='icon'>
							<Link href='/add-friend'>
								<Icons.addUser className='w-8 h-8 fill-primary' />
							</Link>
						</Button>
						<Button asChild variant='ghost' size='icon'>
							<Link href='/notifications'>
								<Icons.bell className='w-8 h-8 fill-primary' />
							</Link>
						</Button>
					</div>
				</div>
				<div className='flex flex-col items-center py-10 gap-10'>
					<div className='rotate-90'>
						<Switch
							id='theme-switcher'
							className='relative'
							checked={isLightTheme}
							onCheckedChange={(checked) => setIsLightTheme(checked)}
						>
							<div className='h-full w-full flex items-center justify-center absolute'>
								<div className='h-full flex-1 flex items-center justify-center ml-[-2px]'>
									<Icons.sun className='fill-primary h-5 w-5' />
								</div>
								<div className='h-full flex-1 flex items-center justify-center mr-[-2px]'>
									<Icons.moon className='fill-primary h-5 w-5 -rotate-90' />
								</div>
							</div>
						</Switch>
					</div>
				</div>
			</div>
		</aside>
	);
}
