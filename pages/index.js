import dynamic from "next/dynamic";
import Login from "./login";

const index = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });