import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const MAINTENANCE_ENABLED = process.env.MAINTENANCE_MODE === "true";

const ALLOWED_PATHS = ["/maintenance", "/favicon.ico", "/robots.txt"];

const isAllowedPath = (pathname: string) => {
  if (ALLOWED_PATHS.includes(pathname)) {
    return true;
  }

  if (pathname.startsWith("/_next")) {
    return true;
  }

  if (pathname.startsWith("/api")) {
    return true;
  }

  if (pathname.startsWith("/public")) {
    return true;
  }

  if (pathname.match(/\.(?:png|jpg|jpeg|gif|svg|webp|ico|txt|json)$/)) {
    return true;
  }

  return false;
};

export function middleware(request: NextRequest) {
  if (!MAINTENANCE_ENABLED) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (isAllowedPath(pathname)) {
    return NextResponse.next();
  }

  const maintenanceUrl = request.nextUrl.clone();
  maintenanceUrl.pathname = "/maintenance";

  return NextResponse.rewrite(maintenanceUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
