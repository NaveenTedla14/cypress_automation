A] Tech stack:
   Scripting language : JavaScript
   Browser automation : Cypress
   Testing framework  : Mocha

B] Get started:
 1. npm install
 2. npm run test
    This will trigger execution in headless mode (we will launch Electron browser)

C] Reports:
   Reports can be viewed at 'cypress/reports/mochareports/report.html'.

D] to execute tests in desired browsers
   npm run pretest && npm run scripts -- --browser chrome || npm run posttest (will launch chrome headless)
   npm run pretest && npm run scripts -- --browser chrome --headed || npm run posttest (will launch chrome browser)
