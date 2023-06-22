import { EditSubjectSchemaType } from '@/App/Schema/Subject.Schema';
import { TypeSchemaType } from '@/App/Schema/Types.schema';
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
import CustomSelect, { SelectOption } from '@/App/components/Select';
import Table from '@/App/components/Table/Table';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

export default function Videos({ videos, types }: { videos: VideoSchemaType[] | undefined, types?: TypeSchemaType[]; }) {
  const router = useRouter()
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [choosenVideo, setChoosenVideo] = useState<VideoSchemaType>();
  const [videoList, setVideoList] = useState<VideoSchemaType[]>();
  const [updatedVideo, setUpdatedVideo] = useState<VideoSchemaType>();
  const [typesOptions, setTypesOptions] = useState<SelectOption[]>([])
  const [typesListSelected, setTypesListSelected] = useState<SelectOption[]>([])

  useEffect(() => {
    if (choosenVideo?.types?.length) {
      const typesFormatted = choosenVideo?.types?.map(type => {
        return {
          label: type.type_name,
          value: type.id
        }
      })
      setTypesListSelected(typesFormatted)
    } else {
      setTypesListSelected([])
    }
  }, [choosenVideo])
  useEffect(() => {
    if (types?.length) {
      const typesFormatted = types?.map(type => {
        return {
          label: type.type_name,
          value: type.id
        }
      })
      setTypesOptions(typesFormatted)
    }
  }, [types])
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
    setTypesListSelected([])
  };
  //edit
  const onSubmit: SubmitHandler<EditVideoSchemaType> = async (data) => {
    if (!choosenVideo) {
      throw Error('no subject');
    }
    try {
      const typesIds = typesListSelected.map(type => {
        return type.value as number
      })
      const response = await updateVideo({
        video: { ...choosenVideo, ...data, typesId: typesIds },

      });
      setUpdatedVideo({
        ...choosenVideo,
        video_name: response.video_name,
        video_url: response.video_url,
      });
      popSucess('Video Updated');
      router.replace(router.asPath);
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
          children={<div className='mt-3'>
            <CustomSelect isMulti={true} options={typesOptions}
              values={typesListSelected}
              handleChange={(newValue) => {
                setTypesListSelected(prev => {
                  return [
                    ...newValue
                  ]
                })
              }}
            />
          </div>}
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
