import { UserSchemaType } from '@/App/Schema/Users.Schema';
import Table from '@/App/components/Table/Table';
import React from 'react';

export default function Users({ users }: { users: UserSchemaType[] }) {
  const usersTableHeader = ['id', 'email', 'name'];
  return (
    <div>
      <Table tableHeader={usersTableHeader} tableContent={users} />
    </div>
  );
}
