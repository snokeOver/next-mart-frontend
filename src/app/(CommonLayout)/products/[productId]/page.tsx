import ProductBanner from "@/components/modules/product/banner";
import ProductDetails from "@/components/modules/product/productDetails";
import CustomContainer from "@/components/ui/customContainer";
import { getSingleProduct } from "@/services/product";
import React from "react";

interface ProductDetailsPageProps {
  params: Promise<{ productId: string }>;
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { productId } = await params;

  const { data: product } = await getSingleProduct(productId);

  return (
    <CustomContainer>
      <ProductBanner
        title="Product Details"
        path="Home - Products - Product Details"
      />
      <ProductDetails product={product} />
    </CustomContainer>
  );
};

export default ProductDetailsPage;
