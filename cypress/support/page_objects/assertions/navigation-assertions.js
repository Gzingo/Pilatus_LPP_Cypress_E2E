import {
    SEARCH_RESULTS,
    AIRCRAFT_TYPE,
    MSN,
    WORKPLACE,
} from "../../test-data/constants";

export class NavigationAssertions {
    assertHomePageURL() {
        cy.url().should("eq", "NDA_Protected_URL");
    }

    assertDW_A_CheckerURL() {
        cy.url().should("eq", "NDA_Protected_URL");
    }

    assertDW_Q_CheckerURL() {
        cy.url().should("eq", "NDA_Protected_URL");
    }

    assertDWResult() {
        const validAircrafts = SEARCH_RESULTS.DW_VALID_AIRCRAFTS;
        cy.get("table").should("be.visible");
        cy.get("tbody")
            .within(() => {
                cy.get("tr").find("td").eq(0)
                    .each(($item) => {
                        cy.wrap($item)
                            .invoke("text")
                            .then((text) => {
                                validAircrafts.forEach((validAircraft) => {
                                    expect(text).to.include(validAircraft);
                                });
                            });
                    });
            });
    }

    assertDW_OWL_page() {
        const validWorkplace = WORKPLACE.APM_420;
        cy.url().should("equal", "NDA_Protected_URL");
        cy.get("app-open-work-list-overview").find("tbody")
            .within(() => {
                cy.get("td").eq(4).find("button").click();
                cy.get("app-tracebility")
                    .within(() => {
                        cy.get(".float").find("div").eq(2).should("contain", validWorkplace);
                    });
                cy.get("tr").eq(2)
                    .within(() => {
                        cy.get("td").eq(4).find("button").click();
                    });
                cy.get("tr").eq(3).find("app-tracebility")
                    .within(() => {
                        cy.get(".float").find("div").eq(2).should("contain", validWorkplace);
                    });
            });
    }

    assertOWL_recordPage() {
        cy.url().should("equal", "NDA_Protected_URL");
        cy.get("app-search-filter").find(".filter-form").within(() => {
            cy.get(".filter-row").eq(0).should("contain", MSN.VIEW);
            cy.get(".filter-row").eq(0).should("contain", AIRCRAFT_TYPE.PC_12);
        });
        cy.get("app-owl-accordion").should("be.visible");
        cy.get("app-owl-accordion")
            .find(".card-header").should("contain", SEARCH_RESULTS.OWL_RECORD_HEADER);
    }

    assertEPI_home_pageURL() {
        cy.url().should("equal", "NDA_Protected_URL");
    }
}
