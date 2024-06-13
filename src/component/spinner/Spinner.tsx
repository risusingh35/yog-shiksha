import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";

interface SpinnerProps {
  text: string;
  closedIn: number;
  onClose: () => void;
  isShow: boolean; 
}

const Spinner: React.FC<SpinnerProps> = ({
  text = "Loading",
  closedIn = 15000,
  onClose,
  isShow
}) => {
  const [isVisible, setIsVisible] = useState(isShow);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, closedIn);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };
  console.log({isVisible});
  
  if (!isVisible) return null;
  return (
    <>
       <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
          <div className="bg-gray-800 bg-opacity-50 absolute inset-0 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg relative">
              <span className="text-lg font-semibold mb-4">{text}</span>
              <button
                className="absolute top-0 right-0 -mt-1 -mr-1 bg-white text-red-600 rounded-full hover:text-gray-800 focus:outline-none"
                onClick={handleClose}
              >
                <IoIosClose className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
    </>
  );
};

export default Spinner;
