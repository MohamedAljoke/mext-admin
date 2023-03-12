import { LectuerSchemaType } from '@/App/Schema/Lectuer.Schema';
import Table from '@/App/components/Table/Table';
import React, { useEffect, useState } from 'react';

export default function Lectuers({
  lectuers,
}: {
  lectuers: LectuerSchemaType[];
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [lectuerList, setLectuerList] = useState<LectuerSchemaType[]>();
  const [choosenLecture, setChoosenLectuer] = useState<LectuerSchemaType>();
  const [updatedLectuer, setUpdatedLectuer] = useState<LectuerSchemaType>();
  useEffect(() => {
    if (updatedLectuer && lectuers) {
      const updatedLectuers = lectuerList?.map((lectuer) => {
        if (lectuer.id === updatedLectuer.id) {
          return updatedLectuer;
        } else {
          return lectuer;
        }
      });
      setLectuerList(updatedLectuers);
    } else {
      setLectuerList(lectuers);
    }
  }, [lectuers, updatedLectuer]);
  const openEditModal = (lectuer: LectuerSchemaType) => {
    setChoosenLectuer(lectuer);
    setOpenEdit(true);
  };
  const openDeleteModal = (lectuer: LectuerSchemaType) => {
    setChoosenLectuer(lectuer);
    setOpenDelete(true);
  };
  const closeDeleteModal = () => {
    setOpenDelete(false);
  };
  const closeEditModal = () => {
    setOpenEdit(false);
  };
  const lectuerTableHeader: (keyof LectuerSchemaType)[] = [
    'id',
    'chapter_id',
    'video_id',
    'lecture_name',
    'created_at',
    'updated_at',
  ];
  return (
    <div>
      <Table
        hasDetails={true}
        detailsLink={'/lectuer/'}
        openDeleteModal={openDeleteModal}
        openEditModal={openEditModal}
        tableHeader={lectuerTableHeader}
        tableContent={lectuers}
      />
    </div>
  );
}
