Cypress.Commands.add("verifyUrlContains", (urlString) => {
    cy.url().should('include', urlString);
})

Cypress.Commands.add("verifyEqual", (actual, expected) => {
    expect(actual).to.equal(expected);
})

Cypress.Commands.add("verifyTrue", (condition) => {
    expect(condition).to.be.true;
});
