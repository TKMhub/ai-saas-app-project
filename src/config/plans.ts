import { Crown, Rocket, Sparkles } from "lucide-react";
import { features } from "process";

export const plans = [
  {
    name: "Starter",
    icon: Sparkles,
    price: "¥1,000",
    description: "個人利用に最適なエントリープラン",
    features: ["月50クレジット付与", "基本的な画像生成", "メールサポート"],
    buttonText: "Starterプランを選択",
    priceId: "price_xxx",
  },
  {
    name: "Pro",
    icon: Rocket,
    price: "¥2,000",
    description: "プロフェショナルな制作に有効なプラン",
    features: ["月100クレジット付与", "優先サポート", "商用利用可能"],
    buttonText: "Proプランを選択",
    priceId: "price_xxx",
  },
  {
    name: "Enterprise",
    icon: Crown,
    price: "¥5,000",
    description: "ビジネス向けの完全なソリューションプラン",
    features: ["月300クレジット付与", "24時間優先サポート", "カスタマイズ可能"],
    buttonText: "Enterpriseプランを選択",
    priceId: "price_xxx",
  },
];
