"use client"

import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import Link from "next/link"
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { loginSchema } from "../../schemas"
import { useTRPC } from "@/trpc/client"
import { useQueryClient } from "@tanstack/react-query" 

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
})

export const SignInView = () => {
    const router = useRouter()

    const trpc = useTRPC()
    const queryClient = useQueryClient()
    
    const login = useMutation({
        mutationFn: async(values:z.infer<typeof loginSchema>) =>{
            const response = await fetch("/api/users/login",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });

            if(!response.ok){
                const error = await response.json();
                throw new Error(error.message || "Login Failed")
            }
        },
        onError:(error) =>{
            toast.error(error.message)
        },
        onSuccess: async () =>{
            await queryClient.invalidateQueries(trpc.auth.session.queryFilter())
            router.push("/")
        }
    })

    const form = useForm<z.infer<typeof loginSchema>>({
        mode: "all",
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        
        login.mutate(values)
    }


    return (
        <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-8 p-4 lg:p-16"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <Link href="/">
                                <span
                                    className={cn("text-2xl font-semibold", poppins.className)}
                                >
                                    funroad
                                </span>
                            </Link>
                            <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="text-base border-none underline"
                            >
                                <Link prefetch href="/sign-in">
                                    Sign in
                                </Link>
                            </Button>
                        </div>
                        <h1 className="text-4xl font-medium">
                            Welcome back to Funroad
                        </h1>
                        <FormField
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">password</FormLabel>
                                    <FormControl>
                                        <Input  
                                            {...field} 
                                            type = "password"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={login.isPending}
                            type = "submit"
                            size = "lg"
                            variant = "ghost"
                            className = "bg-black text-white hover:bg-pink-400 hover: text-primary"
                        >
                            Create Account
                        </Button>
                    </form>
                </Form>
            </div>
            <div
                className="h-screen w-full lg:col-span-2 hidden lg:block"
                style={{
                    backgroundImage: "url('/auth-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                Background column
            </div>
        </div>
    )
}