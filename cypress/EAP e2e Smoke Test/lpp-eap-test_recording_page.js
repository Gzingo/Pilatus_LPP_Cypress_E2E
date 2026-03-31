import "../support/commands";
import {assertions} from "../support/page_objects/assertions";
import {onTestRecording} from "../support/page_objects/test-recording-eap";
import {onHomePage} from "../support/page_objects/home-page-eap";
import {changeRole} from "../support/page_objects/roles-eap";


describe("EAP Test Recording page ", () => {
    beforeEach(() => {
        cy.auth(null);
        cy.clearAll();

        cy.visitWait("/#/tests");
        cy.contains("List of Tests");
        assertions.assertHomePageURL();
    });

    it("successfully access Test Recording and performs UI sanity check", () => {
        onHomePage.setChapterSearchParams();
        onHomePage.clickSearchBtn();
        assertions.assertTestChapterSearch();
        onHomePage.clickFillOutButton();
        assertions.assertTestRecordingPage();
        onTestRecording.switch_to_MetaInformationTab();
        assertions.assertTestRecordingMetaInformationTab();
        onTestRecording.switch_to_Record_ofRevisionsTab();
        assertions.assertTestRecordingRecordOfRevisionsTab();
        onTestRecording.switch_to_SwappingHistoryTab();
        assertions.assertTestRecordingSwappingHistoryTab();
        onTestRecording.switch_to_AdvancedActionsTab();
        assertions.assertTestRecordingAdvancedActionsTab();
        onTestRecording.switch_to_TestRecordingTab();
        assertions.assertTestRecordingTab();
    });

    it("successfully fills out Test Recording and do the Reset of Test Recording ", () => {
        changeRole.getRole_B_checker();
        assertions.assertSignedInB_Checker();
        onHomePage.setChapterSearch();
        onHomePage.clickSearchBtn();
        assertions.assertStateNotStarted();
        onHomePage.clickFillOutButton();
        assertions.assertTestRecordingFillOutPage();
        onTestRecording.expandArbeits_and_PrufprotokollTray();
        onTestRecording.selectTestRecordingSubchapter_1();
        onTestRecording.fillSubchapter_B_Checker();
        assertions.assert_single_B_Check_wasSuccessful();
        assertions.assertAll_B_Checks_areSuccessful();
        changeRole.getRole_A_checker();
        assertions.assertSignedInA_Checker();
        assertions.assert_A_check_open_badge();
        onTestRecording.expandArbeits_and_PrufprotokollTray();
        onTestRecording.selectTestRecordingSubchapter_1();
        onTestRecording.fillSubchapter_A_Checker();
        onTestRecording.switch_to_AdvancedActionsTab();
        onTestRecording.advancedActionsTestReset();
        cy.enterA_checker_Pin();
        onTestRecording.confirmTestRecordingReset();
        assertions.assertSuccessfulTestReset();
    });

    it("successfully swap Test recording as a Production coordinator", () => {
        changeRole.getRole_ProductionCoordinator();
        onHomePage.setMSN();
        onHomePage.setEAP_NumberForSwap();
        onHomePage.clickSearchBtn();
        onHomePage.clickFillOutButton();
        assertions.assertSignedInProductionCoordinator();
        onTestRecording.switch_to_AdvancedActionsTab();
        onTestRecording.advancedActionsSwapTestRecording();
        assertions.assertSwapTestRecordingPopup();
        assertions.assertSwapConfirmBtnDisabled();
        onTestRecording.inputForTestRecordingSwap();
        assertions.assertSwapConfirmBtnEnabled();
        onTestRecording.confirmSwap();
        cy.enterProductionCoordinator_Pin();
        onTestRecording.confirmSwapPopup();
        assertions.assertSwapSuccess();
        cy.get('[id="toast-container"]').should("not.exist");
        onTestRecording.switch_to_SwappingHistoryTab();
        assertions.assertSwappingHistory();
        onTestRecording.switch_to_AdvancedActionsTab();
        onTestRecording.advancedActionsSwapTestRecording();
        onTestRecording.inputForTestRecordingSwap();
        onTestRecording.confirmSwap();
        cy.enterProductionCoordinator_Pin();
        onTestRecording.confirmSwapPopup();
        assertions.assertSwapSuccess();
    });

});
