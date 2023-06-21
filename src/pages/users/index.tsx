import Users from '@/App/Pages/Users/Users';
import { UserSchemaType } from '@/App/Schema/Users.Schema';
import { fetchUsersList } from '@/App/Services/Users';
import PrivateRoute from '@/App/hook/PrivateRoute';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';

interface PageProps {
  users?: UserSchemaType[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const { req } = context;
  const cookies = req.cookies;
  const authToken = cookies['auth-token'];
  try {
    const usersList: UserSchemaType[] = await fetchUsersList({
      token: authToken,
    });
    return { props: { users: usersList } };
  } catch (e) {
    return { props: { error: 'error fetching data' } };
  }
};

export default function UsersPage({
  users,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PrivateRoute>
      <Users users={users} />
    </PrivateRoute>
  );
}
