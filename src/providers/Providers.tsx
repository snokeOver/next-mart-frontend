"use client";
import UserProvider from "@/context/UserContext";
import { IChildren } from "@/types";
import React from "react";
import StoreProvider from "./StoreProvider";

const Providers = ({ children }: IChildren) => {
  return (
    <UserProvider>
      <StoreProvider>{children}</StoreProvider>
    </UserProvider>
  );
};

export default Providers;
