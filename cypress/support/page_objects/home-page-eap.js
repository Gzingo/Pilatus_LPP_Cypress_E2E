import {
    MSN,
    AIRCRAFT_TYPE,
    WORKPLACE,
    EAP_NAME,
    EAP_NUMBER,
    STATE,
} from "../test-data/constants";

const FILTER_FORM = "pilatus-apps-ewi-aircraft-filter-form";
const MSN_INPUT = 'input[placeholder="Type * for all MSNs"]';

// Column indices in the filter form table
const COL = {
    MSN: 0,
    BUTTONS: 2,
    AIRCRAFT_TYPE: 3,
    WORKPLACE: 4,
    EAP_NAME: 5,
    EAP_NUMBER: 6,
    STATE: 7,
    NA: 8,
    EOWL: 9,
};

export class HomePageEAP {
    // ─── Private helpers ────────────────────────────────────────────

    _typeMSN(value) {
        cy.get(FILTER_FORM)
            .find("tbody")
            .then((row) => {
                cy.wrap(row);
                cy.get("td").eq(COL.MSN).find("input").type(value);
            });
    }

    _typeInField(colIndex, value) {
        cy.get(FILTER_FORM)
            .find("tbody")
            .then((row) => {
                cy.wrap(row);
                cy.get("td").eq(colIndex).type(value);
            });
    }

    _selectDropdown(colIndex, value) {
        cy.get(FILTER_FORM)
            .find("tbody")
            .then((row) => {
                cy.wrap(row);
                cy.get("td").eq(colIndex).find(".ng-arrow-wrapper").click();
                cy.contains(value).click();
            });
    }

    _selectDropdownWithPanel(colIndex, value, opts = {}) {
        cy.get(FILTER_FORM)
            .find("tbody")
            .then((row) => {
                cy.wrap(row);
                cy.get("td").eq(colIndex).find(".ng-arrow-wrapper").click(opts);
                cy.get(".ng-dropdown-panel-items")
                    .should("be.visible")
                    .then((panel) => {
                        cy.wrap(panel);
                        cy.contains(value).click();
                    });
            });
    }

    // ─── MSN Input ──────────────────────────────────────────────────

    setMSN() {
        this._typeMSN(MSN.PRIMARY);
    }

    setDownloadMSN() {
        this._typeMSN(MSN.DOWNLOAD);
    }

    setViewMSN() {
        this._typeMSN(MSN.VIEW);
    }

    setMSN_Form52() {
        this._typeMSN(MSN.FORM_52);
    }

    // ─── Checkbox ───────────────────────────────────────────────────

    includeArchived() {
        cy.get(".checkbox")
            .find("[type=checkbox]")
            .check({ force: true });
    }

    // ─── Aircraft Type ──────────────────────────────────────────────

    setAircraftType() {
        this._selectDropdown(COL.AIRCRAFT_TYPE, AIRCRAFT_TYPE.PC_24);
    }

    // ─── Workplace ──────────────────────────────────────────────────

    setWorkplace() {
        cy.get(MSN_INPUT).type(MSN.VIEW);
        this._selectDropdown(COL.WORKPLACE, WORKPLACE.FF_168);
    }

    setWorkplace_Form52() {
        this._selectDropdown(COL.WORKPLACE, WORKPLACE.AFF_4605);
    }

    // ─── EAP Name ───────────────────────────────────────────────────

    setEAP_Name() {
        cy.get(MSN_INPUT).type(MSN.VIEW);
        this._typeInField(COL.EAP_NAME, EAP_NAME.BATTERY);
    }

    setEAP_NameForm52() {
        this._typeInField(COL.EAP_NAME, EAP_NAME.FLIGHT_LINE);
    }

    // ─── EAP Number ─────────────────────────────────────────────────

    setEAP_Number() {
        cy.get(MSN_INPUT).type(MSN.VIEW);
        this._typeInField(COL.EAP_NUMBER, EAP_NUMBER.EAP_12_00405);
    }

    setEAP_NumberForSwap() {
        this._typeInField(COL.EAP_NUMBER, EAP_NUMBER.EAP_24_00495);
    }

    setEAP_NumberForm52() {
        this._typeInField(COL.EAP_NUMBER, EAP_NUMBER.EAP_24_00221);
    }

    // ─── State ──────────────────────────────────────────────────────

    setState_Completed() {
        cy.get(MSN_INPUT).type(MSN.STATE_SEARCH);
        this._selectDropdownWithPanel(COL.STATE, STATE.COMPLETED);
    }

    setState_CompletedForm52() {
        this._selectDropdownWithPanel(COL.STATE, STATE.COMPLETED);
    }

    setStateNotStarted() {
        this._selectDropdownWithPanel(COL.STATE, STATE.NOT_STARTED);
    }

    // ─── N/A ────────────────────────────────────────────────────────

    setNA_Yes() {
        cy.get(MSN_INPUT).type(MSN.STATE_SEARCH);
        this._selectDropdownWithPanel(COL.NA, "Yes", { force: true });
    }

    setNA_Form52() {
        this._selectDropdownWithPanel(COL.NA, "Yes", { force: true });
    }

    setNA_No() {
        this._selectDropdownWithPanel(COL.NA, "No", { force: true });
    }

    // ─── EOWL ──────────────────────────────────────────────────────

    setEOWL_Yes() {
        cy.get(MSN_INPUT).type(MSN.VIEW);
        this._selectDropdownWithPanel(COL.EOWL, "Yes");
    }

    setEOWL_No() {
        cy.get(MSN_INPUT).type(MSN.VIEW);
        this._selectDropdownWithPanel(COL.EOWL, "No", { force: true });
    }

    setEOWL_Form52() {
        this._selectDropdownWithPanel(COL.EOWL, "No");
    }

    // ─── Search Controls ────────────────────────────────────────────

    clearSearchParams() {
        cy.get(FILTER_FORM)
            .find("tbody")
            .then((row) => {
                cy.wrap(row);
                cy.get("td").eq(COL.BUTTONS).find("button").contains("Clear").click();
            });
    }

    clickSearchBtn() {
        cy.get(FILTER_FORM)
            .find("tbody")
            .then((row) => {
                cy.wrap(row);
                cy.get("td").eq(COL.BUTTONS).find("button").contains("Search").click();
            });
    }

    // ─── Navigation & Actions ───────────────────────────────────────

    download_and_assertPDF_Report() {
        cy.task("downloads", "cypress/downloads").then((before) => {
            cy.get("pilatus-apps-aircraft-list")
                .find('[id="accordion"]').then((clickDownloadBtn) => {
                cy.wrap(clickDownloadBtn);
                cy.get(".panel-heading").find("button").eq(0).click();
                cy.wait(2000);
                cy.task("downloads", "cypress/downloads").then((after) => {
                    cy.wait(2000);
                    expect(after.length).to.be.eq(before.length + 1);
                    const newFile = after.filter(() => !before.includes("zip"))[0];
                    cy.log("The new file is: " + newFile);
                    cy.readFile("cypress/downloads/" + newFile).should("contain", "EAP-12");
                    cy.wait(3000);
                    cy.task("deleteFolder", "cypress/downloads/" + newFile);
                });
            });
        });
    }

    visitDigitalWorkplace() {
        cy.get("pilatus-apps-aircraft-list")
            .find('[id="accordion"]')
            .then((clickABtn) => {
                cy.wrap(clickABtn);
                cy.get(".panel-heading").eq(1).find("a").eq(1).click();
            });
    }

    open_eOWL_record() {
        cy.get("pilatus-apps-aircraft-list")
            .find('[id="accordion"]').within(() => {
            cy.get(".panel").find("button").eq(1).click();
        });
    }

    clickViewButton() {
        cy.get("pilatus-apps-aircraft-list")
            .find(".panel-body").should("be.visible");
        cy.get("pilatus-apps-test-table table tbody tr", { timeout: 15000 })
            .should("be.visible");
        cy.get("pilatus-apps-test-table")
            .find(".panel-collapse").within(() => {
            cy.get("table tbody").find("tr").eq(0).within(() => {
                cy.get("td").eq(4).click();
            });
        });
    }

    clickFillOutButton() {
        cy.get("pilatus-apps-aircraft-list")
            .find(".panel-body").should("be.visible");
        cy.get("pilatus-apps-test-table table tbody tr", { timeout: 15000 })
            .should("be.visible");
        cy.get("pilatus-apps-test-table")
            .find(".panel-collapse").within(() => {
            cy.get("table tbody").find("tr").eq(0).within(() => {
                cy.get("td").eq(4).click();
            });
        });
    }

    // ─── Complex Search Scenarios ───────────────────────────────────

    setChapterSearchParams() {
        cy.get(MSN_INPUT).type(MSN.PRIMARY);
        this._typeInField(COL.EAP_NUMBER, EAP_NUMBER.EAP_24_00495);
        this._typeInField(COL.EAP_NAME, EAP_NAME.MICROWAVE);
        this._selectDropdown(COL.AIRCRAFT_TYPE, AIRCRAFT_TYPE.PC_24);
    }

    setChapterSearch() {
        cy.get(MSN_INPUT).type(MSN.VIEW);
        this._typeInField(COL.EAP_NUMBER, EAP_NUMBER.EAP_12_00331);
        this._typeInField(COL.EAP_NAME, EAP_NAME.PRE_ASSEMBLY);
        this._selectDropdown(COL.AIRCRAFT_TYPE, AIRCRAFT_TYPE.PC_12);
        this._selectDropdownWithPanel(COL.STATE, STATE.NOT_STARTED);
    }
}

export const onHomePage = new HomePageEAP();
