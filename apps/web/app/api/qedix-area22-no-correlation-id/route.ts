async function runImportJob() {
  return { imported: 10 };
}

export async function POST() {
  try {
    const result = await runImportJob();

    console.log("import completed");

    return Response.json({
      ok: true,
      imported: result.imported,
    });
  } catch (_error) {
    console.error("import failed");

    return Response.json(
      { error: "Import failed" },
      { status: 500 }
    );
  }
}
