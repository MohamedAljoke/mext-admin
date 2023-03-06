import Videos from '@/App/Pages/Videos/Videos';
import PrivateRoute from '@/App/hook/PrivateRoute';
import React from 'react';

export default function VideosPage() {
  return (
    <PrivateRoute>
      <Videos />
    </PrivateRoute>
  );
}
