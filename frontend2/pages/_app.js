import Layout from "../components/Layout/Layout";
import "../styles/global.scss";
import { Provider } from "react-redux";
import { store } from "store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { DAppProvider, ChainId } from '@usedapp/core';


let persistor = persistStore(store)

function MyApp({ Component, pageProps }) {

    // const config = {
  //   readOnlyChainId: ChainId.Mainnet,
  //   readOnlyUrls: {
  //     [ChainId.Mainnet]: 'https://frosty-floral-river.quiknode.pro/2e46be02a8f4105fcf08054c5d2afb7818e2c084/'
  //   }
  // }
  // const config = {
  //   readOnlyChainId: ChainId.Ropsten,
  //   readOnlyUrls: {
  //     [ChainId.Ropsten]: 'https://frosty-floral-river.ropsten.quiknode.pro/2e46be02a8f4105fcf08054c5d2afb7818e2c084/'
  //   }
  // }


  return (
    <Provider store={store}>
      <DAppProvider config={{}}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </DAppProvider>
    </Provider>
  );
}

export default MyApp;
