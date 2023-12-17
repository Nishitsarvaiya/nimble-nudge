import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { primaryFont } from './fonts';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
	title: 'NimbleNudge | Messenger',
	description: 'A Messenger web application built using Next.js, Redis & Next-Auth',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={cn('min-h-screen antialiased', primaryFont.className, primaryFont.variable)}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
