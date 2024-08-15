"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthInput } from "@/components/common/auth-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { authFormSchema } from "@/lib/utils";
import { login } from "@/actions/auth.actions";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";

const SignIn = () => {
  const loginFormSchema = authFormSchema();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [loading, set_loading] = useState<boolean>(false);
  const [error, set_error] = useState<ErrorResponse | null>(null);

  const authLogin = useAuthStore((state) => state.login);

  const handleSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    set_loading(true);
    try {
      const response = await login(data.username, data.password);

      authLogin(
        (response as AuthResponse).userInfo,
        (response as AuthResponse).token,
        (response as AuthResponse).tokenExpiry
      );
      toast.success(response.message);
    } catch (error) {
      set_error(error as ErrorResponse);
      if ((error as ErrorResponse).errorCode) {
        toast.error((error as ErrorResponse).message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      set_loading(false);
    }
  };
  return (
    <div className="flex min-h-screen flex-col bg-rose-50  items-center justify-center py-2">
      <div className="bg-rose-100 sm:flex hidden rounded-2xl shadow-lg max-w-2xl  ">
        <div className="sm:w-1/2 ">
          <Card className="mx-auto  max-w-full min-h-full sm:rounded-l-2xl sm:rounded-r-none">
            <CardHeader>
              <div className="flex flex-row items-center justify-center">
                <Image
                  src={"/images/image-192.png"}
                  alt="Digisales Logo"
                  width={80}
                  height={80}
                  priority
                />
              </div>
              <CardTitle>Digisales Analytics</CardTitle>
              <CardDescription>Sign in to Digisales Analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className=" space-y-5"
                  >
                    <>
                      <AuthInput
                        control={form.control}
                        name="username"
                        label="Username"
                        placeholder="Username"
                      />
                      <AuthInput
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder="Password"
                        type="password"
                      />
                      <>
                        <Button
                          type="submit"
                          disabled={loading}
                          className="w-full"
                        >
                          {loading ? (
                            <>
                              <Loader2 size={20} className="animate-spin" />{" "}
                            </>
                          ) : (
                            <>Login</>
                          )}
                        </Button>
                      </>
                    </>
                  </form>
                </Form>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="sm:block hidden w-1/2 ">
          <Image
            src={"/images/hero.jpg"}
            alt="Digisales Hero"
            className="rounded-r-2xl sm:block hidden min-h-full "
            height={300}
            width={300}
            priority
          />
        </div>
      </div>
      <Card className="mx-auto max-w-md sm:hidden ">
        <CardHeader>
          <div className="flex flex-row items-center justify-center">
            <Image
              src={"/images/image-192.png"}
              alt="Digisales Logo"
              width={80}
              height={80}
              priority
            />
          </div>
          <CardTitle className="text-2xl">Digisales Analytics</CardTitle>
          <CardDescription>Sign in to Digisales Analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className=" space-y-4"
              >
                <>
                  <AuthInput
                    control={form.control}
                    name="username"
                    label="Username"
                    placeholder="Enter Username"
                    type="text"
                  />

                  <AuthInput
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="Enter Password"
                    type="password"
                  />
                  <>
                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />{" "}
                        </>
                      ) : (
                        <>Login</>
                      )}
                    </Button>
                  </>
                </>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
