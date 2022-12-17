"use client";

import { usePathname } from "next/navigation";
import useSWR from "swr";

import { fetcher } from "lib/api/utils";

export default function DashboardPage() {
  const pathname = usePathname();
  const [, , , id] = pathname.split("/");
  const { data: project } = useSWR(`/api/xbeach/projects/${id}`, fetcher);

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold text-blue-800">{project?.name}</h1>
      <div className="mt-4"></div>
    </div>
  );
}
