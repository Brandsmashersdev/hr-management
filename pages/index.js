import dynamic from "next/dynamic";
// import Seo from "../components/Seo";
import Sidebar from "./Sidebar";

const index = () => {
  return (
    <>
      {/* <Seo pageTitle="Preview" /> */}
      <Sidebar />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
