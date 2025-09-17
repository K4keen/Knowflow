"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/app/actions/auth";

const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 8 characters" }),
});

export default function RegisterForm() {
    const [isPending, startTransition] = useTransition();

    const[message, setMessage] = useState<{text: string, type: "success" | "error" } | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);

        const result = await registerUser(formData);
    }