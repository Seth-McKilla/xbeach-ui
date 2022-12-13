"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR, { useSWRConfig } from "swr";

import Button from "../components/Button";
import Input from "../components/Input";
import InputError from "../components/InputError";
import InputLabel from "../components/InputLabel";
import LinkCard from "../components/LinkCard";
import Modal from "../components/Modal";
import { fetcher } from "lib/api/utils";

export default function ListProjects() {
  const { mutate } = useSWRConfig();
  // TODO: Handle error
  // TODO: Handle loading
  const { data: projects } = useSWR("/api/xbeach/projects", fetcher);

  const [displayNewProjectModal, setDisplayNewProjectModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async ({ name }) => {
    await fetcher("/api/xbeach/projects", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    mutate("/api/xbeach/projects");
    setDisplayNewProjectModal(false);
  };

  useEffect(() => {
    if (!displayNewProjectModal) {
      reset();
      clearErrors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayNewProjectModal]);

  return (
    <>
      <Modal
        title="New Project"
        description="Create a new project"
        open={displayNewProjectModal}
        setOpen={setDisplayNewProjectModal}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel htmlFor="name">Project Name</InputLabel>
          <Input
            {...register("name", {
              required: "Project Name is required",
            })}
          />
          <InputError error={errors?.name?.message} />

          <div className="flex flex-row-reverse mt-4 bg-gray-50">
            <div>
              <Button type="submit">Create</Button>
            </div>
            <div className="mx-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setDisplayNewProjectModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      <div className="mt-4">
        <h1 className="text-2xl font-bold text-blue-800">My Projects</h1>
        <div className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {projects?.map(({ _id, name, models }) => (
              <LinkCard
                key={_id}
                href={`dashboard/projects/${_id}`}
                title={name}
                description={`${models.length} models`}
              />
            ))}
          </div>

          <Button onClick={() => setDisplayNewProjectModal(true)}>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span>New Project</span>
            </div>
          </Button>
        </div>
      </div>
    </>
  );
}
