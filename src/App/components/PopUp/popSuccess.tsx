import { CheckCircle } from 'phosphor-react';
import { ReactNode } from 'react';
import { toast } from 'react-toastify';

const popSucess = (text: ReactNode) => {
  return toast.success(text, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    icon: <CheckCircle className='w-6 h-6' />,
    style: { backgroundColor: '#62BD87', color: 'white' },
    progressStyle: { backgroundColor: 'white' },
  });
};

export { popSucess };
