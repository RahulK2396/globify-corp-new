export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(
      "https://rgxqmdkhwkrlcswhzaco.supabase.co/functions/v1/send-lead-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Lead API error:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}