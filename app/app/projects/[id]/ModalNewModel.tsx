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

type Props = {
  projectId: string;
};

export default function ListModels({ projectId }: Props) {
  const { mutate } = useSWRConfig();
  const [displayNewModelModal, setDisplayNewModelModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async ({ name, description }) => {
    await fetcher("/api/xbeach/models", {
      method: "POST",
      body: JSON.stringify({ projectId, name, description }),
    });
    mutate(`/api/xbeach/projects/${projectId}`);
    setDisplayNewModelModal(false);
  };

  useEffect(() => {
    if (!displayNewModelModal) {
      reset();
      clearErrors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayNewModelModal]);

  return (
    <>
      <Modal
        title="New Model"
        description="Create a new model"
        open={displayNewModelModal}
        setOpen={setDisplayNewModelModal}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel htmlFor="name">Model Name</InputLabel>
          <Input
            {...register("name", {
              required: "Model Name is required",
            })}
          />
          <InputError error={errors?.name?.message} />

          <InputLabel htmlFor="description">Model Description</InputLabel>
          <Input {...register("description")} />
          <InputError error={errors?.description?.message} />

          <div className="flex flex-row-reverse mt-4 bg-gray-50">
            <div>
              <Button type="submit">Create</Button>
            </div>
            <div className="mx-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setDisplayNewModelModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      <Button onClick={() => setDisplayNewModelModal(true)}>
        <div className="flex items-center">
          <SvgPlus />
          <span>New Model</span>
        </div>
      </Button>
    </>
  );
}
