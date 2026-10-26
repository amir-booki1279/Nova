import type { Metadata } from "next";
import {Vazirmatn} from  'next/font/google'
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";

const vazirmatn = Vazirmatn({
  subsets :["arabic"],
  display:"swap"
})



export const metadata: Metadata = {
  title: "نوا | فروشگاه آنلاین",
  description: "تجربه ای  متفاوت از خرید آنلاین",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa" dir="rtl">
      <body className={vazirmatn.className}>
        <CartProvider> {children} </CartProvider>
      </body>
    </html>
  );
}
