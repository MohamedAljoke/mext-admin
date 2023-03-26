import { VideoSchemaType } from '@/App/Schema/Video.Schema';
import CustomButton from '@/App/Shared/common/Button/Button';
import Table from '@/App/components/Table/Table';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Videos({ videos }: { videos: VideoSchemaType[] }) {
  //modals
  const openEditModal = (subject: VideoSchemaType) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [choosenVideo, setChoosenVideo] = useState<VideoSchemaType>();
    setChoosenVideo(subject);
    setOpenEdit(true);
  };
  const usersTableHeader: (keyof VideoSchemaType)[] = [
    'id',
    'video_name',
    'video_url',
  ];
  return (
    <div>
      <div className="flex justify-between">
        <>
          <h1 className="text-2xl font-semibold text-gray-900">Videos</h1>
          <Link href="/videos/create">
            <CustomButton isSubmit={false}>Add video</CustomButton>
          </Link>
        </>
      </div>
      <Table<VideoSchemaType>
        openEditModal={openEditModal}
        tableHeader={usersTableHeader}
        tableContent={videos}
      />
    </div>
  );
}
