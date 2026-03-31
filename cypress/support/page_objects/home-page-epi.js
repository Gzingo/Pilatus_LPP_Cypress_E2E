import { MSN } from "../test-data/constants";

export class HomePageEPI {
    setMSN() {
        cy.get("pilatus-apps-epi-aircraft-filter-form").find(".table")
            .within(() => {
                cy.get("tr").eq(0)
                    .within(() => {
                        cy.get("td").eq(0).find("input").type(MSN.DOWNLOAD);
                    });
            });
    }

    clickSearchButton() {
        cy.get("pilatus-apps-epi-aircraft-filter-form").find(".table")
            .within(() => {
                cy.get("tr").eq(0)
                    .within(() => {
                        cy.get("td").eq(2).find("button").click();
                    });
            });
    }
}

export const onHomeEPI = new HomePageEPI();
