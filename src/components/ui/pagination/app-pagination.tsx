import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../pagination";
import { cn } from "@/lib/utils";

type AppPaginationProps = {
  classname?: string;
  page: number;
  onPageChange: (page: number) => void;
  totalPage: number;
};
export const AppPagination = ({
  classname,
  page,
  onPageChange,
  totalPage,
}: AppPaginationProps) => {
  const pageNumbers = (): number[] => {
    return Array.from({ length: totalPage }, (_, i) => i + 1);
  };

  return (
    <>
      <Pagination className={cn("text-white", classname)}>
        <PaginationContent>
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) onPageChange(page - 1);
              }}
              aria-disabled={page === 1}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {pageNumbers().map((i) => {
            return (
              <PaginationItem
                className="cursor-pointer"
                onClick={() => onPageChange(i)}
                key={i}
              >
                <PaginationLink isActive={page === i}>{i}</PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem className="cursor-pointer">
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page <= totalPage) onPageChange(page + 1);
              }}
              aria-disabled={page === totalPage}
              className={
                page === totalPage ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};
