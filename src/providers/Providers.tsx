"use client";
import UserProvider from "@/context/UserContext";
import { IChildren } from "@/types";
import React from "react";

const Providers = ({ children }: IChildren) => {
  return <UserProvider>{children}</UserProvider>;
};

export default Providers;
