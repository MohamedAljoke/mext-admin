import Signin from '@/App/Pages/Signin/Signin';
import PublicRoute from '@/App/hook/PublicRoute';
import React from 'react';

export default function SignInPage() {
  return <PublicRoute>
    <Signin />
  </PublicRoute>
}
