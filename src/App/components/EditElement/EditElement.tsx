import CustomButton from '@/App/Shared/common/Button/Button';
import CustomInput from '@/App/Shared/common/Input/Input';
import { Dialog } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { ZodType } from 'zod';

type ItemType = {
  name: string;
  placeholder: string;
  label: string;
};

interface IUpdateProps<T extends FieldValues, P extends ZodType> {
  items: ItemType[];
  choosenElement?: T;
  closeModal: () => void;
  itemSchema: P;
  onSubmit: SubmitHandler<T>;
}

export default function EditElement<T extends FieldValues, P extends ZodType>({
  choosenElement,
  closeModal,
  itemSchema,
  onSubmit,
  items,
}: IUpdateProps<T, P>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(itemSchema),
  });

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900 text-center"
      >
        Editing Subject {choosenElement?.id}
      </Dialog.Title>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 my-2"
      >
        {items.map((item, idx) => {
          return (
            <div key={idx}>
              <CustomInput
                isRequired={true}
                register={register}
                defaultValue={choosenElement ? choosenElement[item.name] : ''}
                name={item.name}
                type="text"
                label={item.label}
                placeholder={item.placeholder}
              />
            </div>
          );
        })}
        <div className="flex justify-around mt-8 ">
          <CustomButton
            onClick={closeModal}
            color="bg-red-500"
            hoverColor="hover:bg-red-600"
          >
            close
          </CustomButton>
          <CustomButton isSubmit={true}>save</CustomButton>
        </div>
      </form>
    </>
  );
}
