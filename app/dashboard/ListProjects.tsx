"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";

import Button from "../components/Button";
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
        <div className="w-full">
          <label htmlFor="name" className="text-sm font-bold text-gray-700">
            Project Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full px-4 py-2 mt-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
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
