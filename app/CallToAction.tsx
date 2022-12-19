"use client";

import { useSession } from "next-auth/react";

import LinkButton from "@/components/LinkButton";

export default function CallToAction() {
  const { data: session } = useSession();

  if (session) {
    return <LinkButton href="/app">Go to Dashboard</LinkButton>;
  }

  return <LinkButton href="/signin">Get Started</LinkButton>;
}
