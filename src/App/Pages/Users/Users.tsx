import { UserSchemaType } from '@/App/Schema/Users.Schema';
import CustomModal from '@/App/components/Modal/Modal';
import Table from '@/App/components/Table/Table';
import { Dialog } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import EditUser from './EditUser/EditUser';
import DeleteUser from './DeleteUser/DeleteUser';

export default function Users({ users }: { users: UserSchemaType[] | undefined }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [usersList, setUsersList] = useState<UserSchemaType[]>();
  const [choosenUser, setChoosenUser] = useState<UserSchemaType>();
  const [updatedUser, setUpdatedUser] = useState<UserSchemaType>();
  const openEditModal = (user: UserSchemaType) => {
    setChoosenUser(user);
    setOpenEdit(true);
  };
  const closeEditModal = () => {
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
      <CustomModal isOpen={openEdit} closeModal={closeEditModal}>
        <EditUser
          choosenUser={choosenUser}
          closeModal={closeEditModal}
          setUpdatedUser={setUpdatedUser}
        />
      </CustomModal>
      {usersList?.length ? (
        <Table<UserSchemaType>
          showDelete={false}
          openEditModal={openEditModal}
          tableHeader={tableHeader}
          tableContent={usersList}
        />
      ) : (
        <h2>No users</h2>
      )}
    </div>
  );
}
