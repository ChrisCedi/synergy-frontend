"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function ButtonBack() {
  const router = useRouter();

  return (
    <ArrowLeft
      className="text-primary cursor-pointer mb-2"
      size={30}
      onClick={() => router.back()}
    />
  );
}
