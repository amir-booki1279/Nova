"use client"


import Link from "next/link";
import { useCart } from "../cart/CartProvider";


const Header = () => {
    const  {totalItems} = useCart()
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
            <div className="bg-slate-900 px-4 py-2 text-center text-sm text-white">
                ارسال رایگان برای سفارش های بالای 5 میلیون تومان
            </div>

            <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-4">

                <Link href={"/"} className="shrink-0 text-2xl font-black text-slate-900">
                  <span className="text-orange-500">.</span> NOVA 
                </Link>

                <form  action={'/search'} method="GET"
                className="flex flex-1 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-orange-500">
                    <input 
                    type="search"
                    name="q"
                    placeholder="دنبال چه محصولی میگردی؟"
                    aria-label="جست و جوی محصولات"
                    className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-400"
                    
                    />
                    <button type="submit" aria-label="جست وجو"
                    className="shrink-0 text-slate-500 transition hover:text-orange-500">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={22}
                        height={22}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        >
                            <circle cx={11} cy={11} r={8}/>
                            <path d="m21 21-4.35-4.35"/>
                        </svg>
                    </button>
                </form>

                <div className="flex shrink-0 items-center gap-3">
                    <Link href={'/login'}
                    className="hidden rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium transition hover:border-orange-500 hover:text-orange-600 sm:block">
                        ورود | ثبت نام
                    </Link>
                    <Link href={'/cart'}
                    className="relative flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white transition hover:border-orange-600">
                         <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={21}
                        height={21}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        >
                            <circle cx={9} cy={21} r={1}/>
                            <circle cx={20} cy={21} r={1}/>

                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                        </svg>
                        <span className="hidden sm:inline ">سبد خرید</span>
                        {totalItems > 0 &&(
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 px-1 text-xs font-bold text-white">
                                {totalItems.toLocaleString("fa-IR")}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            <nav aria-label="دسته بندی های اصلی"
            className="border-t border-slate-100">
                <div className="mx-auto flex max-w-7xl items-center gap-7 overflow-x-auto px-4 py-3 text-sm font-medium whitespace-nowrap">
                    <Link href={'/products'}
                    className="text-slate-700 transition hover:text-orange-500">
                            همه محصولات
                    </Link>

                    <Link href={'/categories/electronics'}
                    className="text-slate-700 transition hover:text-orange-500">
                           کالای دیجیتال
                    </Link>

                    <Link href={'/categories/fashion'}
                    className="text-slate-700 transition hover:text-orange-500">
                           مد و پوشاک
                    </Link>

                    <Link href={'/categories/home'}
                    className="text-slate-700 transition hover:text-orange-500">
                           خانه و آشپزخانه
                    </Link>

                    <Link href={'/categories/sports'}
                    className="text-slate-700 transition hover:text-orange-500">
                           ورزش و سفر
                    </Link>

                    <Link href={'/offers'}
                    className="text-orange-500 transition hover:text-orange-600 font-bold">
                           پیشنهاد های ویژه
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;