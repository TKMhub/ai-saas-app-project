import Link from "next/link";
import { Button } from "../ui/button";
import { navItems } from "@/config/nav";

const DashboadNav = () => {
  return (
    <nav className="grid gap-2 items-startzz1">
      {navItems.map((item) => (
        <Button key={item.href}>
          <Link href={item.href}>{item.title}</Link>
        </Button>
      ))}
    </nav>
  );
};

export default DashboadNav;
