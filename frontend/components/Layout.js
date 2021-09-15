import Head from "next/head";
import Sidenav from "@/components/Sidenav"

export const siteTitle = "web3social dev";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        {/* need to include this link to prevent large icon lazy loading with ssr */}
        <link
          href="https://use.fontawesome.com/releases/v5.15.4/css/svg-with-js.css"
          rel="stylesheet"
        ></link>

        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="idk some description here"
        />
        
        <meta name="viewport" content="width=device-width, initial-scale=1"/>

        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta charSet="UTF-8" />
      </Head>

      <Sidenav />

      {children}

      
    </>
  );
}
