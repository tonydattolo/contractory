Okay so, two contracts we're referencing as a starting point to conduct the operations we need.

PaymentSplitter and AccessControl from OpenZeppelin, in theory,
should combine to do what we want. We have a 2 parties, the NBA team, and an individual player. We have a set amount for salary on a weekly(?) basis. We have bonus incentives for performance and play time.

We also need an oracle to determine the event. For this initial MVP, we can create a new wallet, and designate a role using AccessControl to that wallet, which will allow us to manually act as an oracle. We set the role permissions for whichever function triggers bonus payments for performance, and then when we pull from the nba_api, we can check if the condition is met, and if it is, we can use web3.py on the backend, to trigger the contract from that wallet.


AccessControl explainer: https://www.youtube.com/watch?v=g68PZua0lKQ
PaymentSplitter explainer: https://www.youtube.com/watch?v=b5sQt4F8voA
NBA API: https://github.com/swar/nba_api


We can setup a chainlink oracle to do this automatically I think as well?
How to use an oracle: https://www.youtube.com/watch?v=AtHp7me2Yks
What's an oracle?: https://www.youtube.com/watch?v=ZJfkNzyO7-U