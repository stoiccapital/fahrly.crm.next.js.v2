"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { Card } from "./Card";

type Align = "left" | "center" | "right";

export type DataTableColumn<T> = {
  id: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  align?: Align;
  widthClass?: string;
};

export type DataTableProps<T> = {
  title?: string;
  subtitle?: string;
  columns: DataTableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  toolbar?: React.ReactNode;
};

function getAlignClass(align: Align = "left") {
  switch (align) {
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    default:
      return "text-left";
  }
}

export function DataTable<T>({
  title,
  subtitle,
  columns,
  data,
  isLoading,
  emptyMessage = "No data.",
  onRowClick,
  toolbar,
}: DataTableProps<T>) {
  const rows = Array.isArray(data) ? data : [];

  // 🔍 Debug log
  console.log("📊 DataTable render", {
    title,
    rowsCount: rows.length,
    rowsPreview: rows.slice(0, 2),
  });

  const hasRows = rows.length > 0;

  return (
    <Card className="flex flex-col gap-4 p-4">
      {(title || subtitle || toolbar) && (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title && (
              <h2 className="text-base font-semibold text-slate-900">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500">{subtitle}</p>
            )}
            {/* 👇 Visible debug info */}
            <p className="mt-1 text-[10px] uppercase tracking-wide text-slate-400">
              Rows: {rows.length}
            </p>
          </div>
          {toolbar && <div className="flex items-center gap-2">{toolbar}</div>}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={cn(
                    "px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500",
                    getAlignClass(col.align),
                    col.widthClass
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <>
                {Array.from({ length: 3 }).map((_, idx) => (
                  <tr key={idx} className="border-b border-slate-100">
                    {columns.map((col) => (
                      <td
                        key={col.id}
                        className={cn(
                          "px-3 py-3",
                          getAlignClass(col.align)
                        )}
                      >
                        <div className="h-3 rounded-full bg-slate-100" />
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            )}

            {!isLoading && hasRows && (
              <>
                {rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={cn(
                      "border-b border-slate-100",
                      onRowClick &&
                        "cursor-pointer hover:bg-slate-50 transition-colors"
                    )}
                    onClick={() => onRowClick?.(row)}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.id}
                        className={cn(
                          "px-3 py-3 align-middle text-slate-700",
                          getAlignClass(col.align)
                        )}
                      >
                        {col.cell(row)}
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            )}

            {!isLoading && !hasRows && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 py-6 text-center text-sm text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

