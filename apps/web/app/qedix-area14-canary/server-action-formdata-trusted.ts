"use server";

const prisma = {
  invoice: {
    update: async (_args: unknown) => ({ id: "invoice_1", amount: 100 }),
  },
};

async function requireAuth() {
  return { user: { id: "user_1" } };
}

export async function updateInvoiceTrustingFormData(formData: FormData) {
  const session = await requireAuth();

  const invoiceId = String(formData.get("invoiceId"));
  const amount = Number(formData.get("amount"));

  await prisma.invoice.update({
    where: {
      id: invoiceId,
      userId: session.user.id,
    },
    data: {
      amount,
    },
  });

  return { ok: true };
}
