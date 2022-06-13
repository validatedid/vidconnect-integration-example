# vidchain-integration-example

Public repository to share as example with VIDcredentials and/or VIDconnect integrators.

## Scenario

This demo covers most of the cases you could be interested to perform as issuer/verifier using VIDcredentials and/or VIDconnect. Checkout how this university interacts with these services:

1. **VIDconnect Integration:** ACME univerity uses **VIDconnect to authenticate users**. See the flow at the frontend between *Home* and *Callback* screens. The user is redirected to VIDconnect and this service gives back the code to obtain the token with user information. Afterwards, ACME university knows the did of the user at *Profile*. At this last page, the entity could validate this identifier towards its own databases and add any other necessary business logic. 

2. **VIDcredentials Integration:** ACME univerity uses **VIDcredentials to issue verifiable credentials** (Student eCards). See frontend *Profile* page and how it delegates the request to the backend.

3. **VIDcredentials Integration:** ACME university uses **VIDcredentials to request students verifiable presentations** (Large Family cards and Bank credentials). See frontend *Profile* page and how it delegates the request to the backend.

### Try it out

This demo is part of [this tutorial](https://try.vidchain.net/demo/tutorial). Follow the steps and see the deployed version of the code in this repository at the last step of the tutorial when visiting [ACME University Demo](https://try.vidchain.net/demo/university). 

