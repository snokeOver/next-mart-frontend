import Category from "@/components/modules/home/category";
import FeaturedProducts from "@/components/modules/home/featuredProduct";
import FlashSale from "@/components/modules/home/flashSale";
import HeroSection from "@/components/modules/home/heroSection";
import { getAccessToken } from "@/services/auth/getAccessToken";

import React from "react";

const HomePage = async () => {
  const resutl = await getAccessToken();
  console.log(resutl);
  return (
    <div>
      <HeroSection />
      <Category />
      <FeaturedProducts />
      <FlashSale />
    </div>
  );
};

export default HomePage;
