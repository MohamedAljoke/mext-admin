import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import Spinner from '../components/Loading/Loader';
import { AuthContext } from '../context/AuthContext';
interface Props {
  children: JSX.Element;
}
const PublicRoute: React.FC<Props> = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext)
  const router = useRouter();
  useEffect(() => {
    if (user && !isLoading) {
      router.push('/users')
    }
  }, [user, isLoading])
  return isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <Spinner />
    </div>
  ) : (
    <>
      {!user &&
        children
      }
    </>
  );
};

export default PublicRoute;
