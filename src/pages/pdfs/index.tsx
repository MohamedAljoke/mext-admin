import Chapters from '@/App/Pages/Chapters/Chapters';
import Lectuers from '@/App/Pages/Lectuers/Lectuers';
import Pdfs from '@/App/Pages/Pdfs/Pdfs';
import { ChapterSchemaType } from '@/App/Schema/Chapter.Schema';
import { LectuerSchemaType } from '@/App/Schema/Lectuer.Schema';
import { PdfSchemaType } from '@/App/Schema/Pdf.Schema';
import { fetchChaptersList } from '@/App/Services/Chapters';
import { fetchLectuersList } from '@/App/Services/Lectuers';
import { fetchPdfsList } from '@/App/Services/Pdfs';
import PrivateRoute from '@/App/hook/PrivateRoute';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';

interface PageProps {
  pdfs?: PdfSchemaType[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const { req } = context;
  const cookies = req.cookies;
  const authToken = cookies['auth-token'];
  try {
    const pdfsList: PdfSchemaType[] = await fetchPdfsList({
      token: authToken,
    });
    return { props: { pdfs: pdfsList } };
  } catch (e) {
    return { props: { error: 'error fetching data' } };
  }
};
export default function PdfsPage({
  pdfs,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PrivateRoute>
      <Pdfs pdfs={pdfs} />
    </PrivateRoute>
  );
}
