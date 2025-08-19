const fs = require('fs');
const path = require('path');
const BALANCE_FILE = path.join(__dirname, 'balance.json');

// Import functions from index.js
let viewBalance, creditAccount, debitAccount, readBalance, writeBalance;

describe('Account Management System', () => {
    beforeAll(() => {
        // Import functions from index.js
        const mod = require('./index.js');
        viewBalance = mod.viewBalance;
        creditAccount = mod.creditAccount;
        debitAccount = mod.debitAccount;
        readBalance = mod.readBalance;
        writeBalance = mod.writeBalance;
    });

    beforeEach(() => {
        // Reset balance before each test
        writeBalance(1000.00);
    });

    test('TC01: View initial balance', () => {
        expect(readBalance()).toBe(1000.00);
    });

    test('TC02: Credit account with valid amount', () => {
        creditAccount(100);
        expect(readBalance()).toBe(1100.00);
    });

    test('TC03: Debit account with valid amount', () => {
        debitAccount(100);
        expect(readBalance()).toBe(900.00);
    });

    test('TC04: Debit account with insufficient funds', () => {
        debitAccount(2000);
        expect(readBalance()).toBe(1000.00);
    });

    test('TC05: Credit account with zero amount', () => {
        creditAccount(0);
        expect(readBalance()).toBe(1000.00);
    });

    test('TC06: Debit account with zero amount', () => {
        debitAccount(0);
        expect(readBalance()).toBe(1000.00);
    });

    test('TC09: Persist balance after credit', () => {
        creditAccount(100);
        // Simulate restart by re-reading balance
        expect(readBalance()).toBe(1100.00);
    });

    test('TC10: Persist balance after debit', () => {
        debitAccount(100);
        // Simulate restart by re-reading balance
        expect(readBalance()).toBe(900.00);
    });
});
