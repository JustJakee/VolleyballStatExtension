function fillFormFields(playerData) {
    const fieldMapping = {
        'MatchGamesPlayed': 'gp',
        'TotalServes': 'Srv',
        'ServingAces': 'Ace',
        'ServingErrors': 'SEr',
        'ServingPoints': 'SPt',
        'AttacksAttempts': 'Atk',
        'AttacksKills': 'Kls',
        'AttacksErrors': 'Er',
        'ServingReceivedSuccess': 'SvR',
        'ServingReceivedErrors': 'SRE',
        'BlocksSolo': 'Sol',
        'BlocksAssists': 'ABk',
        'BlocksErrors': 'BkE',
        'BallHandlingAttempt': 'Ball_Handling',
        'Assists': 'Ast',
        'AssistsErrors': 'Assists_ERR',
        'Digs': 'Dig',
        'DigsErrors': 'DEr'
    };

    Object.keys(playerData).forEach(header => {
        const fieldId = fieldMapping[header];
        if (fieldId) {
            console.log(`Field ID is: ${fieldId}`);
            console.log(`Player data is: ${playerData}`);
            const input = document.getElementById(fieldId);
            if (input) {
                console.log(`Input is: ${input}`);
                input.value = playerData[header];
            } else {
                console.log(`Input ${fieldId} was not found`);
            }
        }
    });

    // Click the save button after filling the form fields
    const saveButton = document.querySelector('button.w-100.btn.btn-outline-success[type="submit"]');
    if (saveButton) {
        saveButton.click();
        console.log('Save button clicked');
    } else {
        console.error('Save button not found');
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fillFormFields' && request.data) {
        fillFormFields(request.data);
        sendResponse({ status: 'success' });
    }
});
