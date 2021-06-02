
# AGL MyAccount Chrome Extension


## Installing the extension

First, we need to install the Chrome extension. This may be slightly different on different versions of chrome. You may need to google for assistance and screenshots.

- Extract the extension to a folder on your computer. For example, we could save it to 'C:\ALG\ChromeExtension'. Make a note of this as we will use it later.
- Open Chrome
- Navigate to the Chrome Settings icon --> More Tools --> Extensions
- Turn on 'developer mode'
- Select 'Load unpacked'. A directory browser will open. Navigate to the folder that we saved the extension to earlier (C:\ALG\ChromeExtension)
- The extension should load into chrome and you should see an AGL icon in the top right corner of chrome, next to the icons of your other extensions

## Working with the extension

The extension works based on the tab you are currently viewing. It looks for files that should be present in a valid MyAccount instance to validate this.

- Click the AGL icon to show the popup for the extension. This is where you see the current state of the feature flags for that environment.
- The 'Hosted' values indicate the setting that everyone accessing this site will see; a 'tick' icon indicates the feature is ON for all customers.
- The 'Override' values below allow you to override the hosted values and set a feature flag value that is only applicable to your local Chrome browser. Changing this will only modify your experience, and not change any feature flags for customers or other people accessing the site.