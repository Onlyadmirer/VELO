"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { getUserProfile, loginUser } from "@/services/user.service";
import { registForm } from "@/types/auth";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

function Login() {
  const [visiblePass, setVisiblePass] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    if (error === "oauth_failed") {
      toast.error("Google login gagal, silakan coba lagi");
      router.replace("/login");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<registForm>();

  async function onSubmit(formData: registForm) {
    try {
      const response = await loginUser(formData);
      toast.success(response);
      reset();
      const profile = await getUserProfile();
      setUser(profile);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setError("root", {
          type: "server",
          message: error.message,
        });
      }
    }
  }

  return (
    <div className=' m-auto relative min-h-screen flex flex-col justify-center space-y-8'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8 p-8'>
        <div className='space-y-3'>
          <h1 className='text-4xl font-extrabold tracking-tight text-balance'>
            Welcome to VELO!
          </h1>
          <p className='text-sm text-center leading-none font-medium text-accent-foreground/70'>
            please login to get in VELO.
          </p>
        </div>
        <FieldSet className='w-full max-w-xs m-auto'>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='email'>email</FieldLabel>
              <Input
                id='email'
                type='email'
                disabled={isSubmitting}
                placeholder='akmal@gmail.com'
                {...register("email", { required: "email required" })}
              />
              {errors.email && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.email.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor='password'>Password</FieldLabel>
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
              <div className='flex flex-row gap-1'>
                <Input
                  id='password'
                  disabled={isSubmitting}
                  type={visiblePass ? `text` : `password`}
                  placeholder={visiblePass ? `password` : `••••••••`}
                  {...register("password", { required: "password required" })}
                />
                <Button
                  variant={"outline"}
                  type='button'
                  disabled={isSubmitting}
                  className='cursor-pointer'
                  onClick={() => setVisiblePass(!visiblePass)}
                >
                  {visiblePass ? <Eye /> : <EyeClosed />}
                </Button>
              </div>
              {errors.password && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.password.message}
                </p>
              )}
            </Field>
          </FieldGroup>
          {errors.root && (
            <p className='mt-1 text-sm text-red-600'>*{errors.root.message}</p>
          )}
        </FieldSet>
        <div>
          <hr className='mt-4 mb-4' />
          <Button
            disabled={isSubmitting}
            type='submit'
            className='w-full cursor-pointer'
          >
            Login
          </Button>
        </div>
        <div className='relative mb-2'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>
              Atau lanjutkan dengan
            </span>
          </div>
        </div>
        <Button
          type='button'
          variant='outline'
          disabled={isSubmitting}
          className='w-full cursor-pointer gap-2'
          onClick={() => {
            window.location.href = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/google/login`
          }}
        >
          <svg className='h-5 w-5' viewBox='0 0 24 24'>
            <path
              d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z'
              fill='#4285F4'
            />
            <path
              d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
              fill='#34A853'
            />
            <path
              d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
              fill='#FBBC05'
            />
            <path
              d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
              fill='#EA4335'
            />
          </svg>
          Google
        </Button>
        <div>
          <p className='text-center text-sm'>
            Don`t have an Account?{" "}
            <Link
              className={`${isSubmitting ? "pointer-events-none" : ""}`}
              href={"/register"}
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
