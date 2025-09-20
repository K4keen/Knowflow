import LoginForm from "@/components/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <div className="w-full max-w-md">
                <Card className="shadow-lg">
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                        <CardDescription>
                            Login to your KnowFlow AI account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LoginForm />
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Don&apos;t have an account?{" "}
                                <Link href="/register" className="text-blue-600 hover:text-blue-500 font-medium">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
