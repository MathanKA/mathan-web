// import styles from "../styles/components/layout.module.scss";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div className="relative">
      <Head>
        <title>Mathan K A</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://www.mathan.me/imgs/social-poster.png`}
        />
        <meta name="og:title" content="Mathan K A" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {children}
    </div>
  );
}
