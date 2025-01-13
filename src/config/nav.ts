import { NavItem } from "@/types/nav";
import { Image, ImageDown, Layout, LayoutDashboard, Settings } from "lucide-react";

export const navItems:NavItem[]  = [
    {
        title: "ダッシュボード",
        href: "/dashboard",
        icon: LayoutDashboard
    },
    {
        title: "画像生成",
        href: "/dashboad/tools/image-generator",
        icon: Image
    },
    {
        title: "背景削除",
        href: "/dashboad/tools/remove-bg",
        icon: Layout
    },
    {
        title: "画像圧縮",
        href: "/dashboad/tools/optimize",
        icon: ImageDown
    },
    {
        title: "画像設定",
        href: "/dashboad/setting",
        icon: Settings
    },
]