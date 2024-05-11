import { TableColumn } from "../models/erc-components-types";

export interface TextFilterProps {
  column: TableColumn;
  onFilterChange: (col: TableColumn, value: string) => void;
}

export const ErcTextFilter = (props: TextFilterProps) => {
  return (
    <input
      placeholder="search"
      type="text"
      size={5}
      style={{ width: "100%", flexShrink: 1 }}
      className=" p-2 "
      onChange={(e: any) => props.onFilterChange(props.column, e.target.value)}
    />
  );
};
