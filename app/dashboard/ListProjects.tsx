"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import Button from "../components/Button";
import InputText from "../components/InputText";
import Modal from "../components/Modal";

export default function ListProjects() {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  console.log(watch());

  const [displayNewProjectModal, setDisplayNewProjectModal] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Modal
        title="New Project"
        description="Create a new project"
        open={displayNewProjectModal}
        setOpen={setDisplayNewProjectModal}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-start w-full"
        >
          <InputText {...register("projectName", { required: true })} />
          {errors.projectName && (
            <span className="flex justify-start mt-1 text-xs text-red-500">
              This field is required
            </span>
          )}
          <div className="flex flex-row-reverse mt-4 bg-gray-50">
            <div>
              <Button onClick={onSubmit}>Create</Button>
            </div>
            <div className="mx-2">
              <Button
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
