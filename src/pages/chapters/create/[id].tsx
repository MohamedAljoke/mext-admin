import {
  CreateChapterSchema,
  CreateChapterSchemaType,
} from '@/App/Schema/Chapter.Schema';
import { createChapter } from '@/App/Services/Chapters';
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

  const onSubmit: SubmitHandler<CreateChapterSchemaType> = async (data) => {
    try {
      await createChapter(data);
      popSucess('chapter created');
      router.push('/chapters');
    } catch (e) {
      popError('Error creating subject');
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
        <CreateElement<CreateChapterSchemaType, typeof CreateChapterSchema>
          itemType={[
            { label: 'Chapter', name: 'chapterName', placeholder: 'chapter' },
            {
              label: 'SubjectId',
              name: 'subjectId',
              placeholder: 'subjectId',
              defaultValue: id,
              disabled: true,
            },
          ]}
          itemSchema={CreateChapterSchema}
          onSubmit={onSubmit}
        />
      </>
    </PrivateRoute>
  );
}
