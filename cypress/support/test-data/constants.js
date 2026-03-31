// Centralized test data constants for Pilatus LPP E2E tests

// ─── MSN (Manufacturer Serial Numbers) ──────────────────────────────
export const MSN = {
    PRIMARY: "188",
    DOWNLOAD: "1",
    VIEW: "2",
    FORM_52: "280",
    STATE_SEARCH: "198",
};

// ─── Aircraft Types ─────────────────────────────────────────────────
export const AIRCRAFT_TYPE = {
    PC_24: "PC-24",
    PC_12: "PC-12",
    PC_21: "PC-21",
};

// ─── Workplaces ─────────────────────────────────────────────────────
export const WORKPLACE = {
    FF_168: "168 FF",
    AFF_4605: "4605 AFF",
    APM_420: "420 APM",
};

// ─── EAP Names ──────────────────────────────────────────────────────
export const EAP_NAME = {
    BATTERY: "BATTERY 1 INSTLN. (STD)",
    FLIGHT_LINE: "Flight Line Check List",
    MICROWAVE: "FACT.OPT. MICROWAVE OVEN",
    PRE_ASSEMBLY: "PRE-ASSEMBLY MECHANIC",
};

// ─── EAP Numbers ────────────────────────────────────────────────────
export const EAP_NUMBER = {
    EAP_12_00405: "EAP-12-00405",
    EAP_12_00331: "EAP-12-00331",
    EAP_24_00495: "EAP-24-00495",
    EAP_24_00221: "EAP-24-00221",
    EAP_24_00023: "EAP-24-00023",
};

// ─── Test States ────────────────────────────────────────────────────
export const STATE = {
    COMPLETED: "Completed",
    NOT_STARTED: "Not Started",
    IN_PROGRESS: "In Progress",
    WITH_ANOMALY: "With anomaly",
    NEEDS_SIGNATURE: "Needs Signature",
    OBSOLETE: "Obsolete",
};

// ─── User Display Names (as shown in navbar) ────────────────────────
export const USER_DISPLAY_NAME = {
    DEFAULT: "Nikolic Nikola",
    A_CHECKER: "eap_testing_shop_sen",
    A2_CHECKER: "eap_testing_shop_TL",
    B_CHECKER: "eap_testing_shop",
    Q_CHECKER: "eap_testing_shop_quality",
    FQ_CHECKER: "eap_testing_fquality",
    G_CHECKER: "eap_testing_customer",
    G1_CHECKER: "eap_testing_custome2",
    REPORTER: "eap_testing_report",
    APPRENTICE: "eap_testing_shop_app",
    QUALITY_EDITOR: "epp_testing_qeditor",
    SHOPFLOOR_ADMIN: "epp_testing_shopfloor_admin",
    PRODUCTION_COORDINATOR: "Nikolic Nikola",
};

// ─── Search Result Expectations ─────────────────────────────────────
export const SEARCH_RESULTS = {
    MSN_SEARCH: `${MSN.PRIMARY} | ${AIRCRAFT_TYPE.PC_24}`,
    WORKPLACE_SEARCH: `${EAP_NUMBER.EAP_12_00405} (Issue 01)`,
    CHAPTER_HEADING: `${MSN.PRIMARY} | ${AIRCRAFT_TYPE.PC_24}`,
    CHAPTER_TEXTS: [EAP_NAME.MICROWAVE, `${EAP_NUMBER.EAP_24_00495} (Issue 01)`],
    TEST_RECORD_VIEW: `MSN: ${MSN.STATE_SEARCH} | ${EAP_NUMBER.EAP_24_00023} | ${AIRCRAFT_TYPE.PC_24} | Issue: 01`,
    TEST_RECORD_CHAPTER: `MSN: ${MSN.VIEW} | ${EAP_NUMBER.EAP_12_00331} | ${AIRCRAFT_TYPE.PC_12} | Issue: 01`,
    TEST_RECORD_PAGE: `MSN: ${MSN.PRIMARY} | ${EAP_NUMBER.EAP_24_00495} | ${AIRCRAFT_TYPE.PC_24} | Issue: 01`,
    OWL_RECORD_HEADER: `${MSN.VIEW} | ${AIRCRAFT_TYPE.PC_12}`,
    DW_VALID_AIRCRAFTS: [AIRCRAFT_TYPE.PC_12, MSN.VIEW],
    MULTI_PARAM_MARKS: ["Form 52", MSN.FORM_52, AIRCRAFT_TYPE.PC_24, "Open eOwl"],
    MULTI_PARAM_TEXTS: [STATE.COMPLETED, "N/A", WORKPLACE.AFF_4605, "Flight Line Check List - Nach Einflug", `${EAP_NUMBER.EAP_24_00221} (Issue 03)`],
    MULTI_PARAM_INVALID: [" + OWL", STATE.NOT_STARTED, STATE.OBSOLETE, STATE.IN_PROGRESS, STATE.NEEDS_SIGNATURE],
};

// ─── Non-valid states for filter assertions ─────────────────────────
export const INVALID_STATES = {
    FOR_COMPLETED: [STATE.NOT_STARTED, STATE.IN_PROGRESS, STATE.WITH_ANOMALY, STATE.NEEDS_SIGNATURE, STATE.OBSOLETE],
    FOR_NOT_STARTED: [STATE.IN_PROGRESS, STATE.WITH_ANOMALY, STATE.NEEDS_SIGNATURE, STATE.OBSOLETE],
    FOR_NA: [STATE.NOT_STARTED, STATE.IN_PROGRESS, STATE.WITH_ANOMALY, STATE.NEEDS_SIGNATURE, STATE.OBSOLETE],
    FOR_EOWL_YES: [STATE.NOT_STARTED, STATE.OBSOLETE],
};

// ─── Test Recording ─────────────────────────────────────────────────
export const TEST_RECORDING = {
    SWAP_REASON: "Swapping Test Recording for purposes of QA E2E test",
    SWAP_SUCCESS_MSG: "Successfully swapped Test recordings.",
    RESET_SUCCESS_MSG: "Test reseted.",
};
