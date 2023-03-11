import { HiOutlineTrash } from 'react-icons/hi';
import { AiOutlineEdit } from 'react-icons/ai';
import { DateTime } from 'luxon';

interface TableProps<T extends { id: number }> {
  tableHeader: (keyof T)[];
  tableContent: T[];
  openEditModal: (data: T) => void;
  openDeleteModal?: (data: T) => void;
  showDelete?: boolean;
  showEdit?: boolean;
}

export default function Table<T extends { id: number }>({
  tableHeader,
  tableContent,
  openEditModal,
  openDeleteModal,
  showDelete = true,
  showEdit = true,
}: TableProps<T>) {
  return (
    <div className="mt-8 flow-root">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300  sm:px-6 lg:px-8">
            <thead>
              <tr>
                {tableHeader.map((item, idx) => {
                  return (
                    <th
                      key={idx}
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      {String(item)}
                    </th>
                  );
                })}
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tableContent.map((contentItem, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? undefined : 'bg-gray-50'}
                >
                  {tableHeader.map((item, idx) => {
                    if (item === 'created_at' || item === 'updated_at') {
                      const dateTime = DateTime.fromISO(
                        contentItem[item] as string
                      );
                      const formattedDateTime =
                        dateTime.toFormat('yyyy/MM/dd HH:mm');
                      return (
                        <td
                          key={idx}
                          className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900"
                        >
                          {formattedDateTime}
                        </td>
                      );
                    }
                    return (
                      <td
                        key={idx}
                        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900"
                      >
                        {String(contentItem[item])}
                      </td>
                    );
                  })}
                  <td className="flex justify-around relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <div
                      className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer"
                      onClick={() => openEditModal(contentItem)}
                    >
                      <div className="flex items-center">
                        <AiOutlineEdit className="mr-1" size={20} />
                        Edit
                        <span className="sr-only">, {idx}</span>
                      </div>
                    </div>
                    {showDelete && openDeleteModal && (
                      <div
                        onClick={() => openDeleteModal(contentItem)}
                        className="text-red-600 hover:text-indigo-900 hover:cursor-pointer"
                      >
                        <div className="flex items-center">
                          <HiOutlineTrash className="mr-1" size={20} />
                          Delete
                          <span className="sr-only">, {idx}</span>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
