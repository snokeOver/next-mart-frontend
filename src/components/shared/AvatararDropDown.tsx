"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { logOut } from "@/services/auth/logOut";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { privateRoutes } from "@/constants/privateRoutes";

export function AvatarDropDown() {
  const { setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = async () => {
    await logOut();
    setIsLoading(true);
    if (privateRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Dashboard</DropdownMenuItem>
        <DropdownMenuItem>Shop</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => handleLogOut()}
        >
          <LogOut /> Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
