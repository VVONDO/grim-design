import type { Metadata } from "next";
import { CheckoutDemo } from "./CheckoutDemo";

export const metadata: Metadata = {
  title: "Checkout (demo)",
  description: "Demo checkout for the GRIM prototype. No payment is taken.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  return <CheckoutDemo />;
}
