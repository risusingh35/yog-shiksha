import React from "react";

interface PaginationProps {
  totalPage: number;
  totalItem: string;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  pageLimit: number;
  onLimitChange: (limit: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPage,
  currentPage,
  onPageChange,
  pageLimit,
  totalItem,
  onLimitChange,
}) => {
  const pageLimitArr = [5, 10, 20, 25, 50, 100, 200, 500, 1000];

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const limit = Number(event.target.value);
    onLimitChange(limit);
  };

  const renderPageNumbers = () => {
    const visiblePages: (number | string)[] = [];

    if (totalPage <= 5) {
      for (let i = 1; i <= totalPage; i++) {
        visiblePages.push(i);
      }
    } else {
      const maxVisible = 5;

      let start = currentPage - Math.floor(maxVisible / 2);
      start = Math.max(start, 1);
      let end = start + maxVisible - 1;
      if (end > totalPage) {
        end = totalPage;
        start = end - maxVisible + 1;
        start = Math.max(start, 1);
      }

      if (start > 1) {
        visiblePages.push(1);
        if (start > 2) visiblePages.push("...");
      }
      for (let i = start; i <= end; i++) {
        visiblePages.push(i);
      }
      if (end < totalPage) {
        if (end < totalPage - 1) visiblePages.push("...");
        visiblePages.push(totalPage);
      }
    }

    return visiblePages.map((number, index) => (
      <button
        key={index}
        onClick={() => typeof number === "number" && onPageChange(number)}
        className={`px-3 py-1 mx-1 rounded-full ${
          typeof number === "number" && number === currentPage
            ? "bg-white text-blue-500 font-bold"
            : "text-white hover:bg-white hover:text-blue-500"
        } ${typeof number === "string" ? "cursor-default" : ""}`}
      >
        {number}
      </button>
    ));
  };

  return (
    <div className="flex justify-between items-center w-full mx-5 bg-gray-700 ">
      <div className="flex justify-start items-center w-full">
        <div className="p-2.5 flex items-center justify-center rounded-md text-white mx-2 bg-blue-500">
          Total: {totalItem}
        </div>
        <div className="p-2.5 flex items-center justify-center rounded-md text-white mx-2 bg-blue-500">
          <select
            id="pageLimit"
            className="text-sm ml-1 focus:outline-none bg-blue-500 text-white px-2 py-1 rounded-md"
            value={pageLimit}
            onChange={handleLimitChange}
          >
            {pageLimitArr.map((limit) => (
              <option
                key={limit}
                value={limit}
                className="bg-blue-500 hover:bg-blue-600"
              >
                {limit}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-blue-500 my-2 py-2 px-4 rounded-lg flex items-center mx-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-white mx-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &lt;
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
          className="text-white mx-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
