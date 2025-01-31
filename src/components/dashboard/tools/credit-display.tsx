import { getUserCredits } from "@/lib/credits";

const Creditdisplay = async () => {
  const credits = await getUserCredits();
  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="text-sm font-medium text-muted-foreground">
        残りクレジット
      </div>
      <div className="mt-2 font-bold1">{credits}コイン</div>
    </div>
  );
};

export default Creditdisplay;
