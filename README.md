# Easy React Components

This template provides simple designed React components using [Tailwind CSS](https://tailwindcss.com/)

 No extra package installation needed. Just copy, eventually provide own css styles.


- **Table** (EsrTable) with column text filter and pagination
   - properties:
    ```typescript
      columns: TableColumn[];
      data: any[] | null; // collection of data items
      pageSize?: number;
    ```
    - TableColumn :
    ```typescript
      name?: string;  // column name
      field: // callback returning cell value 
      onClicked?: // callback action executed on click event;
      width?: number // fixed column width;
      filter?: ColumnFilter // 'text' | 'numeric' | 'combo'
    ```