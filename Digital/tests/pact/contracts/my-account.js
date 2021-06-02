var supertest = require('supertest');
var should = require('chai').should();
var expect = require('chai').expect;
var server = supertest.agent('https://agldsttest.digital.agl.com.au');
var apiServer = supertest.agent('https://api-test.agl.com.au');

describe('My Account Pact Tests.', function () {

  var token;
  this.timeout(50000);

  before(function (done) {
    server
      .post('/sts/issue/oauth2/token')
      .set('Authorization', 'Basic YWdsbW9iaWxlOnZWdEFISFZmbW1zS2FsVjFyS0Nj')
      .send({
            username: 'HARRISON@GMAIL.COM',
            password: 'Password@1',
            scope: 'https://agldststs.accesscontrol.windows.net/',
            grant_type: 'password'
          })
      .end(function (err, res) {
        token = res.body.access_token;
        done();
      });
  });

  it('should have the correct schema for bills', function (done) {
    apiServer
      .get('/api/v1/bills')
      .set('authorization', 'Bearer ' + token) // 1) using the authorization header
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }

        // spec below
        expect(res.body[0]).to.have.property('account').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0]).to.have.property('contract').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0]).to.have.property('bills').and.to.be.a('array');

        // Bills spec
        expect(res.body[0].bills[0], 'bills[0].billIssued').to.have.property('billIssued').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0].bills[0], 'bills[0].startDate').to.have.property('startDate').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0].bills[0], 'bills[0].newCharges').to.have.property('newCharges').and.to.be.a('number');
        expect(res.body[0].bills[0], 'bills[0].totalDue').to.have.property('totalDue').and.to.be.a('number');
        expect(res.body[0].bills[0], 'bills[0].dueDate').to.have.property('dueDate').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0].bills[0], 'bills[0].endDate').to.have.property('endDate').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0].bills[0], 'bills[0].printDoc').to.have.property('printDoc').and.to.be.a('string');

        done();
      });
  });

  it('should have the correct schema for accounts', function (done) {
    apiServer
      .get('/api/accounts/list')
      .set('authorization', 'Bearer ' + token) // 1) using the authorization header
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }

        // Account Spec
        expect(res.body[0], 'number').to.have.property('number').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0], 'firstName').to.have.property('firstName').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0], 'lastName').to.have.property('lastName').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0], 'contracts').to.have.property('contracts').and.to.be.a('array');

        // Contracts spec
        expect(res.body[0].contracts[0], 'contracts[0].address').to.have.property('address').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0].contracts[0], 'contracts[0].accountNumber').to.have.property('accountNumber').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0].contracts[0], 'contracts[0].fuelType').to.have.property('fuelType').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0].contracts[0], 'contracts[0].nameId').to.have.property('nameId').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0].contracts[0], 'contracts[0].number').to.have.property('number').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0].contracts[0], 'contracts[0].planName').to.have.property('planName').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0].contracts[0], 'contracts[0].inFlight').to.have.property('inFlight').and.to.be.a('boolean');
        expect(res.body[0].contracts[0], 'contracts[0].isRestricted').to.have.property('isRestricted').and.to.be.a('boolean');

        done();
      });
  });

  it('should have the correct schema for dashboard', function (done) {
    apiServer
      .get('/api/v1/dashboard')
      .set('authorization', 'Bearer ' + token) // 1) using the authorization header
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        // spec below
        expect(res.body[0], 'account').to.have.property('account').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0], 'contract').to.have.property('contract').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0], 'currentBillStartDate').to.have.property('currentBillStartDate').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0], 'currentBillEndDate').to.have.property('currentBillEndDate').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0], 'costToDate').to.have.property('costToDate').and.to.be.a('number');
        expect(res.body[0], 'projectedBill').to.have.property('projectedBill').and.to.be.a('number');
        expect(res.body[0], 'usageCostThisWeek').to.have.property('usageCostThisWeek').and.to.be.a('number');
        expect(res.body[0], 'usageCostLastWeek').to.have.property('usageCostLastWeek').and.to.be.a('number');
        expect(res.body[0], 'usageThisWeek').to.have.property('usageThisWeek').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0], 'usageLastWeek').to.have.property('usageLastWeek').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0], 'balance').to.have.property('balance').and.to.be.a('number');
        expect(res.body[0], 'dueDate').to.have.property('dueDate').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0], 'isSmartMeter').to.have.property('isSmartMeter').and.to.be.a('boolean');
        expect(res.body[0], 'estimatedReads').to.have.property('estimatedReads').and.to.be.a('boolean');

        done();
      });
  });

  it('should have the correct schema for payments', function (done) {
    apiServer
      .get('/api/v1/payments')
      .set('authorization', 'Bearer ' + token) // 1) using the authorization header
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }

        // spec below
        expect(res.body[0], 'account').to.have.property('account').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0], 'contract').to.have.property('contract').and.to.be.a('string').and.to.not.be.empty;
        expect(res.body[0], 'overdue').to.have.property('overdue').and.to.be.a('number');
        expect(res.body[0], 'currentBalance').to.have.property('currentBalance').and.to.be.a('number');
        expect(res.body[0], 'totalPayment').to.have.property('totalPayment').and.to.be.a('number');
        expect(res.body[0], 'billSmoothing').to.have.property('billSmoothing').and.to.be.a('boolean');
        expect(res.body[0], 'directDebit').to.have.property('directDebit').and.to.be.a('boolean');

        done();
      });
  });

});
