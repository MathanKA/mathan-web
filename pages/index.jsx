import Head from "next/head";
import Link from "next/link";
import AboutWebsite from "../components/AboutWebsite";
import Layout from "../components/layout";
import Skills from "../components/Skills";

export async function getStaticProps(context) {
  return {
    props: {},
  };
}

export default function Home() {
  return (
    <Layout>
      <main role="main">
        <section className="pt-32">
          <div className="container mx-auto px-4 flex flex-wrap">
            <div className="flex flex-col w-full md:w-3/5 md:items-start items-center justify-center ">
              <p className="text-base">Hello World!</p>
              <h1 className="text-6xl font-extrabold">
                I'm Mathan K A <br />
                <span>Interactive Front-end developer</span>
              </h1>
            </div>
            <div className="flex w-full md:w-2/5 items-center justify-center">
              <img
                src="/person.png"
                alt="Mathan K A"
                title="Mathan K A"
                className="w-full md:w-4/5"
              />
            </div>
          </div>
        </section>
        <Skills></Skills>
        <AboutWebsite></AboutWebsite>
      </main>
      {/* <footer className="flex flex-col items-center justify-center w-full bottom-0 absolute">
        <div>
          <p>Developed by Mathan K A &copy; 2020</p>
          <p>Feel Free to fork my code @github</p>
        </div>
      </footer> */}
    </Layout>
  );
}
