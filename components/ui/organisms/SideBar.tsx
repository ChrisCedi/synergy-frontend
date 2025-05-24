"use client";
import { Home, User, FactoryIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { TypographyH3 } from "../atoms/TypographyH3";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const items = [
  {
    title: "Balances",
    url: "/balances",
    icon: Home,
  },
  {
    title: "Empresas",
    url: "/companies",
    icon: FactoryIcon,
  },
];

export function SideBar() {
  const pathname = usePathname();
  return (
    <Sidebar className="p-4">
      <SidebarHeader className="bg-white">
        <div className="flex">
          <Image
            src="/synergy-logo.svg"
            height={35}
            width={35}
            alt="synergy logo"
          />
          <TypographyH3 className="pl-2">Synergy</TypographyH3>
        </div>
        <p>Bienvenido, usuario</p>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={`${
                    pathname.startsWith(item.url)
                      ? "border-primary border-2 "
                      : null
                  } rounded-md`}
                >
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span
                        className={`${pathname == item.url && "font-bold"}`}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
