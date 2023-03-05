import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Spinner from '../components/Loading/Loader';
import Header from '../components/Header/Header';
import { saveToken } from '../Utils/tokens';
import { validateAndRefreshToken } from '../Services/Auth';

interface Props {
  children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(true); //muda para true dps
  const router = useRouter();
  const handleComplete = async () => {
    const refreshResponse = await validateAndRefreshToken({});
    setIsLoading(false);
    return refreshResponse;
  };
  useEffect(() => {
    async function checkIsLoggedIn() {
      try {
        const response = await handleComplete();
        setUser(response?.name!);
        saveToken(response?.token || '');
      } catch (e) {
        router.push('/signin');
      }
    }
    checkIsLoggedIn();
  }, []);
  return isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <Spinner />
    </div>
  ) : (
    <>
      <Header user={user} />
      {children}
    </>
  );
};

export default PrivateRoute;
