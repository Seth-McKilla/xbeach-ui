"use client";

import useSWR from "swr";

import LinkCard from "../components/LinkCard";
import { fetcher } from "@/lib/api/utils";

export default function ListProjects() {
  // TODO: Handle error
  // TODO: Handle loading
  const { data: projects } = useSWR("/api/xbeach/projects", fetcher);

  return (
    <div className="container grid grid-cols-1 gap-4 mx-auto mb-6 sm:grid-cols-3 lg:grid-cols-5">
      {projects?.map(({ _id, name, models }) => (
        <LinkCard
          key={_id}
          href={`app/projects/${_id}`}
          title={name}
          description={`${models.length} models`}
        />
      ))}
    </div>
  );
}
