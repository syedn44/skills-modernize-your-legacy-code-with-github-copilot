const readline = require('readline');
const fs = require('fs');
const BALANCE_FILE = './balance.json';

function readBalance() {
    if (!fs.existsSync(BALANCE_FILE)) {
        fs.writeFileSync(BALANCE_FILE, JSON.stringify({ balance: 1000.00 }));
    }
    const data = fs.readFileSync(BALANCE_FILE);
    return JSON.parse(data).balance;
}

function writeBalance(balance) {
    fs.writeFileSync(BALANCE_FILE, JSON.stringify({ balance }));
}

function viewBalance() {
    const balance = readBalance();
    console.log(`Current balance: ${balance.toFixed(2)}`);
}

function askQuestion(rl, question) {
    return new Promise(resolve => {
        rl.question(question, answer => {
            resolve(answer);
        });
    });
}

async function creditAccount(rl) {
    const input = await askQuestion(rl, 'Enter credit amount: ');
    const amount = parseFloat(input);
    if (isNaN(amount) || amount < 0) {
        console.log('Invalid amount.');
        return;
    }
    let balance = readBalance();
    balance += amount;
    writeBalance(balance);
    console.log(`Amount credited. New balance: ${balance.toFixed(2)}`);
}

async function debitAccount(rl) {
    const input = await askQuestion(rl, 'Enter debit amount: ');
    const amount = parseFloat(input);
    if (isNaN(amount) || amount < 0) {
        console.log('Invalid amount.');
        return;
    }
    let balance = readBalance();
    if (balance >= amount) {
        balance -= amount;
        writeBalance(balance);
        console.log(`Amount debited. New balance: ${balance.toFixed(2)}`);
    } else {
        console.log('Insufficient funds for this debit.');
    }
}

async function mainMenu() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    let continueFlag = true;
    while (continueFlag) {
        console.log('--------------------------------');
        console.log('Account Management System');
        console.log('1. View Balance');
        console.log('2. Credit Account');
        console.log('3. Debit Account');
        console.log('4. Exit');
        console.log('--------------------------------');
        const choice = await askQuestion(rl, 'Enter your choice (1-4): ');
        switch (choice) {
            case '1':
                viewBalance();
                break;
            case '2':
                await creditAccount(rl);
                break;
            case '3':
                await debitAccount(rl);
                break;
            case '4':
                continueFlag = false;
                break;
            default:
                console.log('Invalid choice, please select 1-4.');
        }
    }
    rl.close();
    console.log('Exiting the program. Goodbye!');
}

mainMenu();
