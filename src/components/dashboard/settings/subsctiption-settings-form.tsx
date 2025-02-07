"use client";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";

interface SettingsFormProps {
  user: User;
}

const SubscriptionSettingsForm = ({ user }: SettingsFormProps) => {
  const handleManageSubscription = async () => {};

  return (
    <div className="grid gap-4 p-4 border-2 rounded-lg">
      <div className="grid gap-2">
        {user?.subscriptionStatus !== "FREE" ? (
          <>
            <p className="text-sm text-muted-foreground">
              現在のサブスクリプションを管理します。
            </p>
            <Button onClick={handleManageSubscription}>
              サブスクリプション管理
            </Button>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              サブスクリプションに登録していません。
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SubscriptionSettingsForm;
