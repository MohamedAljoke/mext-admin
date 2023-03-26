import { EditSubjectSchemaType } from '@/App/Schema/Subject.Schema';
import {
  EditVideoSchema,
  EditVideoSchemaType,
  VideoSchemaType,
} from '@/App/Schema/Video.Schema';
import { deleteVideo, updateVideo } from '@/App/Services/Videos';
import CustomButton from '@/App/Shared/common/Button/Button';
import DeleteElement from '@/App/components/DeleteContainer/DeleteContainer';
import EditElement from '@/App/components/EditElement/EditElement';
import CustomModal from '@/App/components/Modal/Modal';
import { popError } from '@/App/components/PopUp/popError';
import { popSucess } from '@/App/components/PopUp/popSuccess';
import Table from '@/App/components/Table/Table';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

export default function Videos({ videos }: { videos: VideoSchemaType[] }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [choosenVideo, setChoosenVideo] = useState<VideoSchemaType>();
  const [videoList, setVideoList] = useState<VideoSchemaType[]>();
  const [updatedVideo, setUpdatedVideo] = useState<VideoSchemaType>();

  useEffect(() => {
    if (updatedVideo && videos) {
      const updatedVideos = videoList?.map((video) => {
        if (video.id === updatedVideo.id) {
          return updatedVideo;
        } else {
          return video;
        }
      });
      setVideoList(updatedVideos);
    } else {
      setVideoList(videos);
    }
  }, [videos, updatedVideo]);
  //modals
  const openEditModal = (subject: VideoSchemaType) => {
    setChoosenVideo(subject);
    setOpenEdit(true);
  };
  const deleteItem = async (item: VideoSchemaType) => {
    try {
      await deleteVideo(item.id);
      popSucess('Item deleted');
      const newVideoList = videoList?.filter((video) => video.id !== item.id);
      setVideoList(newVideoList);
    } catch (e) {
      popError('error deleting item');
    }
    setOpenDelete(false);
  };

  const openDeleteModal = (subject: VideoSchemaType) => {
    setChoosenVideo(subject);
    setOpenDelete(true);
  };
  const closeDeleteModal = () => {
    setOpenDelete(false);
  };
  const closeEditModal = () => {
    setOpenEdit(false);
  };
  //edit
  const onSubmit: SubmitHandler<EditVideoSchemaType> = async (data) => {
    if (!choosenVideo) {
      throw Error('no subject');
    }
    try {
      const response = await updateVideo({
        video: { ...choosenVideo, ...data },
      });
      setUpdatedVideo({
        ...choosenVideo,
        video_name: response.video_name,
        video_url: response.video_url,
      });
      popSucess('Video Updated');

      closeEditModal();
    } catch (e) {
      console.log(e);
      popError('try again later');
    }
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
      <CustomModal isOpen={openEdit} closeModal={closeEditModal}>
        <EditElement<EditVideoSchemaType, typeof EditVideoSchema>
          items={[
            {
              name: 'video_name',
              placeholder: 'Video',
              label: 'Video',
            },
            {
              name: 'video_url',
              placeholder: 'url',
              label: 'video link',
            },
          ]}
          onSubmit={onSubmit}
          choosenElement={choosenVideo}
          closeModal={closeEditModal}
          itemSchema={EditVideoSchema}
        />
      </CustomModal>
      <CustomModal isOpen={openDelete} closeModal={closeDeleteModal}>
        <DeleteElement<VideoSchemaType>
          deleteItem={deleteItem}
          element={choosenVideo!}
          closeDeleteModal={closeDeleteModal}
        />
      </CustomModal>
      {videoList ? (
        <Table<VideoSchemaType>
          openDeleteModal={openDeleteModal}
          openEditModal={openEditModal}
          tableHeader={usersTableHeader}
          tableContent={videoList}
        />
      ) : (
        <h2>No Videos</h2>
      )}
    </div>
  );
}
