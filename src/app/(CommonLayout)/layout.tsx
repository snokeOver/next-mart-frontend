import Navbar from "@/components/shared/Navbar";
import { IChildren } from "../../types";
import Footer from "@/components/shared/Footer";

const CommonLayout = ({ children }: IChildren) => {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)]">{children}</div>
      <Footer />
    </>
  );
};

export default CommonLayout;
