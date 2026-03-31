// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "cypress-ntlm-auth/dist/commands";
import "cypress-mochawesome-reporter/register";

require("cypress-delete-downloads-folder").addCustomCommand();
require("cypress-downloadfile/lib/downloadFileCommand");

Cypress.Commands.add("auth", (username) => {
    const defaultUser = Cypress.env("lpp_qa_username");

    const users = {
        [defaultUser]: Cypress.env("lpp_qa_password"),
        "eap_testing_viewer": Cypress.env("eap_testing_viewer_password"),
        "eap_testing_shop": Cypress.env("eap_testing_shop_password"),
    };

    const aliases = {
        "b-checker": "eap_testing_shop",
        "viewer": "eap_testing_viewer",
        "Nikolic Nikola": defaultUser,
    };

    username = username === null ? defaultUser : (aliases[username] || username);

    if (!users[username]) {
        throw new Error(`User "${username}" not found (see auth Command)`);
    }
    const password = users[username];

    cy.ntlmReset();
    cy.ntlm(
        [
            Cypress.env("url_main"),
            Cypress.env('url_epi_test'),
            Cypress.env("url_dev"),
            Cypress.env("url_test"),
            Cypress.env("url_analytics"),
            Cypress.env("url_inside")
        ],
        username,
        password,
        "PILATUS"
    );
});

Cypress.Commands.add("clearAll", () => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.clearAllCookies();
    cy.clearLocalStorage();
});

Cypress.Commands.add("enterA_checker_Pin", () => {
    const pin = Cypress.env("checker_a_pin");
    cy.get("epi-secure-confirm").find("form")
        .within(() => {
            cy.get("div").eq(0).within(() => {
                cy.get("div").eq(1).find("input").type("DELETE");
                cy.get("div").eq(2).find("input").type(pin);
            });
        });
});

Cypress.Commands.add("enterProductionCoordinator_Pin", () => {
    const pin = Cypress.env("production_coordinator_pin");
    cy.get("epi-secure-confirm").find("form")
        .within(() => {
            cy.get("div").eq(0).within(() => {
                cy.get("div").eq(1).find("input").type(pin);
            });
        });
});


Cypress.Commands.add("visitWait", (url, opts = {}) => {
    if (opts != null && opts.isOWL) {
        cy.intercept("GET", "/owl/api/**").as("APICalls");
    } else {
        cy.intercept("GET", "/api/**").as("APICalls");
    }
    cy.visit(url);
    cy.wait("@APICalls", {timeout: 30000});
});

Cypress.Commands.add("exists", (selector, cb = null) => {
    cy.get(selector).should("exist");
    cy.get(selector).should("be.visible");

    if (cb != null) {
        cb(cy.get(selector));
    }
});

Cypress.Commands.add("shouldHave", (selector, text, opts = {}) => {
    cy.exists(selector);

    if (!opts.timeout) {
        opts.timeout = 5000;
    }

    cy.contains(selector, text, opts);
});
