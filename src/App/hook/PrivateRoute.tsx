import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Spinner from '../components/Loading/Loader';
import Header from '../components/Header/Header';
import { tokenKey } from '../Utils/tokens';

interface Props {
  children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(true); //muda para true dps
  const router = useRouter();
  const handleComplete = () => {
    console.log(localStorage.getItem(tokenKey));
    const data = fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/auth/admin-refresh`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem(tokenKey),
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john.doe@example.com',
          message: 'This is a test message.',
        }),
      }
    )
      .then((data) => console.log('data', data))
      .catch((e) => {
        console.log('error', e);
        router.push('/signin');
      });

    return data;
  };
  useEffect(() => {
    async function checkIsLoggedIn() {
      handleComplete();
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
