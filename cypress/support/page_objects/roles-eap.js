export class RolesEAP {
    getDefaultUser() {
        cy.get(".user-switch-menu")
            .find("select")
            .select("-- default --");
    }

    getRole_A_checker() {
        cy.get(".user-switch-menu")
            .find("select")
            .select("A");
    }

    getRole_A2_checker() {
        cy.get(".user-switch-menu")
            .find("select")
            .select("A (User 2)");
    }

    getRole_B_checker() {
        cy.get(".user-switch-menu")
            .find("select")
            .select("B");
    }

    getRole_Q_checker() {
        cy.get(".user-switch-menu")
            .find("select")
            .select("Q");
    }

    getRole_FQ_checker() {
        cy.get(".user-switch-menu")
            .find("select")
            .select("FQ");
    }

    getRole_G_checker() {
        cy.get(".user-switch-menu")
            .find("select")
            .select("G");
    }

    getRole_G1_checker() {
        cy.get(".user-switch-menu")
            .find("select")
            .select("G1");
    }

    getRole_Reporter() {
        cy.get(".user-switch-menu")
            .find("select")
            .select("Reporter");
    }

    getRole_Apprentice() {
        cy.get(".user-switch-menu")
            .find("select")
            .select("Apprentice");
    }

    getRole_QualityEditor() {
        cy.get(".user-switch-menu")
            .find("select")
            .select("QualityEditor");
    }

    getRole_ShopfloorAdmin() {
        cy.get(".user-switch-menu")
            .find("select")
            .select("ShopfloorAdmin");
    }

    getRole_ProductionCoordinator() {
        cy.get(".user-switch-menu")
            .find("select")
            .select("Production coordinator");
    }
}

export const changeRole = new RolesEAP();
