import Subjects from '@/App/Pages/Subjects/Subjects';
import Users from '@/App/Pages/Users/Users';
import { SubjectSchemaType } from '@/App/Schema/Subject.Schema';
import { fetchSubjectsList } from '@/App/Services/Subjects';
import PrivateRoute from '@/App/hook/PrivateRoute';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';

interface PageProps {
  subjects?: SubjectSchemaType[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const { req } = context;
  const cookies = req.cookies;
  const authToken = cookies['auth-token'];
  try {
    const subjectsList: SubjectSchemaType[] = await fetchSubjectsList({
      token: authToken,
    });
    return { props: { subjects: subjectsList } };
  } catch (e) {
    return { props: { error: 'error fetching data' } };
  }
};

export default function SubjectsPage({
  subjects,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PrivateRoute>
      <>
        {subjects && subjects?.length > 0 ? (
          <Subjects subjects={subjects} />
        ) : null}
      </>
    </PrivateRoute>
  );
}
