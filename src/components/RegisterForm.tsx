"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/app/actions/auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

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

   // Handle form submission using Server Actions
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setMessage(null);
    
    startTransition(async () => {
      // Create FormData from values to match the server action signature
      const formData = new FormData();
      if (values.name) formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('password', values.password);

      const result = await registerUser(formData);
      
      if (result?.error) {
        // Server Action returned an error - display error message
        setMessage({ text: result.message || "Registration failed.", type: 'error' });
      } else if (result?.success) {
        // Registration successful - show success message and reset form
        setMessage({ text: result.message, type: 'success' });
        
        // Reset the form after successful registration
        form.reset();
        
        // Optional: Redirect to login page after successful registration
        // import { useRouter } from 'next/navigation'; const router = useRouter(); router.push('/login');
      }
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create your account.</CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="m@example.com" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          
          <CardFooter className="flex flex-col items-center space-y-4">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Registering...' : 'Create Account'}
            </Button>
            
            {message && (
              <Badge 
                variant={message.type === 'error' ? 'destructive' : 'default'}
                className="w-full justify-center py-2"
              >
                {message.text}
              </Badge>
            )}
            
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}