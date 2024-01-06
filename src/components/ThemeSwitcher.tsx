'use client';

import { useTheme } from 'next-themes';
import { Icons } from './Icons';
import { Switch } from './ui/switch';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher({}) {
	const { theme, setTheme } = useTheme();
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

	useEffect(() => {
		setIsDarkTheme(theme === 'dark');
	}, [theme]);

	return (
		<Switch
			id='theme-switcher'
			className='relative rotate-90 origin-center mb-4'
			checked={isDarkTheme}
			onCheckedChange={() => setTheme(isDarkTheme ? 'light' : 'dark')}
		>
			<div className='h-full w-full flex items-center justify-center absolute'>
				<div className='h-full flex-1 flex items-center justify-center ml-[-2px]'>
					<Icons.sun
						className={cn('h-5 w-5 fill-primary', {
							'fill-black': isDarkTheme,
						})}
					/>
				</div>
				<div className='h-full flex-1 flex items-center justify-center mr-[-2px]'>
					<Icons.moon
						className={cn('h-5 w-5 -rotate-90 fill-primary', {
							'fill-white': isDarkTheme,
						})}
					/>
				</div>
			</div>
		</Switch>
	);
}
