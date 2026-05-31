import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank you — Grimo Dev",
  description: "Your message was received.",
  robots: { index: false, follow: false },
};

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
