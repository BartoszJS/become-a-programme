import payments from "@/lib/stripe";
import {
  onCurrentUserSubscriptionUpdate,
  Subscription,
} from "@stripe/firestore-stripe-payments";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";

const useSubscriptionReact = (user: User | null) => {
  const [reactAccess, setReactAccess] = useState(false);

  useEffect(() => {
    if (!user) return;

    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      {
        snapshot.subscriptions.map((subscription) => {
          if (subscription.product === "prod_NFnpy9838DslsZ") {
            setReactAccess(true);
          }
        });
      }
    });
  }, [user]);

  return reactAccess;
};

export default useSubscriptionReact;
