import { USER_DISPLAY_NAME } from "../../test-data/constants";

export class UserAssertions {
    assertSignedInUser(displayName) {
        cy.get('[id="main-navbar"]')
            .find(".nav li")
            .eq(0)
            .should("contain.text", "Signed in as:")
            .and("contain.text", displayName);
    }

    assertSignedInDefaultUser() {
        this.assertSignedInUser(USER_DISPLAY_NAME.DEFAULT);
    }

    assertSignedInA_Checker() {
        this.assertSignedInUser(USER_DISPLAY_NAME.A_CHECKER);
    }

    assertSignedInA2_Checker() {
        this.assertSignedInUser(USER_DISPLAY_NAME.A2_CHECKER);
    }

    assertSignedInB_Checker() {
        this.assertSignedInUser(USER_DISPLAY_NAME.B_CHECKER);
    }

    assertSignedInQ_Checker() {
        this.assertSignedInUser(USER_DISPLAY_NAME.Q_CHECKER);
    }

    assertSignedInFQ_Checker() {
        this.assertSignedInUser(USER_DISPLAY_NAME.FQ_CHECKER);
    }

    assertSignedInG_Checker() {
        this.assertSignedInUser(USER_DISPLAY_NAME.G_CHECKER);
    }

    assertSignedInG1_Checker() {
        this.assertSignedInUser(USER_DISPLAY_NAME.G1_CHECKER);
    }

    assertSignedInReporter() {
        this.assertSignedInUser(USER_DISPLAY_NAME.REPORTER);
    }

    assertSignedInApprentice() {
        this.assertSignedInUser(USER_DISPLAY_NAME.APPRENTICE);
    }

    assertSignedInQualityEditor() {
        this.assertSignedInUser(USER_DISPLAY_NAME.QUALITY_EDITOR);
    }

    assertSignedInShopfloorAdmin() {
        this.assertSignedInUser(USER_DISPLAY_NAME.SHOPFLOOR_ADMIN);
    }

    assertSignedInProductionCoordinator() {
        this.assertSignedInUser(USER_DISPLAY_NAME.PRODUCTION_COORDINATOR);
    }
}
