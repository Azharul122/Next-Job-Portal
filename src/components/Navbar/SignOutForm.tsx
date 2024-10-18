"use client";

import { signOut } from "next-auth/react"; 
import { LogOut } from "lucide-react"; 
import React, { useState } from 'react';
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

const SignOutForm = () => {
  const router = useRouter()
  const pathname=usePathname()
  const [loading, setLoading] = useState(false)
  const handleSignOut = async () => {
    try {
      setLoading(true)
      await signOut({ callbackUrl: pathname });
      toast.success("Logout success")
    } catch (error) {
      console.log(error)
      toast.error("Please check your API")
    }
    finally {

      setLoading(false)
      router.refresh()
    }
  };

  return (
    <button className='flex items-center' onClick={handleSignOut}>
      <LogOut className="mr-2 h-4 w-4" /> Log Out
    </button>
  );
};

export default SignOutForm;
