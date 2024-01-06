import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { primaryFont } from './fonts';
import './globals.css';
import Providers from './providers';
import { ThemeProvider } from './ThemeProvider';

export const metadata: Metadata = {
	title: 'NimbleNudge | Messenger',
	description: 'A Messenger web application built using Next.js, Redis & Next-Auth',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={cn('min-h-screen antialiased', primaryFont.className, primaryFont.variable)}>
				<ThemeProvider attribute='class' defaultTheme='dark'>
					<Providers>{children}</Providers>
				</ThemeProvider>
			</body>
		</html>
	);
}
