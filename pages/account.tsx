import Head from "next/head";
import Link from "next/link";
import React from "react";
import logo from "../public/become-a-programmer-logo.svg";
import { UserCircleIcon } from "@heroicons/react/solid";
import useSubscription from "../hooks/useSubscriptionReact";
import useAuth from "../hooks/useAuth";
import Membership from "../components/Membership";
import { GetStaticProps } from "next";
import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import payments from "../lib/stripe";
import Courses from "@/components/Courses";
import Header from "@/components/Header";

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  return {
    props: {
      products,
    },
  };
};

interface Props {
  products: Product[];
}

const account = ({ products }: Props) => {
  console.log(products);

  const { user, logout } = useAuth();
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className='pt-24 mx-auto max-w-6xl px-5 pb-12 transition-all mx:px-10'>
        <div className='flex flex-col gap-x-4 md:flex-row md:items-center'>
          <h1 className='text-3xl md:text-4xl'>Account</h1>
          <div className='-ml-0.5 flex items-center gap-x-1.5'></div>
        </div>

        <Membership />
        <Courses />

        <div className='mt-6 grid grid-cols-1 gap-x-4 px-4 md:grid-cols-4 md:border-x-0 border-t border-b-0 md:px-0'>
          <h4 className='text-lg text-[gray] mt-4'>Settings</h4>
          <p
            className='col-span-3 cursor-pointer text-blue-500 hover:underline mt-4'
            onClick={logout}
          >
            Logout
          </p>
        </div>
      </main>
    </div>
  );
};

export default account;
