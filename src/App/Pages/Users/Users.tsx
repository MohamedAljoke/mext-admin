import { UserSchemaType } from '@/App/Schema/Users.Schema';
import CustomModal from '@/App/components/Modal/Modal';
import Table from '@/App/components/Table/Table';
import { Dialog } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import EditUser from './EditUser/EditUser';

export default function Users({ users }: { users: UserSchemaType[] }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [usersList, setUsersList] = useState<UserSchemaType[]>();
  const [choosenUser, setChoosenUser] = useState<UserSchemaType>();
  const [updatedUser, setUpdatedUser] = useState<UserSchemaType>();

  const openModal = (user: UserSchemaType) => {
    setChoosenUser(user);
    setOpenEdit(true);
  };
  const closeModal = () => {
    setOpenEdit(false);
  };
  useEffect(() => {
    if (updatedUser && users) {
      const updatedUsers = users.map((user) => {
        if (user.id === updatedUser.id) {
          return updatedUser;
        } else {
          return user;
        }
      });
      setUsersList(updatedUsers);
    } else {
      setUsersList(users);
    }
  }, [users, updatedUser]);

  const tableHeader: (keyof UserSchemaType)[] = [
    'id',
    'email',
    'name',
    'created_at',
    'updated_at',
  ];
  return (
    <div>
      <CustomModal isOpen={openEdit} closeModal={closeModal}>
        <EditUser
          choosenUser={choosenUser}
          closeModal={closeModal}
          setUpdatedUser={setUpdatedUser}
        />
      </CustomModal>
      {usersList?.length ? (
        <Table<UserSchemaType>
          openModal={openModal}
          tableHeader={tableHeader}
          tableContent={usersList}
        />
      ) : (
        <h2>No users</h2>
      )}
    </div>
  );
}
