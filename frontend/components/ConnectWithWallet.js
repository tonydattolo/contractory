// Basic Usage:
/*
    Basic Usage:
    1. detect ethereum provider (window.ethereum)
    2. detect which ethereum network user is connected to
    3. get users ethereum accounts

*/

import detectEthereumProvider from "@metamask/detect-provider";
import { Button } from "react-bootstrap";




export default function ConnectWithWallet() {
  
  async function tryThis() {
    // This function detects most providers injected at window.ethereum
    const provider = await detectEthereumProvider();
  
    if (provider) {
      // From now on, this should always be true:
      // provider === window.ethereum
      //   startApp(provider); // initialize your app
  
      if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
      }
  
      console.log("is metamask?:" + window.ethereum.isMetaMask)
    } else {
      console.log("Please install MetaMask!");
    }
  }
  

  async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    return account
  }

  // event to subscribe to to detect account selected change. should logout on backend, and login with new account
  // ethereum.on("accountsChanged", function (accounts) {
  //   // Time to reload your interface with accounts[0]!
  //   window.location.reload()
  // });

  // const continueWithMetaMask = async () => {
    
  // }

  return (
    <>
      <Button
        onClick={getAccount}
      >
        Connect with MetaMask
      </Button>

      <div>
        <p>Current Account: {accounts[0]}</p>
        <p>Changed to Address: {checkAddress}</p>
      </div>
      <br />

      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPublicAddress">
          <Form.Label column sm="2">
            Current Public Ethereum Address: {getAccount}
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue="ethereumAddressHERE" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control type="password" placeholder="Password" />
          </Col>
        </Form.Group>
      </Form>
    </>
  );
}
