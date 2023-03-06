import { LectuerSchemaType } from '@/App/Schema/Lectuer.Schema';
import Table from '@/App/components/Table/Table';
import React from 'react';

export default function Lectuers({
  lectuers,
}: {
  lectuers: LectuerSchemaType[];
}) {
  const lectuerTableHeader = ['id', 'chapter_id', 'video_id', 'lecture_name'];
  return (
    <div>
      <Table tableHeader={lectuerTableHeader} tableContent={lectuers} />
    </div>
  );
}
