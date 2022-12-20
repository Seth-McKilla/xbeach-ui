"use client";

import { usePathname } from "next/navigation";
import useSWR from "swr";

import ListModels from "./ListModels";
import Loading from "@/components/Loading";
import ModalNewModel from "./ModalNewModel";
import { fetcher } from "@/lib/api/utils";

export default function ProjectPage() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const { data: project, isLoading } = useSWR(
    `/api/xbeach/projects/${id}`,
    fetcher
  );

  return (
    <div className="mt-8">
      <div className="w-auto h-8">
        {isLoading ? (
          <Loading w="40" />
        ) : (
          <h1 className="text-2xl font-bold text-blue-800">{project?.name}</h1>
        )}
      </div>
      <div className="mt-4">
        <ListModels models={project?.models} />
        <ModalNewModel projectId={id} />
      </div>
    </div>
  );
}
