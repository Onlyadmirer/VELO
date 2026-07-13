"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { verifyEmail } from "@/services/user.service";
import Link from "next/link";

function VerifyEmailPage() {
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      return;
    }

    async function verify() {
      try {
        const response = await verifyEmail(token as string);
        toast.success(response);
      } catch (error) {
        toast.error("Unexpected Token");
        console.log(error);
      }
    }

    verify();
  }, [params]);

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
        <Link href={"/login"} className='cursor-pointer w-1/2'>
          <Button className='cursor-pointer w-full' type='button'>
            Login Now
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
