'use client';
import { useAppSelector } from '@/app/store/hooks';
import { faComputer, faPerson } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function PersonnelProfile() {
  const personnel = useAppSelector((state) => state.personnel.profile);

  return (
    <div className="flex justify-center items-center min-h-[80vh] py-12 px-4 w-full space-x-5">
      <div>
        <div>
          <FontAwesomeIcon icon={faComputer} size="10x" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-semibold text-gray-800">
            Personnel Profile
          </h1>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between text-lg text-gray-700">
            <span className="font-medium">Personnel ID:</span>
            <span>{personnel?.id}</span>
          </div>
          <div className="flex justify-between text-lg text-gray-700">
            <span className="font-medium">Email:</span>
            <span>{personnel?.email}</span>
          </div>
          <div className="flex justify-between text-lg text-gray-700">
            <span className="font-medium">Name:</span>
            <span>{personnel?.name}</span>
          </div>
        </div>
      </div>
      <div>
        <div>
          <FontAwesomeIcon icon={faPerson} size="10x" />
        </div>
      </div>
    </div>
  );
}
