import {
    SEARCH_RESULTS,
    EAP_NAME,
    EAP_NUMBER,
    AIRCRAFT_TYPE,
    STATE,
    INVALID_STATES,
} from "../../test-data/constants";

export class SearchAssertions {
    assertMSNSearch() {
        cy.get("pilatus-apps-aircraft-list").should("contain", SEARCH_RESULTS.MSN_SEARCH);
    }

    assertArchivedIncluded() {
        cy.get("pilatus-apps-aircraft-list", { timeout: 30000 })
            .should("be.visible");
        cy.get(".checkbox")
            .find("[type=checkbox]").should("be.checked");
        cy.get("pilatus-apps-aircraft-list")
            .find(".panel-group")
            .then((assertForm52) => {
                cy.wrap(assertForm52);
                cy.get('[id="accordion"]').find(".label").should("contain", "Form 52");
            });
    }

    assertAircraftTypeSearch() {
        const validType = AIRCRAFT_TYPE.PC_24;
        const invalidTypes = [AIRCRAFT_TYPE.PC_12, AIRCRAFT_TYPE.PC_21];

        cy.get("pilatus-apps-aircraft-list")
            .find('[id="accordion"]')
            .within(() => {
                cy.get(".panel").each(($item) => {
                    cy.wrap($item)
                        .invoke("text")
                        .then((text) => {
                            expect(text).to.include(validType);
                            invalidTypes.forEach((invalidType) => {
                                expect(text).not.to.include(invalidType);
                            });
                        });
                });
            });
    }

    assertWorkplacesSearch() {
        cy.get("pilatus-apps-aircraft-list")
            .find('[id="accordion"]')
            .should("not.be.empty")
            .should("contain.text", SEARCH_RESULTS.WORKPLACE_SEARCH);
    }

    assertEAP_NameSearch() {
        cy.get("pilatus-apps-aircraft-list")
            .find('[id="accordion"]')
            .should("not.be.empty")
            .should("contain.text", EAP_NAME.BATTERY);
    }

    assertEAP_NumberSearch() {
        cy.get("pilatus-apps-aircraft-list")
            .find('[id="accordion"]')
            .should("not.be.empty")
            .should("contain.text", EAP_NUMBER.EAP_12_00405);
    }

    _assertStateFilter(validText, invalidTexts) {
        cy.get("pilatus-apps-aircraft-list")
            .find('[id="accordion"]')
            .within(() => {
                cy.get(".table")
                    .should("be.visible")
                    .each(($item) => {
                        cy.wrap($item)
                            .invoke("text")
                            .then((text) => {
                                expect(text).to.include(validText);
                                invalidTexts.forEach((invalidText) => {
                                    expect(text).not.to.include(invalidText);
                                });
                            });
                    });
            });
    }

    assertStateSearchCompleted() {
        this._assertStateFilter(STATE.COMPLETED, INVALID_STATES.FOR_COMPLETED);
    }

    assertStateNotStarted() {
        this._assertStateFilter(STATE.NOT_STARTED, INVALID_STATES.FOR_NOT_STARTED);
    }

    assertNA_Search() {
        this._assertStateFilter("Completed + N/A", INVALID_STATES.FOR_NA);
    }

    assertEOWL_Yes_Search() {
        this._assertStateFilter(" + OWL", INVALID_STATES.FOR_EOWL_YES);
    }

    assertEOWL_No_Search() {
        cy.get("pilatus-apps-aircraft-list")
            .find('[id="accordion"]')
            .within(() => {
                cy.get(".table")
                    .should("be.visible")
                    .each(($item) => {
                        cy.wrap($item)
                            .invoke("text")
                            .then((text) => {
                                expect(text).not.to.include(" + OWL");
                            });
                    });
            });
    }

    assertMultiParamSearch() {
        const { MULTI_PARAM_MARKS, MULTI_PARAM_TEXTS, MULTI_PARAM_INVALID } = SEARCH_RESULTS;

        cy.get("pilatus-apps-aircraft-list")
            .find('[id="accordion"]')
            .within(() => {
                cy.get(".panel-heading")
                    .should("be.visible")
                    .each(($item) => {
                        cy.wrap($item)
                            .invoke("text")
                            .then((text) => {
                                MULTI_PARAM_MARKS.forEach((validMark) => {
                                    expect(text).to.include(validMark);
                                });
                            });
                    });
            });

        cy.get("pilatus-apps-aircraft-list")
            .find('[id="accordion"]')
            .within(() => {
                cy.get(".table")
                    .should("be.visible")
                    .each(($item) => {
                        cy.wrap($item)
                            .invoke("text")
                            .then((text) => {
                                MULTI_PARAM_TEXTS.forEach((validText) => {
                                    expect(text).to.include(validText);
                                });
                                MULTI_PARAM_INVALID.forEach((invalidText) => {
                                    expect(text).not.to.include(invalidText);
                                });
                            });
                    });
            });
    }

    assertClearedSearch() {
        cy.get(".checkbox").find("[type=checkbox]").should("not.be.checked");
        cy.get("pilatus-apps-ewi-aircraft-filter-form")
            .find("tbody")
            .then((getMSN) => {
                cy.wrap(getMSN);
                cy.get("td").eq(0).find("input").should("be.empty");
            });
        cy.get("pilatus-apps-ewi-aircraft-filter-form")
            .find("tbody")
            .then((getAircraftType) => {
                cy.wrap(getAircraftType);
                cy.get("td")
                    .eq(3)
                    .find(".ng-select-container")
                    .should("contain", "Select Some Options");
            });
    }

    assertTestChapterSearch() {
        const validHeading = SEARCH_RESULTS.CHAPTER_HEADING;
        const validTexts = SEARCH_RESULTS.CHAPTER_TEXTS;
        cy.get("pilatus-apps-aircraft-list", { timeout: 20000 })
            .find('[id="accordion"]')
            .within(() => {
                cy.get(".panel-heading")
                    .should("be.visible")
                    .invoke("text")
                    .then((text) => {
                        expect(text).to.include(validHeading);
                    });
            });

        cy.get("pilatus-apps-aircraft-list")
            .find('[id="accordion"]')
            .within(() => {
                cy.get("pilatus-apps-test-table").find(".table")
                    .should("be.visible")
                    .each(($item) => {
                        cy.wrap($item)
                            .invoke("text")
                            .then((text) => {
                                validTexts.forEach((validText) => {
                                    expect(text).to.include(validText);
                                });
                            });
                    });
            });
    }
}
