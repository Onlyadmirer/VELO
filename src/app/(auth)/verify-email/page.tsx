"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

function page() {
  return (
    <div className='m-auto flex flex-col  items-center'>
      <div className='h-68 w-68 relative '>
        <Image
          src={"/images/success/verify-email-success.svg"}
          alt='img success'
          fill
          priority
        />
      </div>
      <div className='flex flex-col items-center gap-8'>
        <h1 className='text-center'>
          Your email has been verified successfully.
        </h1>
        <Button className='cursor-pointer w-1/2' type='button'>
          Login Now
        </Button>
      </div>
    </div>
  );
}

export default page;
