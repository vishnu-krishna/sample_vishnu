module.exports = function (chromy, scenario, vp) {
  // IGNORE ANY CERT WARNINGS
  chromy.ignoreCertificateErrors();

  require('./loadCookies')(chromy, scenario);
  require('../../../../../login')(chromy, scenario);
};
