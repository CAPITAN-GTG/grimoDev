"use client";

import { usePathname } from "next/navigation";
import NavigationSlider from "@/components/NavigationSlider";
import MobileNavbar from "@/components/MobileNavbar";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSuccessPage = pathname === "/success";

  if (isSuccessPage) {
    return <>{children}</>;
  }

  return (
    <>
      <StickyCta />
      <NavigationSlider />
      <MobileNavbar />
      {children}
      <Footer />
    </>
  );
}
