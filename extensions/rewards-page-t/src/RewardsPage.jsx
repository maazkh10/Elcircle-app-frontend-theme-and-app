// @ts-nocheck
import "@shopify/ui-extensions/preact";
import { render } from "preact";
import { useState } from "preact/hooks";
import { 
  StatCard, 
  OwnedRewardCard, 
  RedeemableCard, 
  VipTierCard 
} from "./components/RewardComponents.jsx";

export default async () => {
  render(<RewardsPage />, document.body);
};

function RewardsPage() {
  const [points] = useState("400");

  return (
    <s-box padding="large" background="surfaceSecondary">
      <s-stack gap="loose">
        
        {/* HERO SECTION */}
        <s-grid gridTemplateColumns={["2fr", "1fr"]} spacing="loose">
          <s-box background="surfacePrimary" cornerRadius="base" padding="extraLoose" border="base">
            <s-stack gap="base">
              <s-text emphasis="bold" size="extraLarge">Care rewards</s-text>
              <s-text appearance="subdued">Earn Care Coins on every order. Redeem for discounts on future purchases.</s-text>
              <s-image src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200" aspectRatio={16 / 7} cornerRadius="base" />
            </s-stack>
          </s-box>

          <s-stack gap="base">
            <StatCard title="Care Coins Balance" value={`${points} Care Coins`} subtext="Use before April 29, 2027" icon="💰" />
            <StatCard title="Current VIP tier" value="Sparkle" subtext="To achieve Glow, spend $500 more." icon="⭐" progress={0} progressLabel="$0 / $500" />
          </s-stack>
        </s-grid>

        {/* YOUR REWARDS */}
        <s-stack gap="base">
          <s-text emphasis="bold" size="large">Your rewards</s-text>
          <s-grid gridTemplateColumns={["1fr", "1fr"]} spacing="base">
            <OwnedRewardCard title="10% off coupon" code="5527a7410390" icon="🏷️" />
            <OwnedRewardCard title="$5 off coupon" code="9c73fbf8d876" icon="🎫" />
          </s-grid>
        </s-stack>

        {/* SPEND SECTION */}
        <s-stack gap="base">
          <s-text emphasis="bold" size="large">Spend Care Coins</s-text>
          <s-grid gridTemplateColumns={["1fr", "1fr", "1fr"]} spacing="base">
            <RedeemableCard title="10% off coupon" cost="100 Care Coins" progress={100} canRedeem icon="🏷️" />
            <RedeemableCard title="$5 off coupon" cost="500 Care Coins" progress={80} icon="🎫" />
            <RedeemableCard title="$5 off coupon (subscription)" cost="500 Care Coins" progress={80} icon="💳" />
          </s-grid>
        </s-stack>

        {/* VIP SECTION */}
        <s-stack gap="base">
          <s-text emphasis="bold" size="large">VIP rewards & perks</s-text>
          <s-grid gridTemplateColumns={["1fr", "1fr", "1fr"]} spacing="base">
            <VipTierCard title="Sparkle" status="Active" validUntil="December 31, 2027" rewards={["$5 off coupon"]} perks={["Birthday - 200 Care Coins"]} icon="⭐" />
            <VipTierCard title="Glow" rewards={["1000 Care Coins"]} perks={["Early access to sales"]} icon="✨" />
            <VipTierCard title="Shine" rewards={["Free shipping", "2000 Care Coins"]} perks={["Free Demos", "Consultation"]} icon="🌟" />
          </s-grid>
        </s-stack>

      </s-stack>
    </s-box>
  );
}