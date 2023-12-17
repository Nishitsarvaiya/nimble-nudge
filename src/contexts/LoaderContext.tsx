// GlobalLoadingContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface LoaderContextProviderProps {
	children: ReactNode;
}

interface LoaderContextValue {
	isLoading: boolean;
	showLoader: () => void;
	hideLoader: () => void;
}

export const LoaderContext = createContext<LoaderContextValue | undefined>(undefined);

export const LoaderContextProvider: React.FC<LoaderContextProviderProps> = ({ children }) => {
	const [isLoading, setLoading] = useState(false);

	const showLoader = () => {
		setLoading(true);
	};

	const hideLoader = () => {
		setLoading(false);
	};

	const contextValue: LoaderContextValue = {
		isLoading,
		showLoader,
		hideLoader,
	};

	return <LoaderContext.Provider value={contextValue}>{children}</LoaderContext.Provider>;
};
