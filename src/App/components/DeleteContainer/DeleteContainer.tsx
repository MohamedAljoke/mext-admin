import CustomButton from '@/App/Shared/common/Button/Button';
import { Dialog } from '@headlessui/react';
import React from 'react';

interface IDeleSubject<T extends { id: number }> {
  element: T;
  closeDeleteModal: () => void;
  deleteItem: (item: T) => void;
}
export default function DeleteElement<T extends { id: number }>({
  element,
  closeDeleteModal,
  deleteItem,
}: IDeleSubject<T>) {
  return (
    <div>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900 text-center"
      >
        Delete item {element?.id}
      </Dialog.Title>
      <div className="flex justify-around mt-8 ">
        <CustomButton
          onClick={closeDeleteModal}
          color="bg-red-500"
          hoverColor="hover:bg-red-600"
        >
          close
        </CustomButton>
        <CustomButton onClick={() => deleteItem(element)} isSubmit={true}>
          save
        </CustomButton>
      </div>
    </div>
  );
}
