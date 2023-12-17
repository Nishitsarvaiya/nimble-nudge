'use client';

import { LoaderContext } from '@/contexts/LoaderContext';
import { useContext } from 'react';

export default function useLoader() {
	const context = useContext(LoaderContext);

	if (!context) {
		throw new Error('useLoader must be used within a LoaderContextProvider');
	}

	return context;
}
