import PrivateRoute from '@/App/hook/PrivateRoute';
import React from 'react';

export default function SubjectPage() {
  return (
    <PrivateRoute>
      <>Subject</>
    </PrivateRoute>
  );
}
