import { Product } from "@/types/products"
import Link from "next/link";


type ProductCardProps = {
    product : Product
}



const ProductCard = ({product}:ProductCardProps) => {

    const discountedPrice = Math.round(product.price * (1 - product.discountPercentage / 100))
    const formattedPrice= (price:number)=> new Intl.NumberFormat("fa-IR").format(price)

    return (
        <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-slate-200/50">
            <Link href={`/products/${product.slug}`}
            className="relative block overflow-hidden bg-slate-50">
                <div className="flex aspect-square items-center justify-center">
                        <div className="text-center">
                                <span className="text-5xl text-slate-300">
                                    ✦
                                </span>
                                <p className="mt-3 text-xs text-slate-400">
                                    تصویر محصول
                                </p>
                        </div>
                </div>
            </Link>
        </article>
    );
};

export default ProductCard;