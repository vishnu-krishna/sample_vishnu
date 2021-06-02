# Dynamic mocking

## Intent

To *dynamically* apply changes to mock users - as opposed to loading *static* api response json from the user's corresponding _mockData/users folder.

Many of the mock users are duplicated with only small tweaks to specific api responses. Dynamic mocking is intended as a step towards significantly reducing the number of mocked users to a small 'base set' and then allow us to apply api changes on a per request basis - rather than on a per user basis.

In the future the existing mock user 'Tags' could be used to identify the 'base set' (eg `Multi-contract account with gas contract in WA`) with dynamic mocks being applied for specific api scenarios (eg `bill smoothing eligibility api returns 401 SAP error 033`). The dynamic mock responses could be saved in a structured folder hierarchy and loaded on demand when a dynamic mock is applied.

### Implementations

#### DynamicMockLifecycle.appliedViaMiddleware:
Allows manipulation of the request/response before/after they are processed by the mock server endpoint. The initial implementation (for pay on time discount) alters the
response from the mock server before it is sent back to the client.

Example: [payOnTimeDiscountDynamicMock.ts](./payOnTimeDiscountDynamicMock.ts)

A more common (and far more generic) implementation would be to load a specific response from a file for a given dynamic mock scenario. Perhaps adding specific endpoint response json under a new endpoint specific folder structure.

So we could create [fileLoadingDynamicMock.ts](./fileLoadingDynamicMock.ts) and when a 'concession-submit-application-invalid-card-number-format' dynamic mock is requested it loads the response from  ../../endpoints/concessionApi/response-get_submit-application-invalid-card-number-format.json - allowing this scenario to be used across a number of different 'base sets'.

#### DynamicMockLifecycle.initialisePriorToLogin:
Orchestrates calls to existing mock server apis when first logging into My Account. Uses existing mock server endpoints to alter the setup of a 'base set', such as changing all contract accounts to be on Direct Debit. This approach will only work when My Account supports enabling/disabling specific functionality via the mocked apis.

Note that this approach may not be something we want to expand on (or at least not be out first choice when adding dynamic mocks).

Additionally whilst the current implementation make https calls against the individual endpoints, an alternative to this would be to expose the functionality via public methods on the endpoint classes which could be called from *both* the orchestration based dynamic mocks and the real api.

Example: [directDebitDynamicMock.ts](../../endpoints/configApi/directDebitDynamicMock.ts)
