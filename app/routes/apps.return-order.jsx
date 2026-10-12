function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-api-key",
  };
}

export async function loader() {
  return new Response("Proxy Activehhh", { headers: corsHeaders() });
}

export async function action({ request }) {
  // ✅ Handle preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  // ✅ AUTH CHECK (FIRST)
  if (request.headers.get("x-api-key") !== process.env.APP_SECRET) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: corsHeaders() }
    );
  }

  try {
    const { orderId, reason } = await request.json();

const returnId = `RET-${Date.now()}`;

 const note =  `
🔄 RETURN REQUEST - ${returnId}
Date : ${new Date().toLocaleString()}
Reasone : ${reason}
`

    // ✅ Call Shopify Admin API directly
    const response = await fetch(
      `https://${process.env.SHOP}/admin/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": process.env.SHOPIFY_API_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          query: `
           mutation orderUpdate($input: OrderInput!) {
          orderUpdate(input: $input) {
            order {
              id
              note
            }
            userErrors {
              message
            }
          }
        }
          `,
          variables: {
          input : {
            id : orderId,
            note : note
          }
          },
        }),
      }
    );

    const result = await response.json();

    if (result?.data?.tagsAdd?.userErrors?.length) {
      return new Response(
        JSON.stringify({ error: result.data.tagsAdd.userErrors[0].message }),
        { status: 400, headers: corsHeaders() }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: corsHeaders() }
    );

  } catch (err) {
    console.error("ERROR:", err);

    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: corsHeaders() }
    );
  }
}