import Lectuers from '@/App/Pages/Lectuers/Lectuers';
import { LectuerSchemaType } from '@/App/Schema/Lectuer.Schema';
import { fetchLectuersList } from '@/App/Services/Lectuers';
import PrivateRoute from '@/App/hook/PrivateRoute';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';

interface PageProps {
  lectuers?: LectuerSchemaType[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const { req } = context;
  const cookies = req.cookies;
  const authToken = cookies['auth-token'];
  try {
    const usersList: LectuerSchemaType[] = await fetchLectuersList({
      token: authToken,
    });
    return { props: { lectuers: usersList } };
  } catch (e) {
    return { props: { error: 'error fetching data' } };
  }
};
export default function LecturesPage({
  lectuers,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PrivateRoute>
      <>
        {lectuers && lectuers?.length > 0 ? (
          <Lectuers lectuers={lectuers} />
        ) : null}
      </>
    </PrivateRoute>
  );
}
