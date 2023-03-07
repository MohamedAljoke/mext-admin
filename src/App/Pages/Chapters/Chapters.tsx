import { ChapterSchemaType } from '@/App/Schema/Chapter.Schema';
import Table from '@/App/components/Table/Table';
import React from 'react';

export default function Chapters({
  chapters,
}: {
  chapters: ChapterSchemaType[];
}) {
  console.log(chapters);
  const lectuerTableHeader = ['id', 'subject_id', 'chapter_name'];
  return (
    <div>
      <Table tableHeader={lectuerTableHeader} tableContent={chapters} />
    </div>
  );
}
