"use client";

import { usePathname } from "next/navigation";
import useSWR, { mutate } from "swr";

import { fetcher } from "lib/api/utils";

export default function DashboardPage() {
  const pathname = usePathname();
  const [, , , id] = pathname.split("/");
  const { data: project } = useSWR(`/api/xbeach/projects/${id}`, fetcher);
  console.log(project);

  return <div>{id}</div>;
}
