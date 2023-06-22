import Pdfs from '@/App/Pages/Pdfs/Pdfs';
import { PdfSchemaType } from '@/App/Schema/Pdf.Schema';
import { TypeSchemaType } from '@/App/Schema/Types.schema';
import { fetchPdfsList } from '@/App/Services/Pdfs';
import { fetchTypesList } from '@/App/Services/Type';
import PrivateRoute from '@/App/hook/PrivateRoute';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';

interface PageProps {
  types?: TypeSchemaType[];
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
    const typesList: TypeSchemaType[] = await fetchTypesList({
      token: authToken,
    });
    return { props: { pdfs: pdfsList, types: typesList } };
  } catch (e) {
    return { props: { error: 'error fetching data' } };
  }
};
export default function PdfsPage({
  pdfs,
  types,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PrivateRoute>
      <Pdfs pdfs={pdfs} types={types} />
    </PrivateRoute>
  );
}
