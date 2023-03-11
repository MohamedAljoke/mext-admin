import {
  CreateChapterSchema,
  CreateChapterSchemaType,
} from '@/App/Schema/Chapter.Schema';
import { createChapter } from '@/App/Services/Chapters';
import CreateElement from '@/App/components/CreateElement/CreateElement';
import { popError } from '@/App/components/PopUp/popError';
import { popSucess } from '@/App/components/PopUp/popSuccess';
import PrivateRoute from '@/App/hook/PrivateRoute';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';

export default function CreatePage() {
  const router = useRouter();
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
        <CreateElement<CreateChapterSchemaType, typeof CreateChapterSchema>
          itemType={[
            { label: 'Subject', name: 'subjectName', placeholder: 'subject' },
          ]}
          itemSchema={CreateChapterSchema}
          onSubmit={onSubmit}
        />
      </>
    </PrivateRoute>
  );
}
