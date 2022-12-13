import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

import Button from "./Button";

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit?: () => void;
};

export default function Modal({
  title,
  description,
  children,
  open,
  setOpen,
  onSubmit,
}: Props) {
  const cancelButtonRef = useRef(null);

  return (
    <div className="fixed inset-0 z-50 hidden w-full h-full overflow-y-auto bg-opacity-50">
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
              >
                <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl">
                  <div className="px-4 pt-5 pb-4 bg-white">
                    <div className="mt-3 text-center">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{description}</p>
                      </div>
                      <div className="mt-2">{children}</div>
                    </div>
                  </div>
                  <div className="flex flex-row-reverse items-center px-4 py-3 bg-gray-50 align-center">
                    <div className="p-2">
                      <Button onClick={onSubmit}>Create</Button>
                    </div>
                    <div className="p-2">
                      <Button
                        variant="secondary"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
