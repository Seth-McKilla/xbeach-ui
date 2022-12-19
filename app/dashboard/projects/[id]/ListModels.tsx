"use client";

import LinkCard from "@/components/LinkCard";

type Props = {
  models: Array<{
    _id: string;
    name: string;
    description: string;
  }>;
};

export default function ListModels({ models }: Props) {
  return (
    <div className="container grid grid-cols-1 gap-4 mx-auto mb-6 sm:grid-cols-3 lg:grid-cols-5">
      {models?.map(({ _id, name, description }) => (
        <LinkCard
          key={_id}
          href={`dashboard/models/${_id}`}
          title={name}
          description={description}
        />
      ))}
    </div>
  );
}
