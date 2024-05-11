import { useMemo, useState } from "react";
import { TableColumn } from "../models/erc-components-types";
import TableCell from "./ErcTableCell";
import { ErcTextFilter } from "../filters/ErcTextFilter";
import { tableRowStyles, tablestyles } from "../utils/style-utils";

export interface ErcTableProps {
  columns: TableColumn[];
  data: any[] | null;
  pageSize?: number;
}

const ErcTable = (args: ErcTableProps) => {
  //#region filters
  const [filters, setFilters] = useState<{ col: TableColumn; value: string }[]>(
    []
  );

  const filteredMemo = useMemo(() => {
    let collection = args.data ?? undefined;
    for (const f of filters) {
      if (f.col.filter?.type == "text") {
        collection = collection?.filter((x) =>
          (f.col.field(x).toString() as string)
            .toLowerCase()
            .includes(f.value.toLowerCase())
        );
      }
    }
    return collection;
  }, [args.data, filters]);

  const onFilterChange = (col: TableColumn, value: string) => {
    let newFilters = [...filters].filter((f) => f.col !== col);
    newFilters.push({ col, value });
    setPage(0);
    setFilters(newFilters);
  };
  //#endregion

  //#region pagination
  const pageSize = useMemo(() => args.pageSize ?? 10, [args.pageSize]);
  const [currentPage, setPage] = useState(0);
  const itemsForPage = useMemo(() => {
    const page = filteredMemo
      ? filteredMemo.slice(
          currentPage * pageSize,
          currentPage * pageSize + pageSize
        )
      : [];

    return page;
  }, [filteredMemo, pageSize, currentPage]);

  const getLastPage = () => {
    const itemsNUmber = filteredMemo?.length ?? 0;
    const numberOfPages = Math.ceil(itemsNUmber / pageSize);
    return numberOfPages - 1;
  };
  //#endregion

  return (
    <div>
      <div className="relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
        <table className=" text-left table-auto min-w-max">
          <thead>
            <tr>
              {args.columns.map((c, idx) => {
                return (
                  <th
                    key={idx}
                    className="p-4 border-b border-blue-gray-100 bg-blue-gray-50"
                    style={{ width: `${c.width}px` }}
                  >
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      {c.name}
                    </p>
                  </th>
                );
              })}
            </tr>

            {/* Filters row */}
            <tr>
              {args.columns.map((c, idx) => {
                return (
                  <th
                    key={idx}
                    className="p-1 border-b border-blue-gray-100 bg-blue-gray-50"
                  >
                    <p className="block font-sans text-sm font-normal leading-none text-blue-gray-900 mx-0 ">
                      {c.filter?.type == "text" ? (
                        <ErcTextFilter
                          column={c}
                          onFilterChange={onFilterChange}
                        />
                      ) : undefined}
                    </p>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {itemsForPage?.map((item) => {
              return (
                <tr key={item.id} className={tableRowStyles.tableRow}>
                  {args.columns.map((col, idx) => {
                    return <TableCell column={col} key={idx} item={item} />;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {(filteredMemo?.length ?? 0) <= -pageSize ? undefined : (
        // Pagination bar
        <div className="m-6 flex items-center justify-center">
          <button
            className={tablestyles.paginationBtn}
            onClick={() => setPage(0)}
          >
            first
          </button>
          <button
            disabled={currentPage === 0}
            className={
              currentPage > 0
                ? tablestyles.paginationBtn
                : tablestyles.paginationBtnDisabled
            }
            onClick={() => setPage(currentPage - 1)}
          >
            previous
          </button>
          <button className={tablestyles.paginationBtnDisabled}>
            {currentPage + 1}
          </button>
          <button
            disabled={currentPage == getLastPage()}
            className={
              currentPage == getLastPage()
                ? tablestyles.paginationBtnDisabled
                : tablestyles.paginationBtn
            }
            onClick={() =>
              setPage(
                currentPage < getLastPage() ? currentPage + 1 : currentPage
              )
            }
          >
            next
          </button>
          <button
            className={tablestyles.paginationBtn}
            onClick={() => {
              setPage(getLastPage());
            }}
          >
            last
          </button>
        </div>
      )}
    </div>
  );
};

export default ErcTable;
