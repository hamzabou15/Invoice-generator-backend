import { NextResponse }
from "next/server";

import { bankingSchema }
from "@/validators/banking.validator";

import { saveBankingService }
from "@/services/company/banking.service";

export async function saveBankingController(
  req: Request
) {

  try {

    const body =
      await req.json();

    const parsed =
      bankingSchema.safeParse(body);

    if (!parsed.success) {

      return NextResponse.json({
        error: "Invalid fields",
        details:
          parsed.error.flatten(),
      }, {
        status: 400,
      });
    }

    await saveBankingService(
      parsed.data
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      error: "Server error",
    }, {
      status: 500,
    });
  }
}