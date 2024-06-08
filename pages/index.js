import dynamic from "next/dynamic";
// import Seo from "../components/Seo";
import Sidebar from "./Sidebar";
import Login from "./login";

const index = () => {
  return (
    <>
      {/* <Seo pageTitle="Preview" /> */}
      {/* <Sidebar /> */}
      <Login />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
