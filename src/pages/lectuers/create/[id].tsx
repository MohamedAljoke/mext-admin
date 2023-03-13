import {
  CreateLectuerSchema,
  CreateLectuerSchemaType,
} from '@/App/Schema/Lectuer.Schema';
import { createLectuer } from '@/App/Services/Lectuers';
import CustomButton from '@/App/Shared/common/Button/Button';
import CreateElement from '@/App/components/CreateElement/CreateElement';
import { popError } from '@/App/components/PopUp/popError';
import { popSucess } from '@/App/components/PopUp/popSuccess';
import PrivateRoute from '@/App/hook/PrivateRoute';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { MdArrowBackIos } from 'react-icons/md';

export default function CreatePage() {
  const router = useRouter();
  const id = router.query.id as string;

  const onSubmit: SubmitHandler<CreateLectuerSchemaType> = async (data) => {
    try {
      console.log(data);
      await createLectuer(data);
      popSucess('lectuer created');
      router.push('/lectuers');
    } catch (e) {
      popError('Error creating lectuer');
    }
  };
  return (
    <PrivateRoute>
      <>
        <div className="flex items-center">
          <CustomButton
            customCss="flex items-center"
            color="bg-[#6EB5D6]"
            onClick={() => {
              router.back();
            }}
            isSubmit={false}
          >
            <MdArrowBackIos />
            back
          </CustomButton>
          <h1 className="ml-8 text-2xl text-center font-semibold text-gray-900">
            Create Element
          </h1>
        </div>
        <CreateElement<CreateLectuerSchemaType, typeof CreateLectuerSchema>
          itemType={[
            { label: 'Lectuer', name: 'lectureName', placeholder: 'lectuer' },
            { label: 'Video', name: 'videoId', placeholder: 'video' },
            {
              label: 'ChapterId',
              name: 'chapterId',
              placeholder: 'chapterId',
              defaultValue: id,
              disabled: true,
            },
          ]}
          itemSchema={CreateLectuerSchema}
          onSubmit={onSubmit}
        />
      </>
    </PrivateRoute>
  );
}
