// backend/services/organizations/organization.service.ts

import Organization
    from "../../models/organization/Organization";

interface UpdateOrganizationInput {

    userId: string;

    data: {

        companyName?: string;

        brandName?: string;

        siret?: string;
        siren?: string;

        vatNumber?: string;

        apeCode?: string;

        professionalPhone?: string;

        email?: string;

        website?: string;

        address?: string;

        city?: string;

        postalCode?: string;

        country?: string;

        legalStatus?: string;

        capital?: string;

        rcs?: string;

        invoicePrefix?: string;

        iban?: string;

        bic?: string;
        logo?: string;
    };
}

/* =========================================================
   GET ORGANIZATION
========================================================= */

export async function getOrganizationService(
    userId: string
) {

    const organization =
        await Organization.findOne({
            owner: userId,
        });

    if (!organization) {

        throw new Error(
            "Organisation introuvable"
        );
    }

    return organization;
}

/* =========================================================
   UPDATE ORGANIZATION
========================================================= */

export async function updateOrganizationService({
    userId,
    data,
}: UpdateOrganizationInput) {

    const organization =
        await Organization.findOne({
            owner: userId,
        });

    if (!organization) {

        throw new Error(
            "Organisation introuvable"
        );
    }

    Object.assign(
        organization,
        data
    );

    await organization.save();

    return organization;
}

/* =========================================================
   VERIFY SIRET
========================================================= */
export const verifySiretService =
    async (siret: string) => {

        const cleanSiret =
            siret.replace(/\s/g, "");

        const response = await fetch(
            `https://recherche-entreprises.api.gouv.fr/search?q=${cleanSiret}`
        );

        if (!response.ok) {

            throw new Error(
                "Erreur API entreprise"
            );
        }

        const data =
            await response.json();

        if (
            !data.results ||
            data.results.length === 0
        ) {

            throw new Error(
                "Entreprise introuvable"
            );
        }

        const entreprise =
            data.results[0];

        const siren =
            entreprise.siren;

        /* =====================================
           CALCUL TVA FR
        ===================================== */

        const tvaKey =
            (
                12 +
                3 *
                (
                    Number(siren) % 97
                )
            ) % 97;

        const vatNumber =
            `FR${tvaKey}${siren}`;

        return {

            businessName:
                entreprise.nom_complet,

            legalStatus:
                entreprise.forme_juridique,

            siret:
                entreprise.siege.siret,

            siren,

            vatNumber,

            address:
                entreprise.siege.adresse,

            city:
                entreprise.siege.libelle_commune,

            postalCode:
                entreprise.siege.code_postal,

            apeCode:
                entreprise.activite_principale,

            isActive:
                entreprise.etat_administratif ===
                "A",
        };
    };
