import { Button } from "@/components/ui/button";
import { plans } from "@/config/plans";
import { Check, Sparkle } from "lucide-react";
import { features } from "process";

const Plan = () => {
  return (
    <div className="container py-8 mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold">料金プラン</h1>
        <p className="mt-4 text-muted-foreground text-lg">
          あなたのニーズに合わせて最適なプランを選んでください。
        </p>

        <div className="grid lg:grid-col-3 gap-8 md:grid-col-1 mx-auto max-x-7xl">
          {plans.map((plan) => {
            //Iconを取り出す処理
            const Icon = plan.icon;

            return (
              <div
                key={plan.name}
                className="border rounded-xl bg-card p-8 shadow-sm flex flex-col"
              >
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Icon className="size-6 text-primary" />
                      <h2 className="text-2xl font-bold">{plan.name}</h2>
                    </div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>
                  <div className="flex items-end">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="ml-2 text-muted-foreground">/月</span>
                  </div>
                  <ul className="space-y-4 text-sm">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="size-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <form>
                  <Button
                    className="w-full mt-8"
                    size={"lg"}
                    variant={"outline"}
                    type="submit"
                  >
                    {plan.buttonText}
                  </Button>
                </form>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Plan;
