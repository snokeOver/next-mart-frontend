import ManageCatgory from "@/components/modules/shop/category";
import { getAllCategories } from "@/services/category/createCategory";

const ProductCategoryPage = async () => {
  const { data } = await getAllCategories();
  return (
    <div>
      <ManageCatgory categories={data} />
    </div>
  );
};

export default ProductCategoryPage;
