"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

import Button from "@/components/Button";
import Input from "@/components/Input";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import Modal from "@/components/Modal";
import SvgPlus from "@/components/SvgPlus";
import { fetcher } from "@/lib/api/utils";

export default function ListProjects() {
  const { mutate } = useSWRConfig();
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

      <Button onClick={() => setDisplayNewProjectModal(true)}>
        <div className="flex items-center">
          <SvgPlus />
          <span>New Project</span>
        </div>
      </Button>
    </>
  );
}
