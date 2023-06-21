import { CreatePdfSchema, CreatePdfSchemaType } from '@/App/Schema/Pdf.Schema';
import { TypeSchemaType } from '@/App/Schema/Types.schema';
import { createPdf } from '@/App/Services/Pdfs';
import { fetchTypesList } from '@/App/Services/Type';
import { createVideo } from '@/App/Services/Videos';
import CreateElement from '@/App/components/CreateElement/CreateElement';
import { popError } from '@/App/components/PopUp/popError';
import { popSucess } from '@/App/components/PopUp/popSuccess';
import CustomSelect, { SelectOption } from '@/App/components/Select';
import PrivateRoute from '@/App/hook/PrivateRoute';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';


interface PageProps {
  types?: TypeSchemaType[];
  error?: string;
}
export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const { req } = context;
  const cookies = req.cookies;
  const authToken = cookies['auth-token'];
  try {
    const typesList: TypeSchemaType[] = await fetchTypesList({
      token: authToken,
    });
    return { props: { types: typesList } };
  } catch (e) {
    return { props: { error: 'error fetching data' } };
  }
};
export default function CreatePage({
  types,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const lectureId: number = Number(router.query.lectureId);

  const [typesOptions, setTypesOptions] = useState<SelectOption[]>([])
  const [typesListSelected, setTypesListSelected] = useState<SelectOption[]>([])
  useEffect(() => {
    if (types?.length) {
      const typesFormatted = types.map(type => {
        return {
          label: type.type_name,
          value: type.id
        }
      })
      setTypesOptions(typesFormatted)
    }
  }, [types])

  const onSubmit: SubmitHandler<CreatePdfSchemaType> = async (data) => {
    try {
      const typesIds = typesListSelected.map(type => {
        return type.value as number
      })
      await createPdf({
        ...(lectureId ? { lectureId } : {}),
        ...(typesIds.length ? { typesId: typesIds } : {}),
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
          children={<div className='mt-3'>
            <CustomSelect isMulti={true} options={typesOptions}
              values={typesListSelected}
              handleChange={(newValue) => {
                setTypesListSelected(prev => {
                  return [
                    ...newValue
                  ]
                })
              }}
            />
          </div>}
        />
      </>
    </PrivateRoute>
  );
}
