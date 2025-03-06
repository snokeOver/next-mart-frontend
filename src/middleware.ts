import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/auth/getCurrentUser";
const authRoutes = ["/login", "/register"];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  console.log("pathname:", pathname);
  const userInfo = await getCurrentUser();
  if (!userInfo) {
    if (authRoutes.includes(pathname)) return NextResponse.next();
    else
      return NextResponse.redirect(
        new URL(
          `${process.env.BASE_URL}/login?redirect=${pathname}`,
          request.url
        )
      );
  }

  console.log("hello middle");
};

export const config = {
  matcher: ["/login", "/create-shop"],
};
