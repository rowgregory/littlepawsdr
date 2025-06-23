import { useRef, useState } from 'react';
import Draggable from './Draggable';

const usePagination = (totalItems: number) => {
  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    currentPage,
    nextPage,
    prevPage,
    goToPage,
    totalPages,
  };
};

const Pagination = ({ render, totalItems }: any) => {
  const { currentPage, nextPage, prevPage, goToPage, totalPages } = usePagination(totalItems ?? 0);
  const startIndex = (currentPage - 1) * 50;
  const endIndex = startIndex + 50;
  const scrollRef = useRef(null) as any;

  // Function to generate the pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];

    // Render buttons for the first 10 pages
    for (let i = 0; i < Math.min(totalPages, 10); i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i + 1)}
          className={`font-Matter-Regular text-gray-800 mr-1 w-8 h-8 border border-gray-100 hover:bg-gray-100 ${
            i + 1 === currentPage ? 'bg-gray-200' : ''
          }`}
        >
          {i + 1}
        </button>
      );
    }

    // Render the "..." if there are more than 10 pages
    if (totalPages > 10) {
      buttons.push(<span key='ellipsis'>...</span>);
    }

    // Render the last page button
    if (totalPages > 40) {
      buttons.push(
        <button
          key='lastPage'
          onClick={() => goToPage(totalPages)}
          className={`font-Matter-Regular text-gray-800 mr-1 w-8 h-8 border border-gray-100 hover:bg-gray-100 ${
            totalPages === currentPage ? 'bg-gray-200' : ''
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <>
      <Draggable scrollRef={scrollRef}>{render(startIndex, endIndex)}</Draggable>
      <div className={`${totalItems <= 20 ? 'hidden' : 'block'} centered-content flex justify-center items-center w-full mt-5 mb-3.5`}>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className='font-Matter-Regular text-gray-600 mr-1 w-8 h-8 hover:border hover:border-gray-200'
        >
          <i className='fas fa-chevron-left fa-sm'></i>
        </button>
        {renderPaginationButtons()}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className='font-Matter-Regular text-gray-800 w-8 h-8 hover:border hover:border-gray-200'
        >
          <i className='fas fa-chevron-right fa-sm'></i>
        </button>
      </div>
    </>
  );
};

export default Pagination;
