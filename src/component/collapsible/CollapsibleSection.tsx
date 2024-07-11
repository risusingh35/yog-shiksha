import { useState,FC } from 'react';
interface CollapsibleSectionProps {
    title: string;
    content: string;
  }
  
  const CollapsibleSection: FC<CollapsibleSectionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200">
      <div
        className="flex justify-between items-center cursor-pointer font-medium bg-gray-200"
        onClick={toggleAccordion}
      >
        <div className="flex flex-col m-2">{title}</div>
        <div className="text-xl px-4 py-2">
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="text-neutral-600 mt-3 animate-fadeIn">
          <div className="w-full overflow-hidden rounded-lg">
            <div className="w-full overflow-x-auto">
              <table className="w-full bg-white">
                <thead>
                  <tr className="text-md font-semibold tracking-wide text-left text-gray-900 border-b">
                    <th className="px-4 py-3 border border-t-0 h-[60px] text-right">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-black-100 h-[60px] border border-r-0 border-l-0">
                    <td className="px-4 py-3 border h-[60px] text-right">
                      {content}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CollapsibleSection;