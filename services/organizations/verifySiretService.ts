export const verifySiretService =
    async (siret: string) => {

        const cleanSiret =
            siret.replace(/\s/g, "");

        // FREE API TO GET SIRET OF COMPANY
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

        return {
            companyName:
                entreprise.nom_complet,

            legalStatus:
                entreprise.forme_juridique,

            siret:
                entreprise.siege.siret,

            siren:
                entreprise.siren,

            address:
                entreprise.siege.adresse,

            city:
                entreprise.siege.libelle_commune,

            postalCode:
                entreprise.siege.code_postal,

            activity:
                entreprise.activite_principale,

            isActive:
                entreprise.etat_administratif ===
                "A",
        };
    };