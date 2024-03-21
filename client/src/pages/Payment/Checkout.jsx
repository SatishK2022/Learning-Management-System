import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRazorpayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../redux/slices/razorpaySlice";
import toast from "react-hot-toast";
import { Container } from "../../components";
import { BiRupee } from "react-icons/bi";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const subscription_id = useSelector(
    (state) => state?.razorpay?.subscription_id
  );
  const isPaymentVerified = useSelector(
    (state) => state?.razorpay?.isPaymentVerified
  );
  const userData = useSelector((state) => state?.auth?.data);

  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  async function handleSubscription(e) {
    e.preventDefault();

    if (!razorpayKey || !subscription_id) {
      toast.error("Something went wrong");
      return;
    }

    const options = {
      key: razorpayKey,
      subscription_id: subscription_id,
      name: "Coursify pvt. ltd.",
      description: "Subscription",
      theme: {
        color: "#3399cc",
      },
      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_subscription_id =
          response.razorpay_subscription_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;

        toast.success("Payment successful");

        const res = await dispatch(verifyUserPayment(paymentDetails));

        res?.payload?.success
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      },
    };

    const paymentOptions = new window.Razorpay(options);
    paymentOptions.open();
  }

  async function load() {
    await dispatch(getRazorpayId());
    await dispatch(purchaseCourseBundle());
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <Container>
      <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center justify-center text-slate-200"
      >
        <div className="flex flex-col gap-2 rounded-lg w-full sm:w-1/2 lg:w-1/3 shadow-[0_0_10px_black]">
          <h1 className="bg-orange-500 text-center text-2xl font-bold py-3 rounded-t-lg uppercase">
            Subscription Bundle
          </h1>
          <div className="px-5 py-5 text-center">
            <p>
              This purchase will allow you to access all the available courses
              on our platform for{" "}
              <span className="font-bold text-orange-500">
                1 Year Duration.
              </span>{" "}
              All the existing and new launched courses will be available.
            </p>
            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-orange-500 py-3">
              <BiRupee /> <span>499</span> only
            </p>
            <div className="text-slate-400">
              <p>100% refund on cancellation</p>
              <p>Terms and conditions apply *</p>
            </div>
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 w-full text-center font-semibold py-3 rounded-b-lg text-lg transition-all ease-in-out duration-300"
          >
            Buy Now
          </button>
        </div>
      </form>
    </Container>
  );
};

export default Checkout;
