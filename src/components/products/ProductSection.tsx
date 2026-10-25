import { products } from "@/lib/product";
import Link from "next/link";
import ProductCard from "./ProductCard";


function ProductSection() {
    return (
        <section className="py-16">
            <div className="flex mb-8 items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-bold to-orange-500">
                            انتخاب های ویژه
                        </p>
                        <h2 className="mt-2 text-2xl fill-black text-slate-900 sm:text-3xl">
                            محصولات پرفروش
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-slate-500">
                            محصولاتی که اررزش خرید دارند
                        </p>
                    </div>

                    <Link href='/products' className="shrink-0 text-sm font-bold text-orange-600 transition hover:text-orange-700">
                        مشاهده همه
                        <span className="mr-2" aria-hidden="true">
                            {"<-"}
                        </span>
                    </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {products.map((product)=>(
                        <ProductCard product={product} key={product.id} />
                    ))}
            </div>
        </section>
    );
}

export default ProductSection;