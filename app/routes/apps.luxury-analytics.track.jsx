// import { authenticate } from "../shopify.server";

import { authenticate } from "../shopify.server";
// import { headers } from "./auth.$";

// // ==========================================
// // LOADER (Handles GET requests)
// // Fetch current count to display on demand
// // ==========================================
// export const loader = async ({ request }) => {
//   // Authenticate the incoming request via App Proxy
// //   const { admin } = await authenticate.public.appProxy(request);

// const { admin } =
// await authenticate.admin(request);

//   const url = new URL(request.url);
//   const productId = url.searchParams.get("product_id");

//   if (!productId) {
//     return Response.json(
//       { success: false, error: "Missing product_id parameter" },
//       { status: 400 }
//     );
//   }

//   const fullProductId = `gid://shopify/Product/${productId}`;

//   try {
//     const queryResponse = await admin.graphql(`
//       query getProductCount($id: ID!) {
//         product(id: $id) {
//           tags
//           metafield(namespace: "luxury_app", key: "popup_visits") {
//             value
//           }
//         }
//       }
//     `, { variables: { id: fullProductId } });

//     const queryJson = await queryResponse.json();
//     const product = queryJson.data?.product;

//     if (!product) {
//       return Response.json(
//         { success: false, error: "Product not found" },
//         { status: 404 }
//       );
//     }

//     const currentCount = product.metafield?.value ? parseInt(product.metafield.value, 10) : 0;
//     const isTracked = product.tags.includes("track-luxury");

//     return Response.json({
//       success: true,
//       count: currentCount,
//       isTracked: isTracked
//     });

//   } catch (error) {
//     console.error("Backend loader error:", error);
//     return Response.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// };

// // ==========================================
// // ACTION (Handles POST requests)
// // Increments the count when popup triggers
// // ==========================================
// export const action = async ({ request }) => {

//     console.log("TRACK ROUTE HIT");

//     // const { admin } = await authenticate.public.appProxy(request);

//     const {admin} = await authenticate.admin(request)

//   const url = new URL(request.url);
//   const productId = url.searchParams.get("product_id");

//   console.log("Product ID" , productId)

//   return Response.json({
//     success : true
//   })


//   const fullProductId = `gid://shopify/Product/${productId}`;

//   try {
//     const queryResponse = await admin.graphql(`
//       query getProductData($id: ID!) {
//         product(id: $id) {
//           tags
//           metafield(namespace: "luxury_app", key: "popup_visits") {
//             id
//             value
//           }
//         }
//       }
//     `, { variables: { id: fullProductId } });

//     const queryJson = await queryResponse.json();
//     const product = queryJson.data?.product;

//     if (!product) {
//       return Response.json(
//         { success: false, error: "Product not found" },
//         { status: 404 }
//       );
//     }

//     const targetTag = "track-luxury";
//     if (!product.tags.includes(targetTag)) {
//       return Response.json({ success: true, message: "Tracking skipped: target tag missing." });
//     }

//     const currentCount = product.metafield?.value ? parseInt(product.metafield.value, 10) : 0;
//     const newCount = currentCount + 1;

//     await admin.graphql(`
//       mutation updateProductMetafield($input: ProductInput!) {
//         productUpdate(input: $input) {
//           product {
//             id
//           }
//           userErrors {
//             field
//             message
//           }
//         }
//       }
//     `, {
//       variables: {
//         input: {
//           id: fullProductId,
//           metafields: [
//             {
//               namespace: "luxury_app",
//               key: "popup_visits",
//               type: "number_integer",
//               value: newCount.toString()
//             }
//           ]
//         }
//       }
//     });

//     return Response.json({ success: true, count: newCount });
//   } catch (error) {
//     console.error("Backend action error:", error);
//     return Response.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// };






const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const loader = async ({ request }) => {
  console.log("LOADER HIT");

  return Response.json(
    {
      success: true,
      message: "loader working",
    },
    {
      headers: corsHeaders,
    }
  );
};


export const OPTIONS = async () => {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
};

export const action = async ({ request }) => {
  console.log("================================");
  console.log("TRACK ROUTE HIT");
  console.log("URL:", request.url);
  console.log("================================");


  try {

    const {admin} = await authenticate.admin(request)

    const body = await request.json()





    const productId = body.productId;
    const customerId = body.customerId | ""
    const customerEmail = body.customerEmail | ""


    const visitorKey =
    customerId || customerEmail || "guest";

    const fullProductId = `gid://shopify/Product/${productId}`;

    console.log(fullProductId)


    // read currect meta field

    const response = await admin.graphql(`
           query ProductData($id: ID!) {
        product(id: $id) {
          metafield(
            namespace: "luxury_app"
            key: "popup_visitors"
          ) {
            value
          }
        }
      }
        ` , {
            variables:{
                id : fullProductId
            }
        })

        const json = await response.json()

        const raw =
        json.data?.prduct?.metafield?.value || "[]";

        let visitor = []

        try {
            visitor = JSON.parse(raw)
        } catch (error) {
            visitor = []
        }

        const alredyCounted = visitor.includes(visitorKey)


        if (!alredyCounted) {
            visitor.push(visitorKey);

            await admin.graphql(`
                   mutation SetMetafield(
          $metafields: [MetafieldsSetInput!]!
        ) {
          metafieldsSet(
            metafields: $metafields
          ) {
            userErrors {
              field
              message
            }
          }
        }
                ` , {
                    variables:{
                        metafields:[{
                            ownerId : fullProductId,
                            namespace : "luxury_app",
                            key : "popup_visitors",
                            type : "json" ,
                            value : JSON.stringify(visitor)
                        }
                        ]
                    }
                })
        }

           console.log(body)


        return Response.json(
            {
                success: true,
                uniqueVisitor : 123 ,
                alredyCounted : false
            },{
                headers : corsHeaders
            }
        )

  }catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }

}
