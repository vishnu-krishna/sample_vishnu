var debugContainter = $('#debug');
var flagList = {};

document.addEventListener('DOMContentLoaded', () => {

    var manifestData = chrome.runtime.getManifest();
    var versionNumberDisplay = $('#version-number');
    versionNumberDisplay.text(manifestData.version);
    setTimeout(bootstrap, 500);

});


function logError(msg) {
    let errorList = $(`#error-list`);
    $("<li>").text(msg).appendTo(errorList);
}

function bootstrap() {
    chrome.tabs.query({
        'active': true,
        'lastFocusedWindow': true
    }, function (tabs) {

        let activeUrl = tabs[0].url;
        let urlRegex = new RegExp('^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^\/\n]+)');
        let matches = urlRegex.exec(activeUrl);
        if (matches.length > 0) {
            let baseUrl = matches[0];

            $('#currentUrl').text(baseUrl);

            $.ajax({
                method: "GET",
                url: `${baseUrl}/config/featureFlags.json`,
                timeout: 5000,
            })
            .done((data) => {
                if (data && data.featureFlags) {
                    flagList = data.featureFlags;
                    render();
                    showLightModeConfig();
                    $(`#featureFlagConfigPanel`).show();
                    $(`#loader`).hide();
                } else {
                    $(`#featureFlagConfigPanel`).hide();
                    $(`#loader`).hide();
                    logError(`It doesn't look like your current tab is a valid instance of MyAccount`);
                }
            })
            .fail(() => {
                $(`#loader`).hide();
                logError(`It doesn't look like your current tab is a valid instance of MyAccount`);
            });
        } else {
            $(`#loader`).hide();
            logError(`Sorry, could not determine the current URL`);
        }
    });
}

function showLightModeConfig() {

    var script = `localStorage.getItem("selfService.mock.lightMode");`;
    var hasLightModeOverride = false;

    chrome.tabs.executeScript({
        code: script
    }, function (results) {
        var localLightModeOverrideState = '';
        var lightModeConfig = $('#light-mode-config');
        var lightModeOverrideValues = $('#light-mode-override-values');

        if (results && results.length === 1 && results[0] !== null) {
            hasLightModeOverride = true;
            localLightModeOverrideState = results[0];
            lightModeOverrideValues.show();
        } else {
            lightModeOverrideValues.hide();
        }

        $('<input />', {
            type: 'checkbox',
            id: 'lightmodeoverriding',
            checked: hasLightModeOverride,
        }).appendTo(lightModeConfig);

        $('<input />', {
            id: `lightmode-override-true`,
            type: 'radio',
            name: `lightmode-override`,
            checked: (hasLightModeOverride && localLightModeOverrideState === 'true'),
        }).appendTo(lightModeOverrideValues);

        $("<label>").text('ON').appendTo(lightModeOverrideValues);
        $('<input />', {
            id: `lightmode-override-false`,
            type: 'radio',
            name: `lightmode-override`,
            checked: (hasLightModeOverride && localLightModeOverrideState === 'false'),
        }).appendTo(lightModeOverrideValues);
        $("<label>").text('OFF').appendTo(lightModeOverrideValues);

        $(`input[name="lightmode-override"]`).change(function(e) {

            if (e.currentTarget.id === `lightmode-override-true`) {
                var script = `localStorage.setItem("selfService.mock.lightMode", "true");`;
                chrome.tabs.executeScript({
                    code: script
                });
            } else if (e.currentTarget.id === `lightmode-override-false`) {
                var script = `localStorage.setItem("selfService.mock.lightMode", "false");`;
                chrome.tabs.executeScript({
                    code: script
                });
            }
        });

        $("#lightmodeoverriding").on("change", function (event) {

            var isChecked = this.checked;

            console.log(isChecked);
            if (isChecked) {
                lightModeOverrideValues.show();
            } else {
                lightModeOverrideValues.hide();
                var script = `localStorage.removeItem("selfService.mock.lightMode");`;
                chrome.tabs.executeScript({
                    code: script
                });
                $(`#lightmode-override-true`)[0].checked = false;
                $(`#lightmode-override-false`)[0].checked = false;
            }

        });

    });


}

function render() {

    var flagsTable = $('#flag-settings');

    Object.keys(flagList).forEach(
        (flag) => {

            var flagValue = flagList[flag];

            var script = `localStorage.getItem("selfService.featureFlags.${flag}");`;
            chrome.tabs.executeScript({
                code: script
            }, function (results) {

                console.log(`Processing key: ${flag} with value: ${flagValue}`);

                var hasOverride = false;
                var localOverrideState = false;

                console.log(results);

                if (results && results.length === 1 && results[0] !== null) {
                    hasOverride = true;
                    localOverrideState = results[0];
                }

                var newRow = $('<tr>').appendTo(flagsTable);

                var labelCell = $('<td>').appendTo(newRow);
                var hostedCell = $('<td>').appendTo(newRow);
                if (flagValue === true) {
                    var onTick = $('<img>').attr('src', 'img/tick.svg').appendTo(hostedCell);
                }
                var overrideCell = $('<td>').appendTo(newRow);


                $('<input />', {
                    type: 'checkbox',
                    id: 'cb' + flag,
                    class: 'flagInput',
                    value: flag,
                    checked: localOverrideState
                }).appendTo(overrideCell);

                var overrideOptions = $('<div>').attr('id', `oo-${flag}`).appendTo(overrideCell);

                if (!hasOverride) {
                    overrideOptions.hide();
                }

                $('<input />', {
                    id: `override-on-${flag}`,
                    type: 'radio',
                    name: flag,
                    checked: (hasOverride && localOverrideState === 'true'),
                }).appendTo(overrideOptions);
                $("<label>").text('ON').appendTo(overrideOptions);
                $('<input />', {
                    id: `override-off-${flag}`,
                    type: 'radio',
                    name: flag,
                    checked: (hasOverride && localOverrideState === 'false'),
                }).appendTo(overrideOptions);
                $("<label>").text('OFF').appendTo(overrideOptions);

                $("<label>").text(flag).appendTo(labelCell);
                // $('<br>').appendTo(featureFlagsContainer);

                $(`input[name="${flag}"]`).change(function(e) {

                    if (e.currentTarget.id === `override-on-${flag}`) {
                        console.log(`${flag} ON`);
                        var script = `localStorage.setItem("selfService.featureFlags.${flag}", "true");`;
                        chrome.tabs.executeScript({
                            code: script
                        });
                    }
                    else if (e.currentTarget.id === `override-off-${flag}`) {
                        console.log(`${flag} OFF`);
                        var script = `localStorage.setItem("selfService.featureFlags.${flag}", "false");`;
                        chrome.tabs.executeScript({
                            code: script
                        });
                    }

                });

                $(".flagInput").on("change", function (event) {

                    var isChecked = this.checked;
                    var flagOverrideOptions = $(`#oo-${this.value}`);

                    if (isChecked) {
                        flagOverrideOptions.show();
                    } else {
                        flagOverrideOptions.hide();
                        // Delete the local storage key as we do not want it overriding the server's value anymore
                        var script = `localStorage.removeItem("selfService.featureFlags.${this.value}");`;
                        chrome.tabs.executeScript({
                            code: script
                        });
                        // Remove any checked states so if this is shown again then it is correct
                        $(`#override-on-${this.value}`)[0].checked = false;
                        $(`#override-off-${this.value}`)[0].checked = false;
                    }

                });

            });
        });
}
