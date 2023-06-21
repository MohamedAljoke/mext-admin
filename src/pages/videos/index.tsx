import Videos from '@/App/Pages/Videos/Videos';
import { VideoSchemaType } from '@/App/Schema/Video.Schema';
import { fetchVideosList } from '@/App/Services/Videos';
import PrivateRoute from '@/App/hook/PrivateRoute';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';

interface PageProps {
  videos?: VideoSchemaType[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const { req } = context;
  const cookies = req.cookies;
  const authToken = cookies['auth-token'];
  try {
    const videos: VideoSchemaType[] = await fetchVideosList({
      token: authToken,
    });
    return { props: { videos: videos } };
  } catch (e) {
    return { props: { error: 'error fetching data' } };
  }
};

export default function VideosPage({
  videos,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PrivateRoute>
      <Videos videos={videos} />
    </PrivateRoute>
  );
}
