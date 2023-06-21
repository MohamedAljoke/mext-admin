import { CreatePdfSchema, CreatePdfSchemaType } from '@/App/Schema/Pdf.Schema';
import { createPdf } from '@/App/Services/Pdfs';
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
  const lectureId: number = Number(router.query.lectureId);

  const onSubmit: SubmitHandler<CreatePdfSchemaType> = async (data) => {
    try {
      await createPdf({
        ...(lectureId ? { lectureId } : {}),
        ...data
      });
      popSucess('pdf created');
      router.push('/pdfs');
    } catch (e) {
      popError('Error creating pdf');
    }
  };
  return (
    <PrivateRoute>
      <>
        <CreateElement<CreatePdfSchemaType, typeof CreatePdfSchema>
          itemType={[
            { label: 'Pdf', name: 'pdfName', placeholder: 'Pdf' },
            { label: 'Url', name: 'pdfUrl', placeholder: 'pdf link' },
          ]}
          itemSchema={CreatePdfSchema}
          onSubmit={onSubmit}
        />
      </>
    </PrivateRoute>
  );
}
