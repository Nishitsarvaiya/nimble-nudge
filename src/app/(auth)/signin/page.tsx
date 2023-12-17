'use client';

import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import useLoader from '@/hooks/useLoader';
import { signIn } from 'next-auth/react';
import { FC } from 'react';
import { toast } from 'sonner';

interface pageProps {}

const SignInPage: FC<pageProps> = ({}) => {
	const { showLoader, hideLoader } = useLoader();

	const signInWithGoogle = async () => {
		showLoader();
		try {
			await signIn('google');
		} catch (error) {
			toast.error('Something went wrong! Please try again later.');
		} finally {
			hideLoader();
		}
	};
	return (
		<main>
			<section className='h-screen w-full fixed'>
				<div className='h-full max-w-xl px-5 mx-auto'>
					<div className='h-full flex flex-col items-center justify-center'>
						<div className='w-24 mb-10'>
							<Icons.logoDark className='w-full h-auto fill-primary' />
						</div>
						<Button
							variant='outline'
							className='h-[65px] w-full text-xl mb-3 disabled:opacity-100'
							title='Sign in with Google'
							onClick={signInWithGoogle}
						>
							Sign in with Google
						</Button>
						<Button variant='outline' className='h-[65px] w-full text-xl'>
							Sign in with Facebook
						</Button>
					</div>
				</div>
			</section>
		</main>
	);
};

export default SignInPage;
