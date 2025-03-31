"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// get all products
export const getAllProducts = async (
  page?: string,
  limit?: string,
  query?: Record<string, unknown>
) => {
  const params = new URLSearchParams();

  if (query?.price) {
    params.append("minPrice", "0");
    params.append("maxPrice", query.price.toString());
  }

  if (query?.category) {
    params.append("categories", query.category.toString());
  }
  if (query?.brand) {
    params.append("brands", query.brand.toString());
  }

  try {
    const url = `${
      process.env.NEXT_PUBLIC_BASE_API
    }/product?page=${page}&limit=${limit}&${params.toString()}`;

    const res = await fetch(url, {
      next: {
        tags: ["PRODUCT"],
      },
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return new Error(error.message);
  }
};

// get single product
export const getSingleProduct = async (productId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
      {
        next: {
          tags: ["PRODUCT"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// add product
export const addProduct = async (productData: FormData): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
      method: "POST",
      body: productData,
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("PRODUCT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// update product
export const updateProduct = async (
  productData: FormData,
  productId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
      {
        method: "PATCH",
        body: productData,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("PRODUCT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
