import z from "zod";


export const registerSchema = z.object({
    name:z.string().trim().min(2,'نام باید حداقل 2 کاراکتر باشد'),
    email:z.string().trim().email('ایمیل معتبر نیست'),
    password:z.string().min(8,'رمز عبور حداقل 8 کاراکتر باشد'),
})
export type  RegisterInput=z.infer<typeof registerSchema>




export const loginSchema = z.object({
    email:z.string().trim().email('ایمیل معتبر نیست'),
    password:z.string().min(1,'رمز عبور حداقل 1 کاراکتر باشد'),
})
export type  LoginInput=z.infer<typeof loginSchema>