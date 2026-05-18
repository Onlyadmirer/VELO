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

function page() {
  return (
    <div className=' m-auto relative min-h-screen flex flex-col justify-center space-y-8'>
      <div className='space-y-8 p-8'>
        <div className='space-y-2'>
          <h1 className='font-bold text-4xl'>Welcome to VELO!</h1>
          <p className='text-sm leading-none font-medium text-accent-foreground/70'>
            please regist first to join in VELO.
          </p>
        </div>
        <FieldSet className='w-full max-w-xs m-auto'>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='username'>Username</FieldLabel>
              <Input id='username' type='text' placeholder='Max Leiter' />
              <FieldDescription>
                Choose a unique username for your account.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor='email'>email</FieldLabel>
              <Input id='email' type='email' placeholder='akmal@gmail.com' />
              {/* <FieldDescription>Input your email.</FieldDescription> */}
            </Field>
            <Field>
              <FieldLabel htmlFor='password'>Password</FieldLabel>
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
              <Input id='password' type='password' placeholder='••••••••' />
            </Field>
          </FieldGroup>
        </FieldSet>
        <div>
          <hr className='mt-4 mb-4' />
          <Button className='w-full cursor-pointer'>Regiter</Button>
        </div>
        <div>
          <p className='text-center text-sm'>
            Already have an Account? <Link href={""}>Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
