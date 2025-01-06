import React, { useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { useTable, usePagination, useSortBy, useGlobalFilter } from "react-table";
import { _LoadingComponents } from "./_Loading";

const _Table = ({ title, entriesPerPage, table, pagination, searchQuery, loading }) => {
    const defaultValue = entriesPerPage.defaultValue || 10;
    const entries = entriesPerPage.entries || ["5", "10", "15", "20", "25"];
    const columns = useMemo(() => table.columns, [table]);

    // Filtrer les données en fonction de la recherche
    const filteredData = useMemo(() => {
        if (!searchQuery) return table.rows;
        return table.rows.filter(row => {
            return Object.values(row).some(val =>
                String(val).toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
    }, [table.rows, searchQuery]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        pageOptions,
        canPreviousPage,
        canNextPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        { columns, data: filteredData, initialState: { pageIndex: 0 } },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    useEffect(() => setPageSize(defaultValue), [defaultValue]);

    return (
        <div className="pt-2 animate-slideInUp">
            {/* Sélection du nombre d'entrées */}
            {entriesPerPage && (
                <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center">
                        <select
                            className="p-2 rounded cursor-pointer"
                            style={{ backgroundColor: 'var(--primary-3)', color: 'var(--text-color)' }}
                            value={pageSize}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                        >
                            {entries.map((entry) => (
                                <option key={entry} value={entry}>
                                    {entry}
                                </option>
                            ))}
                        </select>
                        <span className="ml-2" style={{ color: 'var(--text-color)' }}>entrées par page</span>
                    </div>
                </div>
            )}

            {/* Titre au-dessus du tableau */}
            {title && (
                <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 bg-blue-500 text-white font-bold text-lg text-left p-4 rounded-lg shadow-md w-[95%]">
                        {title}
                    </div>
                </div>
            )}


            {/* Tableau */}
            <div className="mt-8">  {/* Augmente la marge supérieure ici */}
                <table {...getTableProps()} className="min-w-full shadow-md rounded-xl overflow-hidden">
                    <thead className="text-[12px] font-extrabold"
                        style={{
                            color: 'var(--text-color)',
                            borderColor: 'var(--border-color)',
                            backgroundColor: 'var(--primary-3)'
                        }}>
                        {headerGroups.map((headerGroup, index) => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                                {headerGroup.headers.map((column, index) => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className={`px-4 pt-16 pb-3 text-left ${column.className} ${index === 0 ? 'rounded-tl-lg' : ''} ${index === headerGroup.headers.length - 1 ? 'rounded-tr-lg' : ''}`}
                                        key={column.id}
                                    >
                                        {column.render("Header").toUpperCase()}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? " 🔽"
                                                    : " 🔼"
                                                : ""}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    {loading ? (
                        <tbody>
                            <tr>
                                <td colSpan={columns.length}> <_LoadingComponents /> </td>
                            </tr>

                        </tbody>
                    ) : (
                        <tbody {...getTableBodyProps()}>
                            {page.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} key={row.id}
                                        className=""
                                        style={{
                                            color: 'var(--text-color)',
                                            borderColor: 'var(--border-color)',
                                            backgroundColor: 'var(--primary-3)'
                                        }}>
                                        {row.cells.map((cell, index) => (
                                            <td
                                                {...cell.getCellProps()}
                                                key={`${index}-${cell.column.id}`}
                                                className={`border-t text-sm ${cell.column.className}`}
                                                style={{
                                                    color: 'var(--text-color)',
                                                    borderColor: 'var(--border-color)',
                                                }}
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}

                </table>
            </div>


            {
                pagination && (
                    <div className="flex justify-between items-center mt-4">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                        >
                            Précédent
                        </button>

                        <span className=""
                            style={{
                                color: 'var(--text-color)',
                            }}>
                            Page {pageIndex + 1} de {pageOptions.length}
                        </span>

                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                        >
                            Suivant
                        </button>
                    </div>
                )
            }
        </div >
    );
};

_Table.propTypes = {
    title: PropTypes.string,  // Ajout de la prop title
    entriesPerPage: PropTypes.shape({
        defaultValue: PropTypes.number,
        entries: PropTypes.arrayOf(PropTypes.number),
    }),
    table: PropTypes.shape({
        columns: PropTypes.array.isRequired,
        rows: PropTypes.array.isRequired,
    }).isRequired,
    pagination: PropTypes.bool,
    searchQuery: PropTypes.string,
};

export default _Table;