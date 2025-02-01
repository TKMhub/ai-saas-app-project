import Link from "next/link";
import { Button } from "../ui/button";
import { navItems } from "@/config/nav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import AuthButton from "../auth/auth-button";
import Creditdisplay from "./tools/credit-display";
import NavItems from "./nav-items";

const DashboadNav = () => {
  return (
    <nav className="grid gap-2 items-startzz1">
      <NavItems />

      <div className="my-4 px-4 md:hidden">
        <AuthButton />
      </div>
      <div className="p-4">
        <Creditdisplay />
        <Button className="w-full mt-4" variant={"premium"}>
          <Link href={"/dashboard/plan"}>アップグレード</Link>
        </Button>
      </div>
    </nav>
  );
};

export default DashboadNav;
