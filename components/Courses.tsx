import React from "react";
import useAuth from "../hooks/useAuth";
import useSubscriptionVuejs from "@/hooks/useSubscriptionVuejs";
import useSubscriptionAngular from "@/hooks/useSubscriptionAngular";
import useSubscriptionReact from "@/hooks/useSubscriptionReact";
import Link from "next/link";

const Courses = () => {
  const { user } = useAuth();
  const reactAccess = useSubscriptionReact(user);
  const angularAccess = useSubscriptionAngular(user);
  const vueAccess = useSubscriptionVuejs(user);
  return (
    <div className=' mt-6 grid grid-cols-1 gap-x-4 px-4 md:grid-cols-4 md:border-x-0 border-t border-b-0 md:px-0'>
      <div className='space-y-2 py-4'>
        <h4 className='text-lg text-[gray]'>Purchased courses </h4>
      </div>

      <div className='col-span-3'>
        {reactAccess && (
          <div className='flex flex-col justify-between py-4 md:flex-row'>
            <div>
              <Link className='hover:underline' href='/react'>
                <p className='font-medium'>React</p>
              </Link>
            </div>
          </div>
        )}
        {angularAccess && (
          <div className='flex flex-col justify-between py-4 md:flex-row'>
            <div>
              <Link className='hover:underline' href='/angular'>
                <p className='font-medium'>Angular</p>
              </Link>
            </div>
          </div>
        )}
        {vueAccess && (
          <div className='flex flex-col justify-between py-4 md:flex-row'>
            <div className='border'>
              <Link href='/vue'>
                <p className='font-medium'>Vue</p>
              </Link>
            </div>
          </div>
        )}

        <div className='flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0'></div>
      </div>
    </div>
  );
};

export default Courses;
