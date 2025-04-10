'use client';

import { createBrowserSupabaseClient } from '@/utils/supabase/client';
import { Button, Input } from '@material-tailwind/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const SignUp = ({ setView }) => {
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [confirmationRequired, setConfirmationRequired] =
    useState<boolean>(false);

  const supabase = createBrowserSupabaseClient();

  const signupMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pw,
        options: {
          emailRedirectTo: 'http://localhost:3000/signup/confirm',
        },
      });

      if (data) {
        setConfirmationRequired(true);
      }

      if (error) {
        alert(error.message);
      }
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.verifyOtp({
        type: 'signup',
        email,
        token: otp,
      });

      if (data) {
        console.log(data);
      }

      if (error) {
        alert(error.message);
      }
    },
  });

  const signInWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`
          : 'http://localhost:3000/auth/callback',
      },
    });
    console.log(data);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='pt-10 pb-6 px-10 w-full flex flex-col items-center justify-center max-w-lg border border-gray-400 bg-white gap-2'>
        <img src={'/images/inflearngram.png'} className='w-60 mb-6' />
        {/* <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label='email'
          type='email'
          className='w-full rounded-sm'
        />
        <Input
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          label='password'
          type='password'
          className='w-full rounded-sm'
        /> */}
        {confirmationRequired ? (
          <Input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            label='otp'
            type='text'
            className='w-full rounded-sm'
            placeholder='6자리 OTP를 입력해주세요.'
          />
        ) : (
          <>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label='email'
              type='email'
              className='w-full rounded-sm'
            />
            <Input
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              label='password'
              type='password'
              className='w-full rounded-sm'
            />
          </>
        )}
        {/* <Button
          onClick={() => {
            signupMutation.mutate();
          }}
          loading={signupMutation.isPending}
          color='light-blue'
          className='w-full text-md py-1'
          disabled={confirmationRequired}
        >
          {confirmationRequired ? '메일을 확인해주세요.' : '가입'}
        </Button> */}
        <Button
          onClick={() => {
            if (confirmationRequired) {
              verifyOtpMutation.mutate();
            } else {
              signupMutation.mutate();
            }
          }}
          loading={
            confirmationRequired
              ? verifyOtpMutation.isPending
              : signupMutation.isPending
          }
          disabled={
            confirmationRequired
              ? verifyOtpMutation.isPending
              : signupMutation.isPending
          }
          color='light-blue'
          className='w-full text-md py-1'
        >
          {confirmationRequired ? '인증해주세요' : '가입'}
        </Button>
        <Button
          onClick={() => signInWithKakao()}
          className='w-full text-md py-1'
        >
          카카오 로그인
        </Button>
      </div>

      <div className='py-4 w-full text-center max-w-lg border border-gray-400 bg-white'>
        계정이 있으신가요?{' '}
        <button
          className='text-light-blue-600 font-bold'
          onClick={() => setView('SIGNIN')}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default SignUp;
