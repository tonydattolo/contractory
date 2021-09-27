import Head from "next/head";
import Sidenav from "@/components/Sidenav";
import Topnav from "./LayoutPieces/Topnav";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const siteTitle = "web3social dev";

const Layout = ({ children, title, content }) => {
  // function Layout({ children, title, content }) {

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (dispatch && dispatch !== null && dispatch !== undefined)
  //     dispatch(request_refresh());
  // }, [dispatch]);

  return (
    <>
      <Head>
        {/* need to include this link to prevent large icon lazy loading with ssr */}
        <link
          href="https://use.fontawesome.com/releases/v5.15.4/css/svg-with-js.css"
          rel="stylesheet"
        ></link>

        <title>{title}</title>
        <meta name="description" content={content} />

        <link rel="icon" href="/favicon.ico" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta charSet="UTF-8" />
      </Head>

      <Topnav />
      <Sidenav />

      <main>{children}</main>
    </>
  );
};

Layout.defaultProps = {
  title: "web3social",
  description: "mvp v0",
};

export default Layout;
