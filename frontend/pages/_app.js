import 'bootstrap/dist/css/bootstrap.css'
import '../styles/global.scss';
import Layout from '@/components/Layout';
import { Provider } from 'react-redux';
import { useStore } from '../store';
import { DAppProvider, ChainId } from '@usedapp/core';

function MyApp({ Component, pageProps }) {
  
  const store = useStore(pageProps.initialReduxState)

  const config = {
    readOnlyChainId: ChainId.Mainnet,
    readOnlyUrls: {
      [ChainId.Mainnet]: 'https://frosty-floral-river.quiknode.pro/2e46be02a8f4105fcf08054c5d2afb7818e2c084/'
    }
  }
  // const config = {
  //   readOnlyChainId: ChainId.Ropsten,
  //   readOnlyUrls: {
  //     [ChainId.Ropsten]: 'https://frosty-floral-river.ropsten.quiknode.pro/2e46be02a8f4105fcf08054c5d2afb7818e2c084/'
  //   }
  // }

  return (
    <Provider store={store}>
      <DAppProvider config={config}>
      {/* <DAppProvider config={{}}> */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DAppProvider>
    </Provider>
  )
}

export default MyApp
