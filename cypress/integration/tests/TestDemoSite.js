describe('demo page features', function () {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    before(function () {
        cy.log('Opening demo site page');
        cy.visit(Cypress.env('url'));
    });

    beforeEach(function () {
        cy.fixture('data').then(function (data) {
            this.data = data
        });
        cy.fixture('locators').then(function (locators) {
            this.locators = locators
        });
    });

    it('Verify select items functionality', function () {
        cy.log('Opening section Widgets --> Select Menu');
        cy.xpath(this.locators.initialWidgetsOption).click({force: true});
        cy.xpath(this.locators.widgetsMenu).scrollIntoView().click();
        cy.xpath(this.locators.selectMenu).click();
        cy.log('user selects option from old menu');
        cy.xpath(this.locators.oldSelectMenu).select(this.data.oldMenuOption).should('have.value', 3);
        cy.log('user selects  multiple options from Multiselect drop down list');
        cy.xpath(this.locators.multiSelectList).click();
        let valuesToBeSelected = this.data.multiSelectOption.split(',');
        valuesToBeSelected.forEach((item) => {
            cy.xpath(this.locators.multiSelectOptions).contains(item).click();
        });
        cy.xpath(this.locators.multiSelectOptionCount).should('have.length', 2);
        cy.log('user selects option from Standard Select Option list ');
        let valuesToBeSelectedStandardSelectOption = this.data.standardSelectOption.split(',');
        cy.xpath(this.locators.standardSelectList).select([valuesToBeSelectedStandardSelectOption[0], valuesToBeSelectedStandardSelectOption[1]])
            .invoke('val')
            .should('deep.equal', [valuesToBeSelectedStandardSelectOption[0].toLowerCase(), valuesToBeSelectedStandardSelectOption[1].toLowerCase()]);
    })

    it('Verify alert functionality', function () {
        cy.log('User verifies different types of alerts');
        cy.xpath(this.locators.demoHeader).click({force: true});
        cy.xpath(this.locators.initialWidgetsOption).click();
        cy.xpath(this.locators.AlertsHeader).scrollIntoView().click();
        cy.xpath(this.locators.AlertsSection).click();
        cy.log('User clicks on alert with confirmation box');
        cy.xpath(this.locators.alertConfirmationButton).click();
        cy.on('window:confirm', (string) => {
            expect(string).to.contains('Do you confirm action?');
        });
        cy.log('User verifies the text returned from alert with confirmation box');
        cy.xpath(this.locators.textReturnedFromConfirmation).should('contain.text', 'You selected Ok');
        cy.log('User clicks on alert with prompt box');
        cy.window().then(function (promptelement) {
            cy.stub(promptelement, "prompt").returns("Hello");
            cy.xpath(this.locators.alertPromptButton).click();
        });
        cy.log('User verifies the text returned from alert with prompt box');
        cy.xpath(this.locators.textReturnedFromPrompt).should('contain.text', 'You entered Hello');
    })

    it('User submits sample form', function () {
        cy.log('User fills the details available and submits the form');
        cy.xpath(this.locators.demoHeader).click({force: true});
        cy.xpath(this.locators.initialWidgetsOption).click();
        cy.xpath(this.locators.formsHeader).scrollIntoView().click();
        cy.xpath(this.locators.practiceFormSection).click();
        cy.log('User enters first name');
        cy.xpath(this.locators.firstName).type(this.data.form_data[0]);
        cy.log('User enters last name');
        cy.xpath(this.locators.lastName).type(this.data.form_data[1]);
        cy.log('User selects gender as Male');
        cy.xpath(this.locators.gender).check(this.data.form_data[2], {force: true});
        cy.log('User selects hobby as sports');
        cy.xpath(this.locators.hobbies).check('1', {force: true});
        cy.log('User selects state as Uttar Pradesh');
        cy.xpath(this.locators.state).click({force: true});
        cy.xpath(this.locators.stateOptions).contains(this.data.form_data[4]).click({force: true});
        cy.log('User selects city as Agra');
        cy.xpath(this.locators.city).click({force: true});
        cy.xpath(this.locators.cityOptions).contains(this.data.form_data[5]).click({force: true});
        cy.log('User enters mobile number');
        cy.xpath(this.locators.userMobile).type(this.data.form_data[6]);
        cy.log('User submits the form');
        cy.xpath(this.locators.submitButton).click();
        cy.log('User verifies data entered/selected');
        this.data.form_data.forEach((data) => {
            cy.xpath(this.locators.tableData).should('contain.text', data);
        });
    });

    it('Verify iframe functionality', function () {
        cy.log('User verifies items present inside an iframe');
        cy.xpath(this.locators.demoHeader).click({force: true});
        cy.xpath(this.locators.initialWidgetsOption).click();
        cy.xpath(this.locators.AlertsHeader).scrollIntoView().click();
        cy.xpath(this.locators.FramesSection).click();
        cy.log('User Verifies text in first frame');
        getIframeBody('frame1').find('h1[id="sampleHeading"]').should('have.text', this.data.iframe_text);
        cy.log('User Verifies text in second frame');
        getIframeBody('frame2').find('h1[id="sampleHeading"]').should('have.text', this.data.iframe_text);
    });
    const getIframeBody = (id) => {
        return cy
            .get('iframe[id=' + id + ']')
            .its('0.contentDocument.body').should('not.be.empty')
            .then(cy.wrap)
    }

    it('Verify menu and submenu functionality', function () {
        cy.log('User verifies the main menu and sub menu items');
        cy.xpath(this.locators.demoHeader).click({force: true});
        cy.xpath(this.locators.initialWidgetsOption).click({force: true});
        cy.xpath(this.locators.widgetsMenu).scrollIntoView().click();
        cy.xpath(this.locators.menu).click();
        cy.wait(1000);
        cy.log('User hovers mouse on main menu 2');
        cy.xpath(this.locators.mainMenu2).realHover();
        cy.xpath(this.locators.optionsMainMenu2).should('have.length', 3);
        cy.wait(1000);
        cy.log('User hovers mouse on sub menu of main menu 2');
        cy.xpath(this.locators.subMenuOfMainMenu2).realHover();
        cy.xpath(this.locators.optionssubMenuOfMainMenu2).should('have.length', 2);
    });

});
