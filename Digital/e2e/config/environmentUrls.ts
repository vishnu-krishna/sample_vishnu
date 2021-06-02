import { browser } from 'protractor';

export const environmentUrls = {
    local: { baseURI: `https://localhost:${browser.params.localPort || 8080}`, path: '' },
    obsidian: { baseURI: 'https://aglobsidian.digital.agl.com.au', path: '' },
    diamond: { baseURI: 'https://agldiamond.digital.agl.com.au', path: '' },
    uat: { baseURI: 'https://agldstuat.digital.agl.com.au', path: '' },
    uat2: { baseURI: 'https://agldstuat2.digital.agl.com.au', path: '' },
    bau: { baseURI: 'https://aglbauuat.digital.agl.com.au', path: '' },
    monthly_test: { baseURI: 'https://aglmnttest.digital.agl.com.au', path: '' },
    monthly_uat: { baseURI: 'https://aglmntuat.digital.agl.com.au', path: '' },
    quartly_test: { baseURI: 'https://agldstqtrtest.digital.agl.com.au', path: '' },
    quartly_uat: { baseURI:  'https://aglmntuat.digital.agl.com.au', path: '' },
    production: { baseURI: 'https://agl.com.au', path: '' },
    staging: { baseURI: 'https://myaccount.agl.com.au', path: '' }
};
