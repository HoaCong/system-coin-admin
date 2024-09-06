import React from "react";
import Pagination from "react-bootstrap/Pagination";

function CustomPagination({ totalItems, perPage, onPageChange, currentPage }) {
  const totalPages = Math.ceil(totalItems / perPage);
  const pagesToShow = [];

  if (totalPages <= 3) {
    // Nếu có tối đa 3 trang, hiển thị tất cả
    for (let page = 1; page <= totalPages; page++) {
      pagesToShow.push(page);
    }
  } else {
    // Nếu có nhiều hơn 3 trang
    if (currentPage <= 2) {
      // Hiển thị 3 trang đầu
      for (let page = 1; page <= 3; page++) {
        pagesToShow.push(page);
      }
    } else if (currentPage >= totalPages - 1) {
      // Hiển thị 3 trang cuối
      for (let page = totalPages - 2; page <= totalPages; page++) {
        pagesToShow.push(page);
      }
    } else {
      // Hiển thị trang hiện tại và 2 trang xung quanh
      for (let page = currentPage - 1; page <= currentPage + 1; page++) {
        pagesToShow.push(page);
      }
    }
  }

  return (
    totalPages > 1 && (
      <div>
        <div className="d-flex justify-content-center">
          <Pagination className="mb-0">
            <Pagination.First onClick={() => onPageChange(1)} />
            <Pagination.Prev
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {pagesToShow.map((page) => (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => onPageChange(page)}
              >
                {page}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last onClick={() => onPageChange(totalPages)} />
          </Pagination>
        </div>
      </div>
    )
  );
}

export default CustomPagination;
