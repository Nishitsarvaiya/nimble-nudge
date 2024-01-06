'use client';

import Loader from '@/components/Loader';
import { LoaderContextProvider } from '@/contexts/LoaderContext';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { ThemeProvider } from './ThemeProvider';

type Props = {
	children: ReactNode;
};

export default function Providers({ children }: Props) {
	return (
		<SessionProvider>
			<LoaderContextProvider>
				{children}
				<Loader />
				<Toaster closeButton theme='system' richColors />
			</LoaderContextProvider>
		</SessionProvider>
	);
}
