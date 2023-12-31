'use client';

import Loader from '@/components/Loader';
import { LoaderContextProvider } from '@/contexts/LoaderContext';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

type Props = {
	children: ReactNode;
};

export default function Providers({ children }: Props) {
	return (
		<LoaderContextProvider>
			{children}
			<Loader />
			<Toaster
				closeButton
				theme='system'
				toastOptions={{ classNames: { error: '!bg-red-600 !border-red-600' } }}
			/>
		</LoaderContextProvider>
	);
}
