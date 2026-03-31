// noinspection NonAsciiCharacters,JSNonASCIINames

import { TEST_RECORDING } from "../test-data/constants";

export class TestRecordingEAP {
    switch_to_TestRecordingTab() {
        cy.get('[id="testrecording-checklist"]').find(".nav")
            .within(() => {
                cy.get("li").eq(0).click();
            });
    }

    switch_to_MetaInformationTab() {
        cy.get('[id="testrecording-checklist"]').find(".nav")
            .within(() => {
                cy.get("li").eq(1).click();
            });
    }

    switch_to_Record_ofRevisionsTab() {
        cy.get('[id="testrecording-checklist"]').find(".nav")
            .within(() => {
                cy.get("li").eq(2).click();
            });
    }

    switch_to_SwappingHistoryTab() {
        cy.get('[id="testrecording-checklist"]').find(".nav")
            .within(() => {
                cy.get("li").eq(3).click();
            });
    }

    switch_to_AdvancedActionsTab() {
        cy.get('[id="testrecording-checklist"]').find(".nav")
            .within(() => {
                cy.get("li").eq(4).click();
            });
    }

    advancedActionsTestReset() {
        cy.get("app-advanced-actions").find("table").within(() => {
            cy.get("tr").eq(0).find("button").should("contain.text", "Reset entire Test");
            cy.get("tr").eq(0).find("button").click();
        });
    }

    advancedActionsSwapTestRecording() {
        cy.get("app-advanced-actions").find("table").within(() => {
            cy.get("tr").eq(2).find("button").should("contain.text", "Swap Test Recording");
            cy.get("tr").eq(2).find("button").click();
        });
    }

    inputForTestRecordingSwap() {
        cy.get("swap-test-recording").find(".msn-container")
            .within(() => {
                cy.get('[id="msn"]').click();
                cy.get("ng-dropdown-panel").should("be.visible")
                    .within(() => {
                        cy.get(".ng-option").eq(0).click();
                    });
            });
        cy.get("swap-test-recording").find(".reason-container")
            .type(TEST_RECORDING.SWAP_REASON);
    }

    confirmSwap() {
        cy.get("swap-test-recording").find(".action-container")
            .within(() => {
                cy.get("button").eq(0).click();
            });
    }

    confirmSwapPopup() {
        cy.get("epi-secure-confirm").find("form")
            .within(() => {
                cy.get(".modal-footer").within(() => {
                    const confirmBtn = cy.get("button").eq(0).should("contain.text", "Confirm");
                    confirmBtn.click();
                });
            });
    }

    expandArbeits_and_PrufprotokollTray() {
        cy.get("epi-chapter-template").eq(1)
            .within(() => {
                cy.contains("Arbeits- & Prüfprotokoll").click();
            });
    }

    confirmTestRecordingReset() {
        cy.get("epi-secure-confirm").find("form")
            .within(() => {
                cy.get("div").eq(5).within(() => {
                    const confirmButton = cy.get("button").eq(0).should("contain.text", "Confirm");
                    confirmButton.click();
                });
            });
    }

    selectTestRecordingSubchapter_1() {
        cy.get(".panel-collapse").find(".panel-group").eq(1)
            .within(() => {
                cy.get("div").first().click();
            });
    }

    fillSubchapter_B_Checker() {
        cy.get(".panel-collapse").find(".panel-group").eq(1)
            .within(() => {
                cy.get("div").first().find(".panel-heading").should("be.visible").should("contain.text", "2.1");
                cy.get("div").first().find(".panel-collapse").then((checkerAction) => {
                    cy.wrap(checkerAction);
                    cy.get(".test-step").eq(14).within(() => {
                        cy.get("epi-content-template").click();
                        cy.get("button").eq(5).should("contain.text", "All Above - Confirm B");
                        cy.get("button").eq(5).click();
                    });
                });
            });
    }

    fillSubchapter_A_Checker() {
        cy.get(".panel-collapse").find(".panel-group").eq(1)
            .within(() => {
                cy.get("div").first().find(".panel-heading").should("be.visible").should("contain.text", "2.1");
                cy.get("div").first().find(".panel-collapse")
                    .within(() => {
                        const checkerA_chapterConfirm = cy.get("epi-confirm-template").find("button")
                            .should("be.visible").and("contain.text", "Confirm");
                        if (checkerA_chapterConfirm === true) cy.get("epi-confirm-template").find("button").click();
                    });
            });
    }
}

export const onTestRecording = new Test_recordingEAP();
