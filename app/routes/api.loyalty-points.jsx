import { unauthenticated } from "../shopify.server";

export const loader = async ({ request }) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, ngrok-skip-browser-warning",
  };

  // HANDLE OPTIONS
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    console.log("⭐ API HIT");

    const url = new URL(request.url);

    const customerId =
      url.searchParams.get("customerId");

    let shop =
      url.searchParams.get("shop");

    console.log("RAW SHOP:", shop);

    if (!customerId || !shop) {
      throw new Error("Missing customerId or shop");
    }

    // CLEAN SHOP DOMAIN
    shop = shop
      .replace("https://", "")
      .replace("http://", "")
      .replace("/", "");

    console.log("CLEAN SHOP:", shop);

    // SHOPIFY ADMIN
    const { admin } =
      await unauthenticated.admin(shop);

    // CONVERT CUSTOMER ID TO GID
    const gid = customerId.startsWith("gid://")
      ? customerId
      : `gid://shopify/Customer/${customerId}`;

    console.log("CUSTOMER GID:", gid);

    // GET CUSTOMER EMAIL
    const shopifyResponse = await admin.graphql(
      `#graphql
      query getCustomer($id: ID!) {
        customer(id: $id) {
          email
        }
      }
      `,
      {
        variables: {
          id: gid,
        },
      }
    );

    const resJson =
      await shopifyResponse.json();

    console.log(
      "SHOPIFY RESPONSE:",
      JSON.stringify(resJson, null, 2)
    );

    const email =
      resJson?.data?.customer?.email;

    console.log("EMAIL:", email);

    if (!email) {
      return new Response(
        JSON.stringify({
          success: true,
          points: 0,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    const cleanEmail =
      email.toLowerCase().trim();

    console.log("CLEAN EMAIL:", cleanEmail);

    // YOUR MONGODB / LOYALTY API
    const dbRes = await fetch(
      `https://regina-cycadlike-senatorially.ngrok-free.dev/api/loyalty/points?email=${encodeURIComponent(cleanEmail)}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

    console.log("DB STATUS:", dbRes.status);

    const dbText = await dbRes.text();

    console.log("DB RAW:", dbText);

    let dbData = {};

    try {
      dbData = JSON.parse(dbText);
    } catch (e) {
      console.error("DB JSON ERROR:", e);
    }

    console.log("DB DATA:", dbData);

    const finalPoints =
      dbData?.totalpoints ??
      dbData?.points ??
      0;

    console.log("FINAL POINTS:", finalPoints);

    return new Response(
      JSON.stringify({
        success: true,
        points: finalPoints,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (err) {
    console.error("FULL BACKEND ERROR:", err);

    return new Response(
      JSON.stringify({
        success: false,
        error: err.message,
        points: 0,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
};