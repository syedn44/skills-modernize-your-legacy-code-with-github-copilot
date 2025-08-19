# COBOL Student Account Management System Test Plan

This test plan covers all business logic implemented in the COBOL account management system. Use this plan to validate the application with business stakeholders and as a basis for future unit and integration tests in Node.js.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|----------------------|----------------|------------|-----------------|--------------|--------------------|----------|
| TC01 | View initial balance | Application is started; no prior transactions | 1. Start app<br>2. Select 'View Balance' | Balance displayed as 1000.00 |  |  |  |
| TC02 | Credit account with valid amount | Application is started | 1. Start app<br>2. Select 'Credit Account'<br>3. Enter 100 | Balance increases by 100; new balance is 1100.00 |  |  |  |
| TC03 | Debit account with valid amount | Application is started; balance >= debit amount | 1. Start app<br>2. Select 'Debit Account'<br>3. Enter 100 | Balance decreases by 100; new balance is 900.00 |  |  |  |
| TC04 | Debit account with insufficient funds | Application is started; balance < debit amount | 1. Start app<br>2. Select 'Debit Account'<br>3. Enter 2000 | Error message: 'Insufficient funds for this debit.'; balance unchanged |  |  |  |
| TC05 | Credit account with zero amount | Application is started | 1. Start app<br>2. Select 'Credit Account'<br>3. Enter 0 | Balance remains unchanged; new balance is 1000.00 |  |  |  |
| TC06 | Debit account with zero amount | Application is started | 1. Start app<br>2. Select 'Debit Account'<br>3. Enter 0 | Balance remains unchanged; new balance is 1000.00 |  |  |  |
| TC07 | Invalid menu choice | Application is started | 1. Start app<br>2. Enter invalid choice (e.g., 5) | Error message: 'Invalid choice, please select 1-4.' |  |  |  |
| TC08 | Exit application | Application is started | 1. Start app<br>2. Select 'Exit' | Application displays exit message and terminates |  |  |  |
| TC09 | Persist balance after credit | Application is started; perform credit operation | 1. Credit account<br>2. Restart app<br>3. View balance | Balance reflects credited amount after restart |  |  |  |
| TC10 | Persist balance after debit | Application is started; perform debit operation | 1. Debit account<br>2. Restart app<br>3. View balance | Balance reflects debited amount after restart |  |  |  |
