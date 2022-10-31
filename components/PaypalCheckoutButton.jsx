import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useCart } from "../services/cartContext";

// This values are the props in the UI
const amount = "2";
const currency = "USD";
const style = { layout: "vertical" };
const myOptions = {
  "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
  components: "buttons",
  currency: "USD",
};

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ orderedProducts, emptyCart, router }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  // const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const units = orderedProducts.map((p) => ({
    reference_id: p.id,
    amount: { value: p.price },
  }));

  return (
    <>
      <PayPalButtons
        style={style}
        disabled={false}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: units,
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function (order) {
            // Your code here after capture the order
            emptyCart({ type: "empty" });
            router.push("/success");
          });
        }}
        onError={(err) => {
          // setError(err);
          console.error("PayPal Checkout onError", err);
        }}
        onCancel={() => {
          // Display cancel message, modal or redirect user to cancel page or back to cart
          // alert('')
        }}
      />
    </>
  );
};

export default function PaypalCheckoutButton({ products }) {
  const router = useRouter();
  const { dispatch } = useCart();
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider options={myOptions}>
        <ButtonWrapper
          orderedProducts={products}
          emptyCart={dispatch}
          router={router}
        />
      </PayPalScriptProvider>
    </div>
  );
}
