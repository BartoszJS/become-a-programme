import Header from "@/components/Header";
import Head from "next/head";
import React from "react";

const account = () => {
  return (
    <div>
      <Head>
        <title>Become A Programmer</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <div className='w-screen h-screen flex justify-center items-center'>
        account
      </div>
    </div>
  );
};

export default account;
