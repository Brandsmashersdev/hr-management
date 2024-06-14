import dynamic from "next/dynamic";
// import Seo from "../components/Seo";
import Layout from './HR-Layout';
import Login from "./Login";

const index = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });