import Head from "next/head";
import React from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import banner from "../public/banner.jpg";
import Header from "@/components/Header";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Inputs = {
  email: string;
  password: string;
};

const login = () => {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signIn(email, password);
  };
  return (
    <div>
      <Head>
        <title>Become A Programmer</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <div className='relative flex justify-center items-center h-screen w-screen flex-col bg-black bg-gradient-to-b from-transparent to-black bg-transparent'>
        <Image
          className='object-cover -z-10 '
          src={banner.src}
          fill={true}
          alt='banner'
        />
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'
        >
          <h1 className='text-4xl font-semibold'>Login</h1>
          <div className='space-y-4'>
            <label className='inline-block w-full'>
              <input
                type='email'
                placeholder='Email'
                className='input'
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className='text-[12px] text-orange-500 font-light'>
                  Enter a valid email
                </p>
              )}
            </label>
            <label className='inline-block w-full'>
              <input
                type='password'
                placeholder='Password'
                className='input'
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className='text-[13px] text-orange-500 font-light'>
                  Enter a valid password
                </p>
              )}
            </label>
          </div>
          <button className='w-full rounded bg-black border border-gray-700 py-3 font-semibold'>
            Login
          </button>
          <div>
            <Link
              href='/register'
              className='text-white drop-shadow-lg hover:underline'
            >
              Create an account here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default login;
