import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import DashboadNav from "./nav";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant={"ghost"}
          className="mr-2 px-0 text-base hover:bg-transparent md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">メニューを開く</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="pl-1 pr-0">
        <SheetHeader className="py-3 text-left px-10">
          <SheetTitle>メニュー</SheetTitle>
          <SheetDescription>
            <div className="px-7">
              <DashboadNav />
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNav;