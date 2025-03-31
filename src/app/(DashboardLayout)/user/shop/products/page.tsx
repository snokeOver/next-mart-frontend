import ManageProducts from "@/components/modules/shop/products";
import { getAllProducts } from "@/services/product";
import { ISearchParams } from "@/types";

const ManageProductsPage = async ({ searchParams }: ISearchParams) => {
  const { page = "1" } = await searchParams;

  const { data, meta } = await getAllProducts(page);
  return (
    <div>
      <ManageProducts products={data} meta={meta} />
    </div>
  );
};

export default ManageProductsPage;
