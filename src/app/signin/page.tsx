
"use client";

import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";

type SocialProvider = "google" | "github";

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const { error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(
          error.message || "অ্যাকাউন্ট সাইন ইন করা যায়নি।"
        );
        return;
      }

      toast.success("অ্যাকাউন্ট সাইন ইন হয়েছে!");
    } catch {
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (
    provider: SocialProvider
  ): Promise<void> => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message || "সোশ্যাল সাইন ইন ব্যর্থ হয়েছে।"
        );
      }
    } catch {
      toast.error("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f0f5f0] px-4 py-8">
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-extrabold text-gray-900">
          সাইন ইন
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm sm:p-6">
        <Form
          className="flex w-full flex-col gap-4"
          onSubmit={onSubmit}
        >
          <TextField isRequired name="email" type="email">
            <Label>ইমেইল</Label>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full"
            />
            <FieldError />
          </TextField>

          <TextField isRequired name="password">
            <Label>পাসওয়ার্ড</Label>
            <Input
              name="password"
              type="password"
              placeholder="পাসওয়ার্ড লিখুন"
              minLength={8}
              className="w-full"
            />
            <FieldError />
          </TextField>

          <Button
            type="submit"
            isDisabled={isLoading}
            className="w-full rounded-lg bg-green-700 text-white shadow-md hover:bg-green-800"
          >
            {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </Button>
        </Form>

        <div className="my-4 flex items-center gap-3 text-sm text-gray-500">
          <div className="h-px flex-1 bg-gray-200" />
          অথবা
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="outline"
            isDisabled={isLoading}
            onPress={() => handleSocialSignIn("google")}
            className="w-full border-gray-200 text-gray-800"
          >
            <span className="font-bold text-blue-600">G</span>
            Google দিয়ে চালিয়ে যান
          </Button>

          <Button
            type="button"
            variant="outline"
            isDisabled={isLoading}
            onPress={() => handleSocialSignIn("github")}
            className="w-full border-gray-200 text-gray-800"
          >
            <span className="font-bold">●</span>
            GitHub দিয়ে চালিয়ে যান
          </Button>
        </div>

        <p className="mt-5 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-medium text-green-700 hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <Link
        href="/"
        className="mt-5 text-sm text-gray-500 hover:text-green-700"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
};

export default SignInPage;
