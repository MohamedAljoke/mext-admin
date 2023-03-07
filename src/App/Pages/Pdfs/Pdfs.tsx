import { PdfSchemaType } from '@/App/Schema/Pdf.Schema';
import Table from '@/App/components/Table/Table';
import React from 'react';

export default function Pdfs({ pdfs }: { pdfs: PdfSchemaType[] }) {
  const pdfsTableHeader = ['id', 'pdf_name', 'pdf_url'];
  return (
    <div>
      <Table tableHeader={pdfsTableHeader} tableContent={pdfs} />
    </div>
  );
}
