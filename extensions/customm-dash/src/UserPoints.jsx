import { render } from "preact";
import { useEffect, useState } from "preact/hooks";
import "@shopify/ui-extensions/preact";

export default async () => {
  render(<Extension />, document.body);
};

function Extension() {
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPoints();
  }, []);

  const fetchPoints = async () => {
    try {
      setLoading(true);

      const email = "itaphrodit@gmail.com";

      const res = await fetch(
        `https://regina-cycadlike-senatorially.ngrok-free.dev/api/loyalty/points?email=${encodeURIComponent(email)}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      const data = await res.json();

      setPoints(data.totalpoints || 0);

    } catch (error) {
      console.log(error);
      shopify.toast.show("Failed to load points");
    } finally {
      setLoading(false);
    }
  };

  const target = 1800;
  const progress = Math.min((points / target) * 100, 100);

  return (
    <s-box padding="base">
      {/* MAIN CARD */}
      <s-box
        border="base"
        padding="loose"
      >
        <s-stack spacing="loose">

          {/* HEADER */}
          <s-grid columns={["70%", "30%"]}>

            {/* LEFT */}
            <s-stack spacing="tight">

              <s-text appearance="subdued">
                PATH TO ASCENSION
              </s-text>

              <s-text emphasis="bold">
                Infinite Circle
              </s-text>

              <s-text appearance="subdued">
                NEXT SOVEREIGN EVOLUTION
              </s-text>

            </s-stack>

            {/* RIGHT */}
            <s-stack spacing="tight">

              <s-text emphasis="bold">
                {loading ? "..." : `${Math.round(progress)}%`}
              </s-text>

              <s-text appearance="subdued">
                TO MILESTONE
              </s-text>

            </s-stack>

          </s-grid>

          {/* PROGRESS BAR */}
          <s-box border="base">

            <s-box
              background="subdued"
              minBlockSize="6px"
              inlineSize={`${progress}%`}
            />

          </s-box>

          {/* BENEFITS */}
          <s-grid columns={["50%", "50%"]}>

            {/* BENEFIT 1 */}
            <s-box
              border="base"
              padding="base"
            >

              <s-stack spacing="tight">

                <s-text emphasis="bold">
                  ✦ WHITE-GLOVE
                </s-text>

                <s-text appearance="subdued">
                  Dedicated archival specialist for all Maison acquisitions.
                </s-text>

              </s-stack>

            </s-box>

            {/* BENEFIT 2 */}
            <s-box
              border="base"
              padding="base"
            >

              <s-stack spacing="tight">

                <s-text emphasis="bold">
                  ◎ UNCHARTED ACCESS
                </s-text>

                <s-text appearance="subdued">
                  Priority entry to the Shadow Atelier previews.
                </s-text>

              </s-stack>

            </s-box>

          </s-grid>

          {/* FOOTER */}
          <s-box
            border="base"
            padding="base"
          >

            <s-stack spacing="tight">

              <s-text appearance="subdued">
                CURRENT BALANCE
              </s-text>

              <s-text emphasis="bold">
                {loading ? "Loading..." : `${points} Points`}
              </s-text>

              <s-button onClick={fetchPoints}>
                Refresh
              </s-button>

            </s-stack>

          </s-box>

        </s-stack>

      </s-box>

    </s-box>
  );
}