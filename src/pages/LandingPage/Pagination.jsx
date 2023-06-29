import React from 'react';
import { ButtonGroup, Button } from '@chakra-ui/react';

const Pagination = ({ currentPage, cardsPerPage, totalCards, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ButtonGroup mt={4} isAttached>
      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          variant={pageNumber === currentPage ? 'solid' : 'outline'}
        >
          {pageNumber}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default Pagination;