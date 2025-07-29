import React from 'react';

interface DataTableProps {
  data: any[];
  columns: {
    key: string;
    label: string;
    render?: (value: any, row: any) => React.ReactNode;
  }[];
  onRowClick?: (row: any) => void;
  striped?: boolean;
  hover?: boolean;
  bordered?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ 
  data, 
  columns, 
  onRowClick, 
  striped = true, 
  hover = true, 
  bordered = false 
}) => {
  const tableClasses = [
    'table',
    striped && 'table-striped',
    hover && 'table-hover',
    bordered && 'table-bordered'
  ].filter(Boolean).join(' ');

  return (
    <div className="table-responsive">
      <table className={tableClasses}>
        <thead className="table-dark">
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? 'cursor-pointer' : ''}
            >
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable; 