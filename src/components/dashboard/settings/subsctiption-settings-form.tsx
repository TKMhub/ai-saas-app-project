"use client";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";

interface SettingsFormProps {
  user: User;
}

const SubscriptionSettingsForm = ({ user }: SettingsFormProps) => {
  const handleManageSubscription = async () => {};

  return (
    <div>
      <div>
        {user?.subscriptionStatus !== "FREE" ? (
          <>
            <p>現在のサブスクリプションを管理します。</p>
            <Button onClick={handleManageSubscription}>
              サブスクリプション管理
            </Button>
          </>
        ) : (
          <>
            <p>サブスクリプションに登録していません。</p>
          </>
        )}
      </div>
    </div>
  );
};

export default SubscriptionSettingsForm;
