import { CheckIcon } from "@heroicons/react/solid";
import Head from "next/head";
import React from "react";
import Header from "./Header";

const Plans = () => {
  return (
    <div>
      <Head>
        <title>Become A Programmer</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <div className='pt-28'>
        <h1 className='mb-3 text-3xl font-medium'>Choose course for you</h1>
        <div className='mt-4 flex flex-col space-y-4'>
          <div className='flex w-full items-center justify-end md:w-3/5 mx-auto'>
            <div className='planBox'>Biologia cz.1</div>
            <div className='planBox'>Biologia cz.2</div>
            <div className='planBox'>Biologia cz.3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
