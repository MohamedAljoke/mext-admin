import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { HiOutlineVideoCamera } from 'react-icons/hi';
import { MdFolder } from 'react-icons/md';
import {
  AiOutlineClose,
  AiFillFolderOpen,
  AiFillFolder,
  AiFillFilePdf,
  AiFillQuestionCircle,
} from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdPersonOutline, MdArrowBackIos } from 'react-icons/md';
import Header from '../Header/Header';
import Link from 'next/link';
import { IconType } from 'react-icons/lib';
import { useRouter } from 'next/router';
import CustomButton from '@/App/Shared/common/Button/Button';
import { FiType } from 'react-icons/fi';
import { UserAuthType } from '@/App/context/AuthContext';

type NavigationType = {
  name: string;
  icon: IconType;
  href: string;
  create: string;
  addButtonText: string;
  details?: string;
};

const navigation: NavigationType[] = [
  {
    name: 'Users',
    addButtonText: 'Add user',
    icon: MdPersonOutline,
    href: '/users',
    create: '#create',
  },
  {
    addButtonText: 'Add subject',
    name: 'Subjects',
    icon: AiFillFolder,
    href: '/subjects',
    create: '/subjects/create',
    details: '/subjects/:id',
  },
  {
    addButtonText: 'Add chapter',
    name: 'Chapters',
    icon: MdFolder,
    href: '/chapters',
    create: '/chapters/create',
    details: '/chapters/:id',
  },
  {
    addButtonText: 'Add lectuer',
    name: 'Lectuers',
    icon: AiFillFolderOpen,
    href: '/lectuers',
    create: '/lectuers/create',
  },
  {
    addButtonText: 'Add video',
    name: 'Videos',
    icon: HiOutlineVideoCamera,
    href: '/videos',
    create: '/videos/create',
  },
  {
    addButtonText: 'Add pdf',
    name: 'Pdfs',
    icon: AiFillFilePdf,
    href: '/pdfs',
    create: '/pdfs/create',
  },
  {
    addButtonText: 'Add question',
    name: 'Questions',
    icon: AiFillQuestionCircle,
    href: '/questions',
    create: '/questions/create',
  },
  {
    addButtonText: 'Add type',
    name: 'Types',
    icon: FiType,
    href: '/types',
    create: '/types/create',
  },
];

interface Props {
  children: JSX.Element;
  user: UserAuthType;
}

export default function Navigation({ user, children }: Props) {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentNavigationTab, setCurrentNavigationTab] =
    useState<NavigationType | null>(navigation[0]);
  useEffect(() => {
    const path = router.pathname;
    const choosenTab = navigation.find(
      (item) => item.href === path || item.create === path
    );
    if (!choosenTab) {
      setCurrentNavigationTab(null);
    } else {
      setCurrentNavigationTab(choosenTab);
    }
  }, [router.pathname]);

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className=" ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <AiOutlineClose
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                  <nav className="space-y-1 px-2">
                    {navigation.map((item, idx) => (
                      <Link key={idx} href={item.href}>
                        <div
                          key={item.name}
                          className={classNames(
                            item === currentNavigationTab
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'group flex items-center rounded-md px-2 py-2 text-base font-medium'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item === currentNavigationTab
                                ? 'text-gray-300'
                                : 'text-gray-400 group-hover:text-gray-300',
                              'mr-4 h-6 w-6 flex-shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </div>
                      </Link>
                    ))}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
          <div className="mt-16 flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item, idx) => (
                <Link key={idx} href={item.href}>
                  <div
                    key={item.name}
                    className={classNames(
                      item === currentNavigationTab
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'cursor-pointer group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item === currentNavigationTab
                          ? 'text-gray-300'
                          : 'text-gray-400 group-hover:text-gray-300',
                        'mr-3 h-6 w-6 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-darkBlue shadow">
          <button
            type="button"
            className=" px-4 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <GiHamburgerMenu className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex items-center">
            {/* Profile dropdown */}
            <Header user={user.name} setSidebarOpen={setSidebarOpen} />
          </div>
        </div>

        <main className="flex-1 ">
          <div className="py-6 lg:ml-60 px-16">
            <>
              {router.pathname === currentNavigationTab?.create && (
                <div className="flex items-center">
                  <CustomButton
                    customCss="flex items-center"
                    color="bg-[#6EB5D6]"
                    onClick={() => {
                      router.back();
                    }}
                    isSubmit={false}
                  >
                    <MdArrowBackIos />
                    back
                  </CustomButton>
                  <h1 className="ml-8 text-2xl text-center font-semibold text-gray-900">
                    Create Element
                  </h1>
                </div>
              )}
            </>
            <div className="">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
