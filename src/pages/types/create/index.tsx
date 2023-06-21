import { CreateTypeSchema, CreateTypeSchemaType } from '@/App/Schema/Types.schema';
import { createType } from '@/App/Services/Type';
import CreateElement from '@/App/components/CreateElement/CreateElement';
import { popError } from '@/App/components/PopUp/popError';
import { popSucess } from '@/App/components/PopUp/popSuccess';
import PrivateRoute from '@/App/hook/PrivateRoute';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';

export default function CreatePage() {
  const router = useRouter();
  const onSubmit: SubmitHandler<CreateTypeSchemaType> = async (data) => {
    try {
      await createType(data);
      popSucess('Type created');
      router.push('/types');
    } catch (e) {
      popError('Error creating Type');
    }
  };
  return (
    <PrivateRoute>
      <>
        <CreateElement<CreateTypeSchemaType, typeof CreateTypeSchema>
          itemType={[
            { label: 'Type', name: 'typeName', placeholder: 'Type' },
          ]}
          itemSchema={CreateTypeSchema}
          onSubmit={onSubmit}
        />
      </>
    </PrivateRoute>
  );
}
