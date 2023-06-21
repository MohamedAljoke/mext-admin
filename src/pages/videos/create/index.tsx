import { TypeSchemaType } from '@/App/Schema/Types.schema';
import {
  CreateVideoSchema,
  CreateVideoSchemaType,
} from '@/App/Schema/Video.Schema';
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
  const onSubmit: SubmitHandler<CreateVideoSchemaType> = async (data) => {
    try {
      const typesIds = typesListSelected.map(type => {
        return type.value as number
      })
      await createVideo({ ...(typesIds.length ? { typesId: typesIds } : {}), ...data });
      popSucess('video created');
      router.push('/videos');
    } catch (e) {
      popError('Error creating video');
    }
  };

  return (
    <PrivateRoute>
      <div >
        <CreateElement<CreateVideoSchemaType, typeof CreateVideoSchema>
          itemType={[
            { label: 'Video', name: 'videoName', placeholder: 'video' },
            { label: 'Url', name: 'videoUrl', placeholder: 'video link' },
          ]}
          itemSchema={CreateVideoSchema}
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
      </div>
    </PrivateRoute>
  );
}
