"use client";
import Logo from "@/assets/svg/Logo";
import { Button } from "../ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { AvatarDropDown } from "./AvatararDropDown";
import { useUser } from "@/context/UserContext";

export default function Navbar() {
  const { user } = useUser();

  return (
    <header className="border-b bg-background w-full sticky top-0 z-10">
      <div className="container flex justify-between items-center mx-auto h-16 px-3">
        <Link href="/">
          <h1 className="text-2xl font-black flex items-center">
            <Logo />
            Next Mart
          </h1>
        </Link>
        <div className="max-w-md  flex-grow">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full max-w-6xl border border-gray-300 rounded-full py-2 px-5"
          />
        </div>
        <nav className="flex gap-2">
          <Button variant="outline" className="rounded-full p-0 size-10">
            <Heart />
          </Button>
          <Link href="/cart">
            <Button variant="outline" className="rounded-full p-0 size-10">
              <ShoppingBag />
            </Button>
          </Link>

          <Link href={"/create-shop"}>
            <Button className="rounded-full">Create Shop</Button>
          </Link>
          {user ? (
            <AvatarDropDown />
          ) : (
            <Link href={"/login"}>
              <Button variant="outline" className="rounded-full">
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
