import AllProducts from "@/components/modules/product";
import ProductBanner from "@/components/modules/product/banner";
import CategoryCard from "@/components/ui/core/CategoryCard";
import CustomContainer from "@/components/ui/customContainer";
import { getAllCategories } from "@/services/category/createCategory";
import { getAllProducts } from "@/services/product";
import { ICategory, ISearchParams } from "@/types";

const ProductPage = async ({ searchParams }: ISearchParams) => {
  const query = await searchParams;

  const { data: categories } = await getAllCategories();
  const { data: products } = await getAllProducts(undefined, undefined, query);

  return (
    <CustomContainer>
      <ProductBanner title="All Products" path="Home - Products" />
      <h2 className="text-xl font-bold my-5">Featured Collection</h2>
      <div className="grid grid-cols-6 gap-6">
        {categories?.slice(0, 6).map((category: ICategory, idx: number) => (
          <CategoryCard key={idx} category={category} />
        ))}
      </div>
      <AllProducts products={products} />
    </CustomContainer>
  );
};

export default ProductPage;
