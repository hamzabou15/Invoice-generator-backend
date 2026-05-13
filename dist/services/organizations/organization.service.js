"use strict";
// backend/services/organizations/organization.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySiretService = void 0;
exports.getOrganizationService = getOrganizationService;
exports.updateOrganizationService = updateOrganizationService;
const Organization_1 = __importDefault(require("../../models/organization/Organization"));
/* =========================================================
   GET ORGANIZATION
========================================================= */
async function getOrganizationService(userId) {
    const organization = await Organization_1.default.findOne({
        owner: userId,
    });
    if (!organization) {
        throw new Error("Organisation introuvable");
    }
    return organization;
}
/* =========================================================
   UPDATE ORGANIZATION
========================================================= */
async function updateOrganizationService({ userId, data, }) {
    const organization = await Organization_1.default.findOne({
        owner: userId,
    });
    if (!organization) {
        throw new Error("Organisation introuvable");
    }
    Object.assign(organization, data);
    await organization.save();
    return organization;
}
/* =========================================================
   VERIFY SIRET
========================================================= */
const verifySiretService = async (siret) => {
    const cleanSiret = siret.replace(/\s/g, "");
    const response = await fetch(`https://recherche-entreprises.api.gouv.fr/search?q=${cleanSiret}`);
    if (!response.ok) {
        throw new Error("Erreur API entreprise");
    }
    const data = await response.json();
    if (!data.results ||
        data.results.length === 0) {
        throw new Error("Entreprise introuvable");
    }
    const entreprise = data.results[0];
    const siren = entreprise.siren;
    /* =====================================
       CALCUL TVA FR
    ===================================== */
    const tvaKey = (12 +
        3 *
            (Number(siren) % 97)) % 97;
    const vatNumber = `FR${tvaKey}${siren}`;
    return {
        businessName: entreprise.nom_complet,
        legalStatus: entreprise.forme_juridique,
        siret: entreprise.siege.siret,
        siren,
        vatNumber,
        address: entreprise.siege.adresse,
        city: entreprise.siege.libelle_commune,
        postalCode: entreprise.siege.code_postal,
        apeCode: entreprise.activite_principale,
        isActive: entreprise.etat_administratif ===
            "A",
    };
};
exports.verifySiretService = verifySiretService;
