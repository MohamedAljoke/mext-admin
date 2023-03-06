import { UserSchemaType } from '@/App/Schema/Users.Schema';
import React from 'react';

export default function Users({ users }: { users: UserSchemaType[] }) {
  console.log(users);
  return (
    <div>
      {users?.map((user) => {
        return <p key={user.id}>{user.name}</p>;
      })}
    </div>
  );
}
