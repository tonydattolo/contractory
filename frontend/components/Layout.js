import Head from "next/head";

// export const siteTitle = "Hoosier Hackers";

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
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        
        <meta name="viewport" content="width=device-width, initial-scale=1"/>

        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta charset="UTF-8" />
      </Head>

      {children}

      
    </>
  );
}
