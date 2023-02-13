import payments from "@/lib/stripe";
import {
  onCurrentUserSubscriptionUpdate,
  Subscription,
} from "@stripe/firestore-stripe-payments";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";

const useSubscriptionVuejs = (user: User | null) => {
  const [vueAccess, setVueAccess] = useState(false);

  useEffect(() => {
    if (!user) return;

    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      {
        snapshot.subscriptions.map((subscription) => {
          if (
            subscription.product === "prod_NFo6k1zlmiEA7j" &&
            subscription.status === "active"
          ) {
            setVueAccess(true);
          }
        });
      }
    });
  }, [user]);

  return vueAccess;
};

export default useSubscriptionVuejs;
