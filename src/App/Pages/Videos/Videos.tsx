import { VideoSchemaType } from '@/App/Schema/Video.Schema';
import Table from '@/App/components/Table/Table';
import React from 'react';

export default function Videos({ videos }: { videos: VideoSchemaType[] }) {
  const usersTableHeader = ['id', 'video_name', 'video_url'];
  return (
    <div>
      <Table tableHeader={usersTableHeader} tableContent={videos} />
    </div>
  );
}
