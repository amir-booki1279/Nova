import CategorySection from "@/components/categories/CategorySection";
import Header from "@/components/layout/Header";
import ProductSection from "@/components/products/ProductSection";
import Link from "next/link";


export default function Home() {
  return (
   
      <>
      <Header/>
      <main className="mx-auto max-w-7xl px-4 py-16">
         <section className="rounded-3xl bg-slate-900 px-6 py-16 text-white sm:px-12 sm:py-24">
          <span className="inline-block rounded-full bg-orange-500/15 px-4 py-2
          text-sm font-medium text-orange-400">
                دنیایی از انتخاب های هوشمندانه
          </span>
          <h1 className="mt-6 text-3xl leading-relaxed font-black sm:text-5xl">
              خرید متفاوت ِ 
            <br/>
            انتخاب هوشمندانه
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-8 text-slate-300 sm:text-base">
                جدیدترین محصولات را کشف کن.قیمت ها را مقایسه کن و با اطمینان خرید کن
          </p>

          <Link href='/prodcuts' className="mt-8 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600">
             مشاهده محصولات
          </Link>
         </section>

          <ProductSection/>
          <CategorySection/>

      </main>
      </>
  )
}
