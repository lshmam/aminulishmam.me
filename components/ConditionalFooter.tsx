"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname === "/animation" || pathname === "/lp-5") return null;
  return <Footer />;
}
