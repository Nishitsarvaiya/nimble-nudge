'use client';

import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useLoader from '@/hooks/useLoader';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const validationSchema = z.object({
	email: z.string().min(1, { message: 'Please enter your email' }).email({
		message: 'Must be a valid email',
	}),
	password: z.string().min(6, { message: 'Password must be atleast 6 characters' }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const SignInPage: FC = () => {
	const { showLoader, hideLoader } = useLoader();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ValidationSchema>({
		resolver: zodResolver(validationSchema),
	});

	const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
		showLoader();
		const res = await signIn('credentials', { ...data, redirect: false })
			.then((res) => {
				if (!res?.ok) {
					toast.error('Invalid Credentials', { position: 'top-center' });
				} else {
					toast.success('Sign in successfully!', { position: 'top-center' });
					router.replace('/');
				}
			})
			.catch((error) => toast.error(error, { position: 'top-center' }))
			.finally(() => hideLoader());
	};
	return (
		<main>
			<section className='h-screen w-full fixed bg-background'>
				<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
					<div className='bg-background w-full rounded-3xl border border-ring sm:max-w-md xl:p-0'>
						<div className='px-8 py-12 space-y-6'>
							<div className='w-24 mb-10 mx-auto'>
								<Icons.logoDark className='w-full h-auto fill-primary' />
							</div>
							<h1 className='text-xl text-center font-semibold leading-tight text-primary md:text-2xl'>
								Sign in to your account
							</h1>
							<form className='space-y-4 md:space-y-6' onSubmit={handleSubmit(onSubmit)}>
								<div>
									<label
										htmlFor='email'
										className='block mb-2 text-sm font-medium text-muted-foreground'
									>
										Email
									</label>
									<Input
										placeholder='John@doe.com'
										className='h-[65px] px-6 text-lg'
										id='email'
										type='email'
										{...register('email')}
									/>
									{errors.email && (
										<p className='text-sm text-red-400 mt-2'> {errors.email?.message}</p>
									)}
								</div>
								<div>
									<label
										htmlFor='password'
										className='block mb-2 text-sm font-medium text-muted-foreground'
									>
										Password
									</label>
									<Input
										className='h-[65px] px-6 text-lg'
										id='password'
										type='password'
										{...register('password')}
									/>

									{errors.password && (
										<p className='text-sm text-red-400 mt-2'> {errors.password?.message}</p>
									)}
								</div>

								<Button
									className='h-[65px] w-full text-xl mb-3 disabled:opacity-100 rounded-xl'
									title='Sign in'
								>
									Sign in
								</Button>
								<p className='text-md'>
									Don't have an account?{' '}
									<Link href='/signup' className='font-semibold hover:underline text-primary'>
										Create a new account
									</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default SignInPage;
