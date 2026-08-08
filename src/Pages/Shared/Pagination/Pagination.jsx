import React from 'react';

const Pagination = ({ page, setPage, totalPages }) => {
    return (
            <div className="flex justify-center items-center gap-2 mt-6">

  <button
    className="btn btn-sm"
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    Previous
  </button>

  {[...Array(totalPages)].map((_, index) => (
    <button
      key={index}
      onClick={() => setPage(index + 1)}
      className={`btn btn-sm ${
        page === index + 1 ? "btn-primary" : "btn-outline"
      }`}
    >
      {index + 1}
    </button>
  ))}

  <button
    className="btn btn-sm"
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
  >
    Next
  </button>

</div>
    );
};

export default Pagination;