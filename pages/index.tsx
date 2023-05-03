import type { NextPage } from "next";

import Head from "next/head";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AsAboveSoBelow from "../components/AsAboveSoBelow";
import About from "../components/About";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-gray-900 bg-slate-200">
      <Head>
        <title>Mark Escolano</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="flex flex-col items-center justify-center flex-1 w-full px-12 text-center">
        <AsAboveSoBelow />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
