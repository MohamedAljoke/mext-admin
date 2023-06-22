import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Spinner from '../components/Loading/Loader';
import Navigation from '../components/Navigation/Navigation';
import { AuthContext } from '../context/AuthContext';
interface Props {
  children: JSX.Element;
}
const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext)
  const router = useRouter();
  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/signin')
    }
  }, [user, isLoading])
  return isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <Spinner />
    </div>
  ) : (
    <>
      {user &&
        <Navigation user={user}>{children}</Navigation>
      }
    </>
  );
};

export default PrivateRoute;
