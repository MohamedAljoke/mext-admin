import { LectuerSchemaType } from '@/App/Schema/Lectuer.Schema';
import Table from '@/App/components/Table/Table';
import React from 'react';

export default function Lectuers({
  lectuers,
}: {
  lectuers: LectuerSchemaType[];
}) {
  const lectuerTableHeader = ['id', 'email', 'name'];
  return (
    <div>
      <Table tableHeader={lectuerTableHeader} tableContent={lectuers} />
    </div>
  );
}
