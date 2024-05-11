import { TableColumn } from "../models/erc-components-types";

export interface TableCellProps {
  column: TableColumn;
  item: any;
}

const TableCell = (args: TableCellProps) => {
  const tdBaseClass = "p-4 border-b border-blue-gray-50 ";

  const handleClick = () => {
    if (args.column.onClicked) {
      args.column.onClicked(args.item);
    }
  };

  return (
    <td
      className={
        tdBaseClass +
        (args.column.onClicked
          ? " cursor-pointer hover:underline text-center max-w-[120px]"
          : "")
      }
      onClick={args.column.onClicked ? handleClick : undefined}
    >
      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
        {args.column.field(args.item)?.toString()}
      </p>
    </td>
  );
};

export default TableCell;
