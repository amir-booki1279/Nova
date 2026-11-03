import z from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "نام باید حداقل 2 کاراکتر باشد"),
  email: z.string().trim().email("ایمیل معتبر نیست"),
  password: z.string().min(8, "رمز عبور حداقل 8 کاراکتر باشد"),
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("ایمیل معتبر نیست"),
  password: z.string().min(1, "رمز عبور حداقل 1 کاراکتر باشد"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, "نام باید حداقل 2 کاراکتر باشد")
  .max(100,'نام نمیتواند بیشتر از 100 کاراکتر باشد'),
 
});
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;



export const addressSchema = z.object({
  title: z.string().trim().min(2, "عنوان آدرس باید حداقل ۲ کاراکتر باشد"),
  recipient: z.string().trim().min(3, "نام گیرنده معتبر نیست"),
  phone: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, "شماره موبایل باید ۱۱ رقم و با 09 شروع شود"),
  province: z.string().trim().min(2, "استان را وارد کنید"),
  city: z.string().trim().min(2, "شهر را وارد کنید"),
  address: z.string().trim().min(10, "آدرس باید حداقل ۱۰ کاراکتر باشد"),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد"),
  isDefault: z.boolean(),
});
export type AddressInput = z.infer<typeof addressSchema>;


export const createProductSchema = z.object({
  name: z.string().trim().min(2, "نام محصول باید حداقل ۲ حرف باشد"),
  slug: z
    .string()
    .trim()
    .min(2, "شناسه محصول باید حداقل ۲ حرف باشد")
    .regex(/^[a-z0-9-]+$/, "شناسه فقط می‌تواند شامل حروف انگلیسی کوچک، عدد و خط تیره باشد"),
  description: z.string().trim().min(10, "توضیحات باید حداقل ۱۰ حرف باشد"),
  price: z.number().int().positive("قیمت باید بیشتر از صفر باشد"),
  discountPercentage: z
    .number()
    .int()
    .min(0, "تخفیف نمی‌تواند منفی باشد")
    .max(100, "تخفیف نمی‌تواند بیشتر از ۱۰۰ درصد باشد"),
  stock: z.number().int().min(0, "موجودی نمی‌تواند منفی باشد"),
  image: z.string().trim().min(1, "آدرس تصویر الزامی است"),
  categoryId: z.string().min(1, "انتخاب دسته‌بندی الزامی است"),
});
export type CreateProductInput = z.infer<typeof createProductSchema>;


export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "نام دسته‌بندی باید حداقل ۲ حرف باشد"),

  slug: z
    .string()
    .trim()
    .min(2, "شناسه دسته‌بندی باید حداقل ۲ حرف باشد")
    .regex(
      /^[a-z0-9-]+$/,
      "شناسه فقط می‌تواند شامل حروف انگلیسی کوچک، عدد و خط تیره باشد",
    ),

  description: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),
});
export type CategoryInput = z.infer<typeof categorySchema>;
