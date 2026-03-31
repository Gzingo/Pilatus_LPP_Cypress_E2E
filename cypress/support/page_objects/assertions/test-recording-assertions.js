import { SEARCH_RESULTS, TEST_RECORDING } from "../../test-data/constants";

export class TestRecordingAssertions {
    assertTestRecordViewPage() {
        cy.url().should("equal", "NDA_Protected_URL");
        cy.get("epi-test-recording").find(".col-md-12")
            .within(() => {
                cy.get("h3").should("contain", SEARCH_RESULTS.TEST_RECORD_VIEW);
            });
    }

    assertTestRecordChapterPage() {
        cy.url().should("equal", "NDA_Protected_URL");
        cy.get("epi-test-recording", { timeout: 10000 }).should("be.visible");
        cy.get("epi-test-recording").find(".col-md-12")
            .within(() => {
                cy.get("h3").should("contain", SEARCH_RESULTS.TEST_RECORD_CHAPTER);
            });
    }

    assertTestRecordingPage() {
        cy.url().should("equal", "NDA_Protected_URL");
        cy.get("epi-test-recording", { timeout: 10000 }).should("be.visible");
        cy.get("epi-test-recording").find(".col-md-12")
            .within(() => {
                cy.get("h3").should("contain", SEARCH_RESULTS.TEST_RECORD_PAGE);
            });
    }

    assertTestRecordingFillOutPage() {
        cy.visitWait("NDA_Protected_URL");
        cy.url().should("contain", "NDA_Protected_URL");
        cy.get("epi-test-recording", { timeout: 60000 }).should("be.visible");
        cy.get("epi-test-recording").find(".col-md-12")
            .within(() => {
                cy.get("h3").should("contain", SEARCH_RESULTS.TEST_RECORD_CHAPTER);
            });
    }

    assertTestRecordingTab() {
        cy.get('[id="tab1"]')
            .find("h3").should("contain.text", " MSN:" && "EAP" && "PC" && "Issue:");
        cy.get('[id="tab1"]').find(".panel-group")
            .should("contain.text", "Definition und Bestimmungen" && "Arbeits- & Prüfprotokoll");
    }

    assertTestRecordingMetaInformationTab() {
        cy.get('[id="tab2"]')
            .find("h3").should("contain.text", "Meta Information");
    }

    assertTestRecordingRecordOfRevisionsTab() {
        cy.get('[id="tab3"]')
            .find("h3").should("contain.text", "Record of Revisions");
    }

    assertTestRecordingSwappingHistoryTab() {
        cy.get('[id="tab4"]')
            .find("h3").should("contain.text", "Swapping History");
    }

    assertTestRecordingAdvancedActionsTab() {
        cy.get('[id="tab5"]')
            .find("h3").should("contain.text", "Advanced Actions");
    }

    assert_A_check_open_badge() {
        cy.get("epi-chapter-template").eq(1)
            .within(() => {
                cy.get(".checker-badge").should("contain.text", "A-check open");
            });
    }

    assertSuccessfulTestReset() {
        cy.get('[id="toast-container"]').should("be.visible").and("contain.text", TEST_RECORDING.RESET_SUCCESS_MSG);
        cy.get("app-advanced-actions").find("table")
            .within(() => {
                cy.get("tr").eq(0).should("contain.text", "Not allowed!");
            });
    }

    assert_single_B_Check_wasSuccessful() {
        cy.get(".panel-collapse").find(".panel-group").eq(1)
            .within(() => {
                cy.get("div").first().find(".panel-heading").should("be.visible");
                cy.get("div").first().find(".panel-collapse").then((checkerAction) => {
                    cy.wrap(checkerAction);
                    cy.get(".test-step").eq(1).within(() => {
                        cy.get(".row").eq(1).should("contain.text", "CONFIRMED").and("contain.text", "(B)");
                    });
                });
            });
    }

    assertAll_B_Checks_areSuccessful() {
        const validText = ["CONFIRMED", "(B)"];
        cy.get(".panel-collapse").find(".panel-group").eq(1)
            .within(() => {
                cy.get("div").first().find(".panel-heading").should("be.visible").should("contain.text", "2.1");
                cy.get("div").first().find(".panel-collapse")
                    .then((checkerAction) => {
                        cy.wrap(checkerAction);
                        cy.get(".test-step").each(($testStep, index) => {
                            if (index > 0) {
                                // noinspection CypressCommandSubjectValidation
                                cy.wrap($testStep).within(() => {
                                    const rowElement = cy.get(".row").eq(1);
                                    validText.forEach(text => {
                                        rowElement.should("contain.text", text);
                                    });
                                });
                            }
                        });
                    });
            });
    }

    assertSwapTestRecordingPopup() {
        cy.get("swap-test-recording").should("be.visible").and("contain.text", "Swap Test Recording");
    }

    assertSwapConfirmBtnEnabled() {
        cy.get("swap-test-recording").find(".action-container")
            .within(() => {
                cy.get("button").eq(0).should("contain.text", "Swap").and("be.enabled");
                cy.get("button").eq(1).should("contain.text", "Cancel");
            });
    }

    assertSwapConfirmBtnDisabled() {
        cy.get("swap-test-recording").find(".action-container")
            .within(() => {
                cy.get("button").eq(0).should("contain.text", "Swap").and("be.disabled");
                cy.get("button").eq(1).should("contain.text", "Cancel");
            });
    }

    assertSwapSuccess() {
        cy.get('[id="toast-container"]').should("be.visible")
            .and("contain.text", TEST_RECORDING.SWAP_SUCCESS_MSG);
    }

    assertSwappingHistory() {
        const validTexts = ["Nikolic Nikola", TEST_RECORDING.SWAP_REASON];

        cy.get('[id="testrecording-checklist"]').find(".tab-content")
            .within(() => {
                cy.get('[id="tab4"]')
                    .within(() => {
                        cy.get("table").find("tbody")
                            .within(() => {
                                cy.get("tr").each(($row) => {
                                    let containsValidText = false;
                                    // noinspection CypressCommandSubjectValidation
                                    cy.wrap($row).find("td").each(($span) => {
                                        const text = $span.text().trim();
                                        if (validTexts.includes(text)) {
                                            containsValidText = true;
                                        }
                                    }).then(() => {
                                        expect(containsValidText).to.be.true;
                                    });
                                });
                            });
                    });
            });
    }

    assertEPI_SearchBtnIsDisabled() {
        cy.get("pilatus-apps-epi-aircraft-filter-form").find(".table")
            .within(() => {
                cy.get("tr").eq(0)
                    .within(() => {
                        cy.get("td").eq(2).find("button")
                            .should("be.disabled");
                    });
            });
    }

    assertEPI_SearchBtnIsEnabled() {
        cy.get("pilatus-apps-epi-aircraft-filter-form").find(".table")
            .within(() => {
                cy.get("tr").eq(0)
                    .within(() => {
                        cy.get("td").eq(2).find("button")
                            .should("be.enabled");
                    });
            });
    }
}
