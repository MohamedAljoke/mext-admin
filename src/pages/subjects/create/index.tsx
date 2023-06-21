import {
  CreateSubjectSchema,
  CreateSubjectSchemaType,
} from '@/App/Schema/Subject.Schema';
import { createSubject } from '@/App/Services/Subjects';
import CreateElement from '@/App/components/CreateElement/CreateElement';
import { popError } from '@/App/components/PopUp/popError';
import { popSucess } from '@/App/components/PopUp/popSuccess';
import PrivateRoute from '@/App/hook/PrivateRoute';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';

export default function CreatePage() {
  const router = useRouter();
  const onSubmit: SubmitHandler<CreateSubjectSchemaType> = async (data) => {
    console.log(data)
    try {
      await createSubject(data);
      popSucess('Subject created');
      router.push('/subjects');
    } catch (e) {
      popError('Error creating subject');
    }
  };
  return (
    <PrivateRoute>
      <>
        <CreateElement<CreateSubjectSchemaType, typeof CreateSubjectSchema>
          itemType={[
            { label: 'Subject', name: 'subjectName', placeholder: 'subject' },
          ]}
          itemSchema={CreateSubjectSchema}
          onSubmit={onSubmit}
        />
      </>
    </PrivateRoute>
  );
}
