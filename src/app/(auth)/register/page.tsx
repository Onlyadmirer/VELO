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
import { registerUser } from "@/services/auth";
import { registForm } from "@/types/auth";

function RegistUi() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<registForm>();

  async function onSubmit(formData: registForm) {
    try {
      const result = await registerUser(formData);
      console.log(result);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        setError("root", { type: "server", message: error.message });
      }
    }
  }

  return (
    <div className=' m-auto relative min-h-screen flex flex-col justify-center space-y-8'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8 p-8'>
        <div className='space-y-2'>
          <h1 className='font-bold text-4xl'>Welcome to VELO!</h1>
          <p className='text-sm leading-none font-medium text-accent-foreground/70'>
            please regist first to join in VELO.
          </p>
        </div>
        <FieldSet className='w-full max-w-xs m-auto'>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='name'>name</FieldLabel>
              <Input
                id='name'
                type='text'
                placeholder='Max Leiter'
                {...register("name", { required: "name required" })}
              />
              {errors.name && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.name.message}
                </p>
              )}
              <FieldDescription>
                Choose a unique username for your account.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor='email'>email</FieldLabel>
              <Input
                id='email'
                type='email'
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
              <Input
                id='password'
                type='password'
                placeholder='••••••••'
                {...register("password", { required: "password required" })}
              />
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
          <Button type='submit' className='w-full cursor-pointer'>
            Regiter
          </Button>
        </div>
        <div>
          <p className='text-center text-sm'>
            Already have an Account? <Link href={""}>Log in</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegistUi;
