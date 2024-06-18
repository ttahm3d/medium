import z from "zod";
export declare const signupInput: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    email: string;
    password: string;
}, {
    username: string;
    email: string;
    password: string;
}>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    published: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    published?: boolean | undefined;
}, {
    title: string;
    content: string;
    published?: boolean | undefined;
}>;
export declare const updateBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    published: z.ZodOptional<z.ZodBoolean>;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    id: string;
    published?: boolean | undefined;
}, {
    title: string;
    content: string;
    id: string;
    published?: boolean | undefined;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type updateBlogInputBlogInput = z.infer<typeof updateBlogInput>;
