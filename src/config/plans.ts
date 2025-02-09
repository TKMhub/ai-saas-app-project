import { Crown, Rocket, Sparkles } from "lucide-react";
import { features } from "process";

export const STRIPE_PLANS = {
  STATER: "prod_RhIAKoVRviPYMs",
  PRO: "prod_RhIB7wyBIKcGRj",
  ENTERPRISE: "prod_RhIBJcQ1pm1QAY",
};
export const plans = [
  {
    name: "Starter",
    icon: Sparkles,
    price: "¥1,000",
    description: "個人利用に最適なエントリープラン",
    features: ["月50クレジット付与", "基本的な画像生成", "メールサポート"],
    buttonText: "Starterプランを選択",
    priceId: STRIPE_PLANS.STATER,
  },
  {
    name: "Pro",
    icon: Rocket,
    price: "¥2,000",
    description: "プロフェショナルな制作に有効なプラン",
    features: ["月100クレジット付与", "優先サポート", "商用利用可能"],
    buttonText: "Proプランを選択",
    popular: true,
    priceId: STRIPE_PLANS.PRO,
  },
  {
    name: "Enterprise",
    icon: Crown,
    price: "¥5,000",
    description: "ビジネス向けの完全なソリューションプラン",
    features: ["月300クレジット付与", "24時間優先サポート", "カスタマイズ可能"],
    buttonText: "Enterpriseプランを選択",
    priceId: STRIPE_PLANS.ENTERPRISE,
  },
];
