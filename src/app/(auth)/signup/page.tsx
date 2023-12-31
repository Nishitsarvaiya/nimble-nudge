'use client';

import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useLoader from '@/hooks/useLoader';
import Link from 'next/link';
import { FC } from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

const validationSchema = z.object({
	name: z.string().min(1, { message: 'Please enter your name' }),
	email: z.string().min(1, { message: 'Please enter your email' }).email({
		message: 'Must be a valid email',
	}),
	password: z.string().min(6, { message: 'Password must be atleast 6 characters' }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const SignInPage: FC = ({}) => {
	const { showLoader, hideLoader } = useLoader();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ValidationSchema>({
		resolver: zodResolver(validationSchema),
	});

	const router = useRouter();

	const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
		showLoader();
		try {
			const res = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					...data,
				}),
			});

			if (res.ok) {
				toast.success('Account created successfully!', { position: 'top-center' });
				signIn();
			} else {
				toast.error((await res.json()).error, { position: 'top-center' });
			}
		} catch (error) {
			toast.error('Something went wrong! Please try again', { position: 'top-center' });
		} finally {
			hideLoader();
		}
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
								Create an account
							</h1>
							<form className='space-y-4 md:space-y-6' onSubmit={handleSubmit(onSubmit)}>
								<div>
									<label
										htmlFor='name'
										className='block mb-2 text-sm font-medium text-muted-foreground'
									>
										Full Name
									</label>
									<Input
										placeholder='John Doe'
										className='h-[65px] px-6 text-lg'
										id='name'
										type='text'
										{...register('name')}
									/>
									{errors.name && (
										<p className='text-sm text-red-400 mt-2'> {errors.name?.message}</p>
									)}
								</div>
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
									title='Create account'
								>
									Create account
								</Button>
								<p className='text-md'>
									Already have an account?{' '}
									<Link href='/signin' className='font-semibold hover:underline text-primary'>
										Sign in
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
