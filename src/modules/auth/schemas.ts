import z from "zod"

export const registerSchema = z.object({
                email:z.string().email(),
                password:z.string(),
                username:z
                .string()
                .min(3,"Username must be at least 3 charecters")
                .max(63,"username must be less than 63 charecters")
                .regex(
                    /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
                    "Username can only contain lowercase letters, numbers and hypens. it must start and end with a letter or number"
                )
                .refine(
                    (val) => !val.includes("--"),
                    "Username cannot contain consecutinve hypens"
                )
                .transform((val)=> val.toLowerCase())
            })