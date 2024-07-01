// content.js
console.log('Content script loaded');

function manipulateDOM() {
    // Example: Change background color of the body
    document.body.style.backgroundColor = 'white';
    // Hardcoding test values to verify all fields are filled
    document.getElementById('gp').value = '0';
    document.getElementById('Srv').value = '0';
    document.getElementById('Ace').value = '0';
    document.getElementById('SEr').value = '0';
    document.getElementById('SPt').value = '0';
    document.getElementById('Atk').value = '0';
    document.getElementById('Kls').value = '0';
    document.getElementById('Er').value = '0';
    document.getElementById('SvR').value = '0';
    document.getElementById('SRE').value = '0';
    document.getElementById('Sol').value = '0';
    document.getElementById('ABk').value = '0';
    document.getElementById('BkE').value = '0';
    document.getElementById('Ast').value = '0';
    document.getElementById('Dig').value = '0';
    document.getElementById('DEr').value = '0';
}

manipulateDOM(); // Ensure the function runs immediately upon injection
