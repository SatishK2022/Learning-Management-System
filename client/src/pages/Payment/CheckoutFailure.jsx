import { Container } from "../../components";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const CheckoutFailure = () => {
  return (
    <Container className="min-h-[90vh] flex items-center justify-center text-slate-200">
      <div className="flex flex-col gap-2 rounded-lg w-full sm:w-1/2 lg:w-1/3 shadow-[0_0_10px_black]">
        <h1 className="bg-red-500 text-center text-2xl font-bold py-3 rounded-t-lg uppercase">
          Payment Failed
        </h1>
        <div className="px-5 flex flex-col items-center justify-center py-10">
          <h2 className="text-lg font-semibold">OOPS! Your payment failed</h2>
          <p className="text-left">Please try again later</p>
          <AiFillCloseCircle className="text-5xl text-red-500 mt-5" />
        </div>
        <Link
          to="/"
          className="bg-red-500 hover:bg-red-600 w-full text-center font-semibold py-3 rounded-b-lg text-lg transition-all ease-in-out duration-300"
        >
          Go to dashboard
        </Link>
      </div>
    </Container>
  );
};

export default CheckoutFailure;
