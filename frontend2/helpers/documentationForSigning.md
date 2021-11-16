Using Wallet to Sign a String of Data. RSV explained:
https://ethereum.stackexchange.com/questions/13652/how-do-you-sign-an-verify-a-message-in-javascript-proving-you-own-an-ethereum-ad

https://blog.infura.io/ethereum-javascript-libraries-web3-js-vs-ethers-js-part-ii/#section-5-web3-working-code

@web3-react/core docs:
https://github.com/NoahZinsmeister/web3-react/tree/v6/docs


available methods from useEthers():
https://usedapp.readthedocs.io/en/latest/core.html#useethers


customizing authentication backends in django:
https://docs.djangoproject.com/en/3.2/topics/auth/customizing/


example of usage flow from magic: https://codesandbox.io/s/github/MagicLabs/example-ethers?file=/index.html:8307-8910
```javascript
 const handleSignMsg = async e => {
     e.preventDefault();
        const message = new FormData(e.target).get("message");
        if (message) {
            const signer = provider.getSigner();
          const userAddress = await signer.getAddress();
          const signedMessage = await signer.signMessage(message);
          alert(`Signed Message: ${signedMessage}`);
          console.log(signedMessage);
          const signerAddress = ethers.utils.verifyMessage(
              message,
            signedMessage
          );
          console.log(signerAddress == userAddress);
        }
      };
```
```javascript
import { ethers } from 'ethers'
const signer = provider.getSigner();

const originalMessage = 'YOUR_MESSAGE';

const signedMessage = await signer.signMessage(originalMessage);
```