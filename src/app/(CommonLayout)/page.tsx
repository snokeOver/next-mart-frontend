"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

import React from "react";

const HomePage = () => {
  const { user } = useUser();

  // console.log(user);
  return (
    <div>
      Home page
      <Button> hello n-mart</Button>
    </div>
  );
};

export default HomePage;
