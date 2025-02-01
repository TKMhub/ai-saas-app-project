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
              //動的TailwindCSS
              <div
                key={plan.name}
                className={`border rounded-xl bg-card p-8 shadow-sm flex flex-col ${
                  plan.popular ? "ring-2 ring-primary scale-105" : ""
                }`}
              >
                <div className="space-y-6 flex-1">
                  <div className="space-y-4">
                    {plan.popular && (
                      <div className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary w-fit">
                        人気プラン
                      </div>
                    )}
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
                    variant={plan.popular ? "default" : "outline"}
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
