import { WORKPLACE } from "../test-data/constants";

export class DWPageEAP {

    setWorkplaceForDW() {
        cy.get('[id="search"]')
            .find("div").eq(2)
            .then((setInput) => {
                cy.wrap(setInput);
                cy.get("input").eq(1).should("be.visible")
                    .type(WORKPLACE.APM_420 + "{enter}");
            });
    }

    clickSearchDW() {
        cy.intercept("GET", "/api/**").as("dwSearch");
        cy.get('[id="search"]')
            .find("div").eq(3)
            .then((searchBtn) => {
                cy.wrap(searchBtn);
                cy.get("button").eq(1).click();
            });
        cy.wait("@dwSearch", { timeout: 60000 });
        cy.get("table tbody", { timeout: 10000 }).should("be.visible");
    }

    waitForDWTable() {
        cy.intercept({
            method: "GET",
            url: "NDA_Protected_URL"
        }).as("tableLoaded");

        cy.wait("@tableLoaded", { timeout: 60000 }).its("response.statusCode").should("eq", 200);
    }

    openOWL_fromDW() {
        cy.get("table")
            .find("tbody")
            .within(() => {
                cy.get("td").eq(5);
                cy.window().then((win) => {
                    cy.stub(win, "open").callsFake((url) => {
                        win.location.href = url;
                    });
                });
                cy.get(".btn").eq(0).click();
            });
    }
}

export const onDWPage = new DWPageEAP();
