import PageContainer from "@/components/dashboard/page-container";
import PageHeader from "@/components/dashboard/page-header";
import ProfileSection from "@/components/dashboard/settings/profile-section";
import SubscriptionSettingsForm from "@/components/dashboard/settings/subsctiption-settings-form";

const SettingsPage = () => {
  return (
    <PageContainer>
      <PageHeader
        title="設定"
        description="アカウントの確認とサブスクリプションの設定を管理"
      />
      {/* アカウントの確認 */}
      <div>
        <ProfileSection />
      </div>
      {/* サブスクリプション管理用のフォームボタン */}
      <div>
        <SubscriptionSettingsForm />
      </div>
    </PageContainer>
  );
};

export default SettingsPage;
