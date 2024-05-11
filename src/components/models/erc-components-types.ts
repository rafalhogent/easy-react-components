export interface TableCellProps {}

export interface TableColumn {
  name?: string;
  field: (arg: any) => string | number | any | undefined;
  onClicked?: (item: any) => void;
  width?: number;
  filter?: ColumnFilter
}

export interface ColumnFilter {
  type: 'text' | 'numeric' | 'combo'
  comboElements?: any[]
}

export interface ColumnFilterValue {
  
}