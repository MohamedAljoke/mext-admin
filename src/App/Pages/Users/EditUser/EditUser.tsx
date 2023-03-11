import { LoginSchema, LoginSchemaType } from '@/App/Schema/Auth.Schema';
import {
  EditUserSchema,
  EditUserSchemaType,
  UserSchemaType,
} from '@/App/Schema/Users.Schema';
import { updateUser } from '@/App/Services/Users';
import CustomButton from '@/App/Shared/common/Button/Button';
import CustomInput from '@/App/Shared/common/Input/Input';
import { popError } from '@/App/components/PopUp/popError';
import { popSucess } from '@/App/components/PopUp/popSuccess';
import { Dialog } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from 'phosphor-react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HiOutlineMail } from 'react-icons/hi';
import { MdOutlinePersonOutline } from 'react-icons/md';

export default function EditUser({
  choosenUser,
  closeModal,
  setUpdatedUser,
}: {
  choosenUser?: UserSchemaType;
  closeModal: () => void;
  setUpdatedUser: React.Dispatch<
    React.SetStateAction<UserSchemaType | undefined>
  >;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserSchemaType>({
    resolver: zodResolver(EditUserSchema),
  });
  const onSubmit: SubmitHandler<EditUserSchemaType> = async (data) => {
    if (!choosenUser) {
      throw Error('no user');
    }
    try {
      const response = await updateUser({ user: { ...choosenUser, ...data } });
      setUpdatedUser({
        ...choosenUser,
        name: response.name,
        email: response.email,
      });
      popSucess('User Updated');
      closeModal();
    } catch (e) {
      console.log(e);
      popError('try again later');
    }
  };
  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900 text-center"
      >
        Editando user {choosenUser?.id}
      </Dialog.Title>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 my-2"
      >
        <div>
          <CustomInput
            isRequired={true}
            register={register}
            defaultValue={choosenUser?.email}
            name="email"
            type="email"
            label="Email"
            icon={
              <HiOutlineMail
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            }
            placeholder="example_email@email.com"
          />
          <p className="mt-2 text-xs text-red-600" id="email-error">
            {errors.email && <span>{errors.email?.message}</span>}
          </p>
        </div>
        <div>
          <CustomInput
            isRequired={true}
            register={register}
            defaultValue={choosenUser?.name}
            name="name"
            type="text"
            label="Name"
            icon={
              <MdOutlinePersonOutline
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            }
            placeholder="name"
          />
          <p className="mt-2 text-xs text-red-600" id="name-error">
            {errors.name && <span>{errors.name?.message}</span>}
          </p>
        </div>
        <CustomButton isSubmit={true}>Save</CustomButton>
      </form>
    </>
  );
}
