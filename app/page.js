"use client"
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GlobalApi from "./_utils/GlobalApi";

export default function Home() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  // Define checkUserMembership function
  const checkUserMembership = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    
    try {
      const response = await GlobalApi.checkForMembership(user.primaryEmailAddress.emailAddress);
      console.log("User Membership Status:", response);
    } catch (error) {
      console.error("Error checking user membership:", error);
    }
  };

  useEffect(() => {
    if (user) {
      checkUserMembership(); // ✅ Now it is defined
      router.push('/dashboard');
    } else if (isLoaded) {
      router.push('/courses');
    }
  }, [user]);

  return <UserButton />;
}
