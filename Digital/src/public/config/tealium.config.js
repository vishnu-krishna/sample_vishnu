var tealiumScript = document.createElement('script');
var tealiumEnvironment = '#{config-aglTealiumEnv}';

// Localhost just default to dev
if ((window.location.host === 'localhost:8080' || window.location.host === 'localhost')) {
    tealiumEnvironment = 'dev'
}

var tealiumUrl = '//tags.tiqcdn.com/utag/agl/main/' + tealiumEnvironment + '/utag.sync.js';

tealiumScript.setAttribute('src', tealiumUrl);
document.head.appendChild(tealiumScript);

utag_cfg_ovrd = window.utag_cfg_ovrd || {};
utag_cfg_ovrd.noview = true;
(function(a,b,c,d){
    a='//tags.tiqcdn.com/utag/agl/main/' + tealiumEnvironment + '/utag.js';
    b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;
    a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);
})();

// Do a check if dataLayer is defined
// If for some reason it isn't defined we need to define it as to not break the application on load.
if (typeof dataLayer === 'undefined') {
    dataLayer = {
        push: function push() {},
        pushContractAccounts: function pushContractAccounts() {}
    };
}
