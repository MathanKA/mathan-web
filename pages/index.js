import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export async function getStaticProps(context) {
  return {
    props: {},
  };
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="text-red-500 text-base">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p className="text-base text-green-600">
          <Link href="/notes">
            <a className="text-4xl text-blue-800">Notes</a>
          </Link>
        </p>
      </main>
    </div>
  );
}
