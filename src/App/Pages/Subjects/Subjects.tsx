import { SubjectSchemaType } from '@/App/Schema/Subject.Schema';
import Table from '@/App/components/Table/Table';
import React from 'react';

export default function Subjects({
  subjects,
}: {
  subjects: SubjectSchemaType[];
}) {
  console.log(subjects);

  const subjectTableHeader = ['id', 'subject_name'];
  return (
    <div>
      <Table tableHeader={subjectTableHeader} tableContent={subjects} />
    </div>
  );
}
