import {
  EditSubjectSchema,
  EditSubjectSchemaType,
  SubjectSchemaType,
} from '@/App/Schema/Subject.Schema';
import { updateSubject } from '@/App/Services/Subjects';
import CustomButton from '@/App/Shared/common/Button/Button';
import CustomInput from '@/App/Shared/common/Input/Input';
import { popError } from '@/App/components/PopUp/popError';
import { popSucess } from '@/App/components/PopUp/popSuccess';
import { Dialog } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdOutlinePersonOutline } from 'react-icons/md';

export default function EditSubject({
  choosenSubject,
  closeModal,
  setUpdatedSubject,
}: {
  choosenSubject?: SubjectSchemaType;
  closeModal: () => void;
  setUpdatedSubject: React.Dispatch<
    React.SetStateAction<SubjectSchemaType | undefined>
  >;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditSubjectSchemaType>({
    resolver: zodResolver(EditSubjectSchema),
  });
  const onSubmit: SubmitHandler<EditSubjectSchemaType> = async (data) => {
    if (!choosenSubject) {
      throw Error('no subject');
    }
    try {
      const response = await updateSubject({
        subject: { ...choosenSubject, ...data },
      });
      setUpdatedSubject({
        ...choosenSubject,
        subject_name: response.subject_name,
      });
      popSucess('Subject Updated');
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
        Editing Subject {choosenSubject?.id}
      </Dialog.Title>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 my-2"
      >
        <div>
          <CustomInput
            isRequired={true}
            register={register}
            defaultValue={choosenSubject?.subject_name}
            name="subject_name"
            type="text"
            label="Subject"
            icon={
              <MdOutlinePersonOutline
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            }
            placeholder="Subject"
          />
          <p className="mt-2 text-xs text-red-600" id="name-error">
            {errors.subject_name && <span>{errors.subject_name?.message}</span>}
          </p>
        </div>
        <CustomButton customCss="max-w-[80px]" isSubmit={true}>
          Save
        </CustomButton>
      </form>
    </>
  );
}
