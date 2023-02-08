import payments from "@/lib/stripe";
import { CheckIcon } from "@heroicons/react/solid";
import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Header from "./Header";

const Plans = () => {
  const [products, setProducts] = useState<any>([]);
  useEffect(() => {
    const getServerSideProps = async () => {
      const prd = await getProducts(payments, {
        includePrices: true,
        activeOnly: true,
      })
        .then((res) => setProducts(res))
        .catch((error) => console.log(error.message));
    };
    getServerSideProps();
  }, []);

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
            {products.map((product: Product) => (
              <div className='planBox' key={product.id}>
                {product.name}
              </div>
            ))}
          </div>
          <table>
            <tbody>
              <tr>
                <td>Price</td>
                {products.map((product: Product) => (
                  <td className='tableDataFeature' key={product.id}>
                    {product.prices[0].unit_amount! / 100} zł
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Plans;
