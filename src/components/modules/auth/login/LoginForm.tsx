"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import ReCAPTCHA from "react-google-recaptcha";
import { FieldValues, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/svg/Logo";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";
import { loginUser } from "@/services/auth/login";
import { recapchaVerification } from "@/services/auth/recapchaVerification";

const LoginForm = () => {
  const [recapchaStatus, setRecapchaStatus] = useState(true);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleRecaptha = async (value: string | null) => {
    if (!value) return console.error("reCAPTCHA token is null");

    try {
      const res = await recapchaVerification(value);
      if (res.success) setRecapchaStatus(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await loginUser(data);

      if (res.success) toast.success(res.message);
      else toast.error(res.message);
    } catch (error) {
      console.log(error);
      toast.error(`User registration Failed`);
    }
  };
  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4 ">
        <Logo />
        <div>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-600">
            Welcome to Next Mart
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
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
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Recaptcha */}
          <div className="flex mt-5">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPCHA_CLIENT_KEY!}
              onChange={handleRecaptha}
              className="mx-auto"
            />
          </div>
          <Button
            disabled={recapchaStatus}
            type="submit"
            className="mt-5 w-full"
          >
            {isSubmitting ? "Logging...." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Do not have an account ?
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
