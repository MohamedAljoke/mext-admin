import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import React from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineLock } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { popError } from '@/App/components/PopUp/popError';
import { popSucess } from '@/App/components/PopUp/popSuccess';
import CustomInput from '@/App/Shared/common/Input/Input';
import CustomButton from '@/App/Shared/common/Button/Button';
import { LoginSchema, LoginSchemaType } from '@/App/Schema/Auth.Schema';
import { login } from '@/App/Services/Auth';
import { saveToken } from '@/App/Utils/tokens';
import cookie from 'cookie';

export default function Signin() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    try {
      const response = await login(data);
      if (response?.token) {
        const cookieOptions = {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: '/',
        };
        const cookieValue = cookie.serialize(
          'auth-token',
          response.token,
          cookieOptions
        );
        document.cookie = cookieValue;
        popSucess('Logged in');
        saveToken(response.token || '');
        router.push('/users');
      } else {
        popError(JSON.stringify(response));
      }
    } catch (e) {
      popError('try again later');
    }
  };

  return (
    <div className="flex  justify-center items-center bg-white50 h-screen">
      <div className="min-w-[350px]  bg-white rounded-2xl p-5 shadow-defaultShadow ">
        <p className="text-center font-bold text-2xl text-lightBlack">
          Admin Login
        </p>
        <form
          className="flex flex-col gap-4 my-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <CustomInput
              isRequired={true}
              register={register}
              name="email"
              type="email"
              label="Email"
              icon={
                <HiOutlineMail
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              }
              placeholder="example_email@email.com"
            />
            <p className="mt-2 text-xs text-red-600" id="email-error">
              {errors.email && <span>{errors.email?.message}</span>}
            </p>
          </div>
          <div>
            <CustomInput
              inputOptions={{
                minLength: {
                  value: 8,
                  message: 'Password needs to be longer than 8',
                },
              }}
              isRequired={true}
              register={register}
              type="password"
              name="password"
              label="Password"
              icon={
                <AiOutlineLock
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              }
              placeholder="password"
            />
            <p className="mt-2 text-xs text-red-600" id="email-error">
              {errors.password && <span>{errors.password?.message}</span>}
            </p>
          </div>
          <CustomButton isSubmit={true}>Login</CustomButton>
        </form>
      </div>
    </div>
  );
}
