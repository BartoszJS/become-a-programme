import payments from "@/lib/stripe";
import {
  onCurrentUserSubscriptionUpdate,
  Subscription,
} from "@stripe/firestore-stripe-payments";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";

const useSubscriptionAngular = (user: User | null) => {
  const [angularAccess, setAngularAccess] = useState(false);

  useEffect(() => {
    if (!user) return;

    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      {
        snapshot.subscriptions.map((subscription) => {
          if (
            subscription.product === "prod_NFnnQ8MnKrpmKN" &&
            subscription.status === "active"
          ) {
            setAngularAccess(true);
          }
        });
      }
    });
  }, [user]);

  return angularAccess;
};

export default useSubscriptionAngular;
