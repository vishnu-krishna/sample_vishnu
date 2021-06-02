# Internal integration testing

This is where all the files are located for all internal API tests that will only be run at build time, all code contained within here will never be available to the public. We cover the following tests:

* PACT - Running using supertest, mocha + chai.

To run, go into the contracts folder and type:
`mocha -R spec`
