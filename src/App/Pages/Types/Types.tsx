import CustomModal from '@/App/components/Modal/Modal';
import Table from '@/App/components/Table/Table';
import React, { useEffect, useState } from 'react';
import DeleteElement from '@/App/components/DeleteContainer/DeleteContainer';
import EditElement from '@/App/components/EditElement/EditElement';
import { SubmitHandler } from 'react-hook-form';
import { popSucess } from '@/App/components/PopUp/popSuccess';
import { popError } from '@/App/components/PopUp/popError';
import Link from 'next/link';
import CustomButton from '@/App/Shared/common/Button/Button';
import {
  EditTypeSchema,
  EditTypeSchemaType,
  TypeSchemaType,
} from '@/App/Schema/Types.schema';
import { deleteType, updateType } from '@/App/Services/Type';

export default function Types({ types }: { types: TypeSchemaType[] }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [typeList, setTypeList] = useState<TypeSchemaType[]>();
  const [choosenType, setChoosenType] = useState<TypeSchemaType>();
  const [updatedType, setUpdatedType] = useState<TypeSchemaType>();
  const subjectTableHeader: (keyof TypeSchemaType)[] = [
    'id',
    'type_name',
    'created_at',
    'updated_at',
  ];
  useEffect(() => {
    if (updatedType && types) {
      const updatedTypes = typeList?.map((type) => {
        if (type.id === updatedType.id) {
          return updatedType;
        } else {
          return type;
        }
      });
      setTypeList(updatedTypes);
    } else {
      setTypeList(types);
    }
  }, [types, updatedType]);

  //modals
  const openEditModal = (subject: TypeSchemaType) => {
    setChoosenType(subject);
    setOpenEdit(true);
  };
  const deleteItem = async (item: TypeSchemaType) => {
    try {
      await deleteType(item.id);
      popSucess('Item deleted');
      const newTypeList = typeList?.filter((type) => type.id !== item.id);
      setTypeList(newTypeList);
    } catch (e) {
      popError('error deleting item');
    }
    setOpenDelete(false);
  };

  const openDeleteModal = (type: TypeSchemaType) => {
    setChoosenType(type);
    setOpenDelete(true);
  };
  const closeDeleteModal = () => {
    setOpenDelete(false);
  };
  const closeEditModal = () => {
    setOpenEdit(false);
  };
  //edit
  const onSubmit: SubmitHandler<EditTypeSchemaType> = async (data) => {
    if (!choosenType) {
      throw Error('no type');
    }
    try {
      const response = await updateType({
        type: { ...choosenType, ...data },
      });
      setUpdatedType({
        ...choosenType,
        type_name: response.type_name,
      });
      popSucess('Type Updated');

      closeEditModal();
    } catch (e) {
      console.log(e);
      popError('try again later');
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <>
          <h1 className="text-2xl font-semibold text-gray-900">Types</h1>
          <Link href="/types/create">
            <CustomButton isSubmit={false}>Add subject</CustomButton>
          </Link>
        </>
      </div>
      <CustomModal isOpen={openEdit} closeModal={closeEditModal}>
        <EditElement<EditTypeSchemaType, typeof EditTypeSchema>
          items={[
            {
              name: 'type_name',
              placeholder: 'Type',
              label: 'Type',
            },
          ]}
          onSubmit={onSubmit}
          choosenElement={choosenType}
          closeModal={closeEditModal}
          itemSchema={EditTypeSchema}
        />
      </CustomModal>
      <CustomModal isOpen={openDelete} closeModal={closeDeleteModal}>
        <DeleteElement<TypeSchemaType>
          deleteItem={deleteItem}
          element={choosenType!}
          closeDeleteModal={closeDeleteModal}
        />
      </CustomModal>
      {typeList ? (
        <Table<TypeSchemaType>
          hasDetails={true}
          detailsLink={'/subject/'}
          openDeleteModal={openDeleteModal}
          openEditModal={openEditModal}
          tableHeader={subjectTableHeader}
          tableContent={typeList}
        />
      ) : (
        <h2>No Subjects</h2>
      )}
    </div>
  );
}
