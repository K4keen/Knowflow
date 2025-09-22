'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold">KnowFlow AI</CardTitle>
            <CardDescription>
              Welcome to your AI-powered knowledge management platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 ">
            <div className="space-y-0">
              <Link href="/login" className="w-full block mb-4">
                <Button className="w-full" size="lg">
                  Sign In
                </Button>
              </Link>
              <Link href="/register" className="w-full block">
                <Button variant="outline" className="w-full" size="lg">
                  Create Account
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
