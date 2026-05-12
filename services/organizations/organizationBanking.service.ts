import Company
from "@/models/company.model";

import { encrypt }
from "@/lib/crypto";



type SaveBankingInput = {

  companyId: string;

  accountHolder: string;

  bankName?: string;

  iban: string;

  bic: string;
};

export async function saveBankingService(
  data: SaveBankingInput
) {

  if (!isValidIBAN(data.iban)) {

    throw new Error(
      "IBAN invalide"
    );
  }

  const ibanEncrypted =
    encrypt(data.iban);

  const ibanLast4 =
    data.iban.slice(-4);

  await Company.findByIdAndUpdate(
    data.companyId,
    {
      banking: {

        accountHolder:
          data.accountHolder,

        bankName:
          data.bankName,

        ibanEncrypted,

        ibanLast4,

        bic:
          data.bic,
      },
    }
  );
}