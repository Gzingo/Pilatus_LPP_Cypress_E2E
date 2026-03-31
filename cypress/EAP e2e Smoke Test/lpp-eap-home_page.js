import "../support/commands";
import {onHomePage} from "../support/page_objects/home-page-eap";
import {assertions} from "../support/page_objects/assertions";
import {changeRole} from "../support/page_objects/roles-eap";
import {onDWPage} from "../support/page_objects/digital-workplace-eap";

describe("EAP Home page ", () => {
    beforeEach(() => {
        cy.auth(null);
        cy.clearAll();

        cy.visitWait("/#/tests");
        cy.contains("List of Tests");
        assertions.assertHomePageURL();
    });

    it("checks currently logged in user", () => {
        changeRole.getDefaultUser();
        assertions.assertSignedInDefaultUser();
    });

    it("checks that A-checker is logged in", () => {
        changeRole.getRole_A_checker();
        assertions.assertSignedInA_Checker();
    });

    it("checks that A2-checker is logged in", () => {
        changeRole.getRole_A2_checker();
        assertions.assertSignedInA2_Checker();
    });

    it("checks that B-checker is logged in", () => {
        changeRole.getRole_B_checker();
        assertions.assertSignedInB_Checker();
    });

    it("checks that Q-checker is logged in", () => {
        changeRole.getRole_Q_checker();
        assertions.assertSignedInQ_Checker();
    });

    it("checks that FQ-checker is logged in", () => {
        changeRole.getRole_FQ_checker();
        assertions.assertSignedInFQ_Checker();
    });

    it("checks that G-checker is logged in", () => {
        changeRole.getRole_G_checker();
        assertions.assertSignedInG_Checker();
    });

    it("checks that G1-checker is logged in", () => {
        changeRole.getRole_G1_checker();
        assertions.assertSignedInG1_Checker();
    });

    it("checks that Reporter is logged in", () => {
        changeRole.getRole_Reporter();
        assertions.assertSignedInReporter();
    });

    it("checks that Apprentice is logged in", () => {
        changeRole.getRole_Apprentice();
        assertions.assertSignedInApprentice();
    });

    it("checks that Quality editor is logged in", () => {
        changeRole.getRole_QualityEditor();
        assertions.assertSignedInQualityEditor();
    });

    it("checks that Shopfloor admin is logged in", () => {
        changeRole.getRole_ShopfloorAdmin();
        assertions.assertSignedInShopfloorAdmin();
    });

    it("checks that Production coordinator is logged in", () => {
        changeRole.getRole_ProductionCoordinator();
        assertions.assertSignedInProductionCoordinator();
    });

    it("perform search by MSN", () => {
        onHomePage.setMSN();
        onHomePage.clickSearchBtn();
        assertions.assertMSNSearch();
    });

    it("search Archived included", () => {
        onHomePage.includeArchived();
        onHomePage.clickSearchBtn();
        assertions.assertArchivedIncluded();
    });

    it("perform search by Aircraft type", () => {
        onHomePage.setAircraftType();
        onHomePage.clickSearchBtn();
        assertions.assertAircraftTypeSearch();
    });

    it("perform search by Workplace & MSN", () => {
        onHomePage.setWorkplace();
        onHomePage.clickSearchBtn();
        assertions.assertWorkplacesSearch();
    });

    it("perform search by EAP Name & MSN", () => {
        onHomePage.setEAP_Name();
        onHomePage.clickSearchBtn();
        assertions.assertEAP_NameSearch();
    });
    it("perform search by EAP Number", () => {
        onHomePage.setEAP_Number();
        onHomePage.clickSearchBtn();
        assertions.assertEAP_NumberSearch();
    });
    it("perform search by State", () => {
        onHomePage.setState_Completed();
        onHomePage.clickSearchBtn();
        assertions.assertStateSearchCompleted();
    });

    it("perform search by N/A", () => {
        onHomePage.setNA_Yes();
        onHomePage.clickSearchBtn();
        assertions.assertNA_Search();
    });

    it("perform search by EOWL", () => {
        onHomePage.setEOWL_Yes();
        onHomePage.clickSearchBtn();
        assertions.assertEOWL_Yes_Search();
    });

    it("perform search by No EOWL", () => {
        onHomePage.setEOWL_No();
        onHomePage.clickSearchBtn();
        assertions.assertEOWL_No_Search();
    });

    it("perform multiple parameter search with Form 52", () => {
        onHomePage.setMSN_Form52();
        onHomePage.includeArchived();
        onHomePage.setAircraftType();
        onHomePage.setWorkplace_Form52();
        onHomePage.setEAP_NameForm52();
        onHomePage.setEAP_NumberForm52();
        onHomePage.setState_CompletedForm52();
        onHomePage.setNA_Form52();
        onHomePage.setEOWL_Form52();
        onHomePage.clickSearchBtn();
        assertions.assertMultiParamSearch();
    });

    it("clear search parameters", () => {
        onHomePage.setMSN();
        onHomePage.includeArchived();
        onHomePage.setAircraftType();
        onHomePage.clearSearchParams();
        assertions.assertClearedSearch();
    });

    it("successfully download PDF report", () => {
        changeRole.getRole_A_checker();
        assertions.assertSignedInA_Checker();
        onHomePage.setDownloadMSN();
        onHomePage.clickSearchBtn();
        onHomePage.download_and_assertPDF_Report();
    });

    it("visits the Digital Workplace for A-Checker, performs a search and visits the OWL record", () => {
        changeRole.getRole_A_checker();
        assertions.assertSignedInA_Checker();
        onHomePage.visitDigitalWorkplace();
        assertions.assertDW_A_CheckerURL();
        onDWPage.setWorkplaceForDW();
        onDWPage.clickSearchDW();
        assertions.assertDWResult();
        onDWPage.openOWL_fromDW();
        assertions.assertDW_OWL_page();
    });

    it("visits the Digital Workplace for Q-Checker, performs a search and visits the OWL record", () => {
        changeRole.getRole_Q_checker();
        assertions.assertSignedInQ_Checker();
        onHomePage.visitDigitalWorkplace();
        assertions.assertDW_Q_CheckerURL();
        onDWPage.setWorkplaceForDW();
        onDWPage.clickSearchDW();
        assertions.assertDWResult();
        onDWPage.openOWL_fromDW();
        assertions.assertDW_OWL_page();
    });

    it("open the OWL record of EAP item", () => {
        onHomePage.open_eOWL_record();
        assertions.assertOWL_recordPage();
    });

    it("click 'View' button on test recording item", () => {
        onHomePage.setState_Completed();
        onHomePage.clickSearchBtn();
        assertions.assertStateSearchCompleted();
        onHomePage.clickViewButton();
        assertions.assertTestRecordViewPage();
    });

    it("click 'Fill Out' button on test recording item", () => {
        onHomePage.setNA_No();
        onHomePage.setViewMSN();
        onHomePage.setStateNotStarted();
        onHomePage.clickSearchBtn();
        onHomePage.clickFillOutButton();
        assertions.assertTestRecordChapterPage();
    });
});
