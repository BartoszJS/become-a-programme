import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import banner from "../public/banner.jpg";
import Header from "@/components/Header";
import { BsArrowRight } from "react-icons/bs";

import RowReact from "@/components/RowReact";
import RowAngular from "@/components/RowAngular";
import RowVue from "@/components/RowVue";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className='relative h-screen bg-gradient-to-b from-transparent to-black '>
        <Head>
          <title>Become A Programmer</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        {/* <div className='bg-gradient-to-b from-transparent to-black w-full h-screen'>
          <Image
            className='-z-10 opacity-100 object-cover'
            src={banner.src}
            fill={true}
            alt='banner'
          />
        </div> */}
        <Header />
        <div className='flex flex-col space-y-2 pt-[45vh] md:space-y-4 '>
          <div className='absolute top-0 left-0 h-[100vh] w-screen -z-20'>
            <Image
              className='object-cover'
              src={banner.src}
              fill={true}
              alt='banner'
            />
          </div>
        </div>
        {/* <div className='absolute z-190 left-[50%] top-[100px] bg-red-600 rounded text-white p-3'>
          This is a test website
        </div> */}
        <div className='w-full pb-[20vh] mx-auto text-right flex justify-center'>
          <div className='w-fit'>
            <h1 className='text-white text-2xl min-[420px]:text-3xl sm:text-5xl md:text-6xl font-thin'>
              Become a frontend developer
            </h1>
            <Link href='/pricing'>
              <h2 className='text-gray-200 text-xl min-[420px]:text-2xl sm:text-4xl md:text-5xl font-thin flex justify-start hover:pl-[20%] cursor-pointer duration-300 items-center'>
                Check our courses <BsArrowRight />
              </h2>
            </Link>
          </div>
        </div>

        <RowReact />
        <RowAngular />
        <RowVue />
      </div>
    </>
  );
}
