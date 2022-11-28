import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import CheckOutPhone from "./CheckOutPhone";

const stripePromise = loadStripe(
  "pk_test_51M6HMqJwFwHVnEEC7T7TzTFVQn3DqqSuPuPbDFLgEMsCEfwsgPHeOlaicV1X69sRAuvvGxe3lSnLqog3moVmVA4W00ULoY6dDl"
);

const Payment = () => {
  const productData = useLoaderData();

  if (useNavigation.state === "loading") {
    return <div>Loading...</div>;
  }

console.log(productData);
  return (
    <div>
      <h3>Payment For {productData.product_name}</h3>
      <p>Please Pay {productData.price}</p>
      <div>
        <Elements stripe={stripePromise}>
          <CheckOutPhone productData={productData} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
