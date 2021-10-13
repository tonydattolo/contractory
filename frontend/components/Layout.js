import Head from "next/head";
import TopNav from "./LayoutPieces/TopNav";
import SideNav from "./LayoutPieces/SideNav";
import RightNav from "./LayoutPieces/RightNav";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

export const siteTitle = "web3social dev";

const Layout = ({ children, title, content }) => {

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

      <TopNav />
      <Container>
        <Row>
          <Col md={3}>
            <SideNav />
          </Col>
          <Col md={6}>
            <main>{children}</main>
          </Col>
          <Col md={3}>
            <RightNav />
          </Col>
        </Row>
      </Container>

    </>
  );
};

Layout.defaultProps = {
  title: "web3social",
  description: "mvp v0",
};

export default Layout;
