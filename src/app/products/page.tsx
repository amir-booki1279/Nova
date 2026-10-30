import ProductFilters from "@/components/products/ProductsFilters";
import { getProducts } from "@/lib/db-products";



export default async function ProductsPage() {
  
  
  const products = await getProducts();
 
  

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          همه محصولات
        </h1>

        <p className="mt-3 text-slate-500">
          محصولات فروشگاه نوا رو بررسی کن و محصول موردنظرت رو پیدا کن.
        </p>
      </div>

      <ProductFilters products={products} />
    </main>
  );
}