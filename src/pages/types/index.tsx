import Types from '@/App/Pages/Types/Types';
import { TypeSchemaType } from '@/App/Schema/Types.schema';
import { fetchTypesList } from '@/App/Services/Type';
import PrivateRoute from '@/App/hook/PrivateRoute';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';

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

export default function TypesPage({
  types,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PrivateRoute>
      <Types types={types} />
    </PrivateRoute>
  );
}
