import {
  CreateVideoSchema,
  CreateVideoSchemaType,
} from '@/App/Schema/Video.Schema';
import { createVideo } from '@/App/Services/Videos';
import CreateElement from '@/App/components/CreateElement/CreateElement';
import { popError } from '@/App/components/PopUp/popError';
import { popSucess } from '@/App/components/PopUp/popSuccess';
import PrivateRoute from '@/App/hook/PrivateRoute';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';

export default function CreatePage() {
  const router = useRouter();
  const onSubmit: SubmitHandler<CreateVideoSchemaType> = async (data) => {
    try {
      await createVideo(data);
      popSucess('video created');
      router.push('/videos');
    } catch (e) {
      popError('Error creating video');
    }
  };
  return (
    <PrivateRoute>
      <>
        <CreateElement<CreateVideoSchemaType, typeof CreateVideoSchema>
          itemType={[
            { label: 'Video', name: 'videoName', placeholder: 'video' },
            { label: 'Url', name: 'videoUrl', placeholder: 'video link' },
          ]}
          itemSchema={CreateVideoSchema}
          onSubmit={onSubmit}
        />
      </>
    </PrivateRoute>
  );
}
