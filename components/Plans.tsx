import useAuth from "@/hooks/useAuth";
import payments, { loadCheckout } from "@/lib/stripe";
import { CheckIcon } from "@heroicons/react/solid";
import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import useSubscriptionVuejs from "@/hooks/useSubscriptionVuejs";
import useSubscriptionAngular from "@/hooks/useSubscriptionAngular";
import useSubscriptionReact from "@/hooks/useSubscriptionReact";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Loader from "./Loader";

const Plans = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<any>([]);
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[0]);
  const [isBillingLoading, setIsBillingLoading] = useState(false);
  const reactAccess = useSubscriptionReact(user);
  const angularAccess = useSubscriptionAngular(user);
  const vueAccess = useSubscriptionVuejs(user);
  const [disable, setDisable] = useState(false);

  const subscribeToPlan = () => {
    if (!user) return;

    loadCheckout(selectedPlan?.prices[0].id!);
    setIsBillingLoading(true);
  };
  const subscribeToOnePlan = (product: Product) => {
    if (!user) return;

    loadCheckout(product?.prices[0].id!);
    setIsBillingLoading(true);
  };

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

  //if (products === typeof Product) return <div>loading</div>;

  useEffect(() => {
    setSelectedPlan(products[1]);
  }, [products]);

  if (products.length === 0) {
    return (
      <div className='w-screen h-screen flex justify-center align-middle'>
        <Header />
        <Loader color='dark:fill-gray-300' />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Become A Programmer</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <div className='pt-28'>
        <h1 className='mb-3 text-3xl font-medium max-w-6xl mx-auto'>
          Choose course for you
        </h1>
        <div className='mt-4 flex flex-col space-y-4 max-w-6xl mx-auto'>
          <div className='flex w-full items-center justify-end self-end md:w-3/5'>
            {products.map((product: Product) => (
              <div
                className={`planBox ${
                  selectedPlan?.id === product.id
                    ? "opacity-100"
                    : "opacity-100"
                }`}
                key={product.id}
                onClick={() => setSelectedPlan(product)}
              >
                {product.name}
              </div>
            ))}
          </div>
          <table>
            <tbody className='divide-y divide-[gray]'>
              <tr className='tableRow'>
                <td className='tableDataTitle'>Price</td>
                {products.map((product: Product) => (
                  <td
                    className={`tableDataFeature text-white"`}
                    key={product.id}
                  >
                    {product.prices[0].unit_amount! / 100} $
                  </td>
                ))}
              </tr>
              <tr className='tableRow'>
                <td className='tableDataTitle'>Language</td>
                {products.map((product: Product) => (
                  <td
                    className={`tableDataFeature text-white"`}
                    key={product.id}
                  >
                    {product.metadata.language}
                  </td>
                ))}
              </tr>
              <tr className='tableRow'>
                <td className='tableDataTitle'>Duration</td>
                {products.map((product: Product) => (
                  <td
                    className={`tableDataFeature text-white"`}
                    key={product.id}
                  >
                    {product.metadata.duration}
                  </td>
                ))}
              </tr>
              <tr className='tableRow'>
                <td className='tableDataTitle'>Level</td>
                {products.map((product: Product) => (
                  <td
                    className={`tableDataFeature text-white"`}
                    key={product.id}
                  >
                    {product.metadata.level}
                  </td>
                ))}
              </tr>
              <tr className='tableRow'>
                <td className='tableDataTitle'>Status</td>
                {products.map((product: Product) => (
                  <td className='divSubOne' key={product.id}>
                    <button
                      disabled={
                        isBillingLoading ||
                        (product.id === "prod_NFnpy9838DslsZ" &&
                          reactAccess === true) ||
                        (product.id === "prod_NFnnQ8MnKrpmKN" &&
                          angularAccess === true) ||
                        (product.id === "prod_NFo6k1zlmiEA7j" &&
                          vueAccess === true)
                          ? true
                          : false
                      }
                      className='buttonSubOne'
                      onClick={() => subscribeToOnePlan(product)}
                    >
                      {isBillingLoading ? (
                        <Loader color='dark:fill-gray-300' />
                      ) : (product.id === "prod_NFnpy9838DslsZ" &&
                          reactAccess === true) ||
                        (product.id === "prod_NFnnQ8MnKrpmKN" &&
                          angularAccess === true) ||
                        (product.id === "prod_NFo6k1zlmiEA7j" &&
                          vueAccess === true) ? (
                        "Owned"
                      ) : (
                        `Subscribe ${product.name}`
                      )}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          {/* <button
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoading && "opacity-60"
            }`}
            onClick={subscribeToPlan}
          >
            {isBillingLoading ? (
              <Loader color='dark:fill-gray-300' />
            ) : (
              "Subscribe"
            )}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Plans;
