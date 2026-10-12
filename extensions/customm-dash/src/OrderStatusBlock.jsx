import { render } from "preact";
import { useState } from "preact/hooks";
import '@shopify/ui-extensions/preact';

export default async () => {
  render(<Extension />, document.body);
};

function Extension() {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReturn = async () => {
    const rawId = shopify.order.current?.id;

    if (!rawId) {
      shopify.toast.show("Order ID not found");
      return;
    }

    const orderId = rawId.startsWith("gid://")
      ? rawId
      : `gid://shopify/Order/${rawId}`;

    setLoading(true);

    try {
      const res = await fetch(
        "https://forever-animation-redhead-hotels.trycloudflare.com/apps/return-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "c4d6c3e8b3c5a54ab978a257877f196e",
          },
          body: JSON.stringify({ orderId, reason }),
        }
      );

      let data;
      try {
        data = await res.json();
      } catch {
        data = { error: "Invalid response" };
      }

      if (res.ok) {
        shopify.toast.show("Return request sent! ✅");
      } else {
        shopify.toast.show(data.error || "Failed ❌");
      }

    } catch (err) {
      console.error("DEBUG:", err);
      shopify.toast.show("Network Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <s-box padding="base" border="base" cornerRadius="base">
      <s-stack spacing="base">
        <s-text weight="bold">Request a Return</s-text>

        <s-select
          label="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        >
          <s-option value="">Select reason...</s-option>
          <s-option value="damaged">Damaged product</s-option>
          <s-option value="wrong">Wrong item</s-option>
          <s-option value="size">Size issue</s-option>
        </s-select>

        <s-button
          onClick={submitReturn}
          loading={loading}
          disabled={!reason || loading}
        >
          Submit
        </s-button>
      </s-stack>
    </s-box>
  );
}