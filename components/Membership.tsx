import useAuth from "../hooks/useAuth";
import useSubscriptionVuejs from "@/hooks/useSubscriptionVuejs";
import useSubscriptionAngular from "@/hooks/useSubscriptionAngular";
import useSubscriptionReact from "@/hooks/useSubscriptionReact";

function Membership() {
  const { user } = useAuth();
  const vueAccess = useSubscriptionReact(user);
  const angularAccess = useSubscriptionAngular(user);
  const reactAccess = useSubscriptionVuejs(user);

  return (
    <div className=' mt-6 grid grid-cols-1 gap-x-4 px-4 md:grid-cols-4 md:border-x-0 border-t border-b-0 md:px-0'>
      <div className='space-y-2 py-4'>
        <h4 className='text-lg text-[gray]'>Membership</h4>
      </div>

      <div className='col-span-3'>
        <div className='flex flex-col justify-between py-4 md:flex-row'>
          <div>
            <p className='font-medium'>Email: {user?.email}</p>
            <p className='text-[gray]'>Password: ********</p>
          </div>
        </div>

        <div className='flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0'></div>
      </div>
    </div>
  );
}

export default Membership;
