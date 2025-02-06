// The main script for the extension
// The following are examples of some basic extension functionality

//You'll likely need to import extension_settings, getContext, and loadExtensionSettings from extensions.js
import {extension_settings, getContext, loadExtensionSettings} from "../../../extensions.js";

//You'll likely need to import some other functions from the main script
import {saveSettingsDebounced} from "../../../../script.js";
import {getContext} from "../../extensions.js";
import {eventSource, event_types} from "../../../../script.js";


// Keep track of where your extension is located, name should match repo name
const extensionName = "st-extension-example";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;
const extensionSettings = extension_settings[extensionName];
const defaultSettings = {};


// Loads the extension settings if they exist, otherwise initializes them to the defaults.
async function loadSettings() {
    //Create the settings if they don't exist
    extension_settings[extensionName] = extension_settings[extensionName] || {};
    if (Object.keys(extension_settings[extensionName]).length === 0) {
        Object.assign(extension_settings[extensionName], defaultSettings);
    }

    // Updating settings in the UI
    $("#example_setting").prop("checked", extension_settings[extensionName].example_setting).trigger("input");
}

// This function is called when the extension settings are changed in the UI
function onExampleInput(event) {
    const value = Boolean($(event.target).prop("checked"));
    extension_settings[extensionName].example_setting = value;
    saveSettingsDebounced();
}

// This function is called when the button is clicked
function onButtonClick() {
    // You can do whatever you want here
    // Let's make a popup appear with the checked setting
    toastr.info(
        `The checkbox is ${extension_settings[extensionName].example_setting ? "checked" : "not checked"}`,
        "A popup appeared because you clicked the button!"
    );
}

// This function is called when the extension is loaded
jQuery(async () => {
    // This is an example of loading HTML from a file
    const settingsHtml = await $.get(`${extensionFolderPath}/example.html`);

    // Append settingsHtml to extensions_settings
    // extension_settings and extensions_settings2 are the left and right columns of the settings menu
    // Left should be extensions that deal with system functions and right should be visual/UI related
    $("#extensions_settings").append(settingsHtml);

    // These are examples of listening for events
    $("#my_button").on("click", onButtonClick);
    $("#example_setting").on("input", onExampleInput);
    // $("#new_persona_button").on("click", onButtonClick);

    // Load settings when starting things up (if you have any)
    loadSettings();
});


eventSource.on(event_types.MESSAGE_RECEIVED, handleIncomingMessage);

function handleIncomingMessage(data) {
    // Handle message
    toastr.info(
        `Test description?`,
        "Title text?"
    );
}

//
// import {Popup} from "../../../../scripts/popup.js";
// import {t} from "../../../../scripts/i18n.js";
//
// async function onChangePersonaButton() {
//     const personaName = await Popup.show.input(t`Enter a name for this persona:`, null);
//
//     if (!personaName) {
//         console.debug('User cancelled creating dummy persona');
//         return;
//     }
//
//     await createNewPersona(personaName);
// }
//
// import {
//     initPersona,
//     uploadUserAvatar,
//     updatePersonaNameIfExists,
//     retriggerFirstMessageOnEmptyChat
// } from "../../../../scripts/personas.js";
// import {default_user_avatar, setUserName} from "../../../../script.js";
//
// async function createNewPersona(personaName) {
//     if (!personaName) {
//         console.debug('Cannot create persona from empty name!');
//         return;
//     }
//     // Date + name (only ASCII) to make it unique
//     const avatarId = `${Date.now()}-${personaName.replace(/[^a-zA-Z0-9]/g, '')}.png`;
//     initPersona(avatarId, personaName, '');
//     await uploadUserAvatar(default_user_avatar, avatarId);
// }
//
// async function switchPersona(personaName) {
//     const userName = String($('#your_name').val()).trim();
//     setUserName(userName);
//     await updatePersonaNameIfExists('', userName);
//     retriggerFirstMessageOnEmptyChat();
// }
