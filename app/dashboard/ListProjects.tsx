"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";

import Button from "../components/Button";
import InputText from "../components/InputText";
import Modal from "../components/Modal";

export default function ListProjects() {
  const { data: session } = useSession();

  const [displayNewProjectModal, setDisplayNewProjectModal] = useState(false);

  return (
    <>
      <Modal
        title="New Project"
        description="Create a new project"
        open={displayNewProjectModal}
        setOpen={setDisplayNewProjectModal}
      >
        <div className="flex justify-start w-full">
          <InputText name="Project Name" />
        </div>
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
