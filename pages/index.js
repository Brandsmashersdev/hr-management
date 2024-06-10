import dynamic from "next/dynamic";
// import Seo from "../components/Seo";
import Login from "./login";

const index = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });