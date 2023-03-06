import { UserSchemaType } from '@/App/Schema/Users.Schema';
import Table from '@/App/components/Table/Table';
import React from 'react';

export default function Users({ users }: { users: UserSchemaType[] }) {
  return (
    <div>
      <Table />
    </div>
  );
}
