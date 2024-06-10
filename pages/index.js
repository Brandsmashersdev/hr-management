import dynamic from "next/dynamic";
// import Seo from "../components/Seo";
import Layout from './Layout';

const index = () => {
  return (
    <>
      <Layout>
        <h1>Home Page</h1>
        <p>Welcome to the HR Management System!</p>
      </Layout>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });


