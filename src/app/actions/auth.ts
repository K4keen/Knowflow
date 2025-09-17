"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";


const registerSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export async function registerUser(formData: FormData) {

    const validatedFields = registerSchema.safeParse({
        name:formData.get("name") as string | undefined,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    });

    if (!validatedFields.success) {
        return{
            error: true,
            message: "Validation failed",
            issues: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, password } = validatedFields.data;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return {
                error: true,
                message: "Email already exists",
            };
        }

         // The number 10 is the "salt rounds" - higher numbers are more secure but slower
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: name,
            }
        });

        return {success: true, message: "User created successfully"};

    } catch (error) {

        console.error("Registration error", error);

        return {success: false, message: "Error creating user"};
    }
}