import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/Cartproduct";
import Coupon from "@/components/modules/cart/Coupon";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import ProductBanner from "@/components/modules/product/banner";
import CustomContainer from "@/components/ui/customContainer";

const CartPage = () => {
  return (
    <CustomContainer>
      <ProductBanner title="Cart Page" path="Home - Cart" />
      <div className="grid grid-cols-12 gap-8 my-5">
        <CartProducts />
        <Coupon />
        <Address />
        <PaymentDetails />
      </div>
    </CustomContainer>
  );
};

export default CartPage;
