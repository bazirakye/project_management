import SelectInput from "@/Components/SelectInput";
import TableHead from "@/Components/TableHead";
import TextInput from "@/Components/TextInput";
import Pagination from "@/Components/Pagination";
import Checkbox from "@/Components/Checkbox";
import Dropdown from "@/Components/Dropdown";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_PRIORITY_CLASS_MAP,
} from "@/constants";
import { useState } from "react";

export default function Index({ auth, tasks, queryparams = null }) {
    queryparams = queryparams || {};

    const [visibleColumns, setVisibleColumns] = useState({
        id: true,
        name: true,
        description: true,
        status: true,
        priority: true,
        image: true,
        created_at: true,
        due_date: true,
        created_by: true,
        updated_by: true,
    });

    const handleColumnVisibilityChange = (column) => {
        setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
    };

    const selectAllColumns = (checked) => {
        const newVisibleColumns = {};
        for (const column in visibleColumns) {
            newVisibleColumns[column] = checked;
        }
        setVisibleColumns(newVisibleColumns);
    };

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryparams[name] = value;
        } else {
            delete queryparams[name];
        }
        router.get(route("tasks.index", queryparams));
    };

    const onKeyPress = (name, e) => {
        if (e.key === "Enter") {
            searchFieldChanged(name, e.target.value);
        } else {
            return;
        }
    };

    const sortField = (name) => {
        queryparams["sort"] = name;
        queryparams["order"] = queryparams["order"] === "asc" ? "desc" : "asc";
        router.get(route("tasks.index", queryparams));
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Tasks
                </h2>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="pb-4 flex flex-wrap">
                        <div className="flex mx-1 my-px">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                                        Select Columns
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content align="left">
                                    {/* select all */}
                                    <div className="px-4">
                                        <div className="flex items-center mb-2">
                                            <Checkbox
                                                checked={Object.values(
                                                    visibleColumns
                                                ).every(Boolean)}
                                                onChange={(e) =>
                                                    selectAllColumns(
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                            <span className="ml-2">
                                                Select All
                                            </span>
                                        </div>
                                    </div>

                                    {Object.keys(visibleColumns).map(
                                        (column) => (
                                            <div key={column} className="px-4">
                                                <div className="flex items-center mb-2">
                                                    <Checkbox
                                                        checked={
                                                            visibleColumns[
                                                                column
                                                            ]
                                                        }
                                                        onChange={() =>
                                                            handleColumnVisibilityChange(
                                                                column
                                                            )
                                                        }
                                                    />
                                                    <span className="ml-2">
                                                        {" "}
                                                        {column
                                                            .replace("_", " ")
                                                            .toUpperCase()}{" "}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                        <div className="flex mx-1 my-px">
                            <TextInput
                                placeholder="Task name"
                                defaultValue={queryparams.name}
                                onBlur={(e) =>
                                    searchFieldChanged("name", e.target.value)
                                }
                                onKeyPress={(e) => onKeyPress("name", e)}
                            />
                        </div>
                        <div className="flex mx-1 my-px">
                            <SelectInput
                                className="w-full"
                                defaultValue={queryparams.status}
                                onChange={(e) =>
                                    searchFieldChanged("status", e.target.value)
                                }
                            >
                                <option value="">Select status</option>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In progress</option>
                                <option value="completed">Completed</option>
                            </SelectInput>
                        </div>
                    </div>

                    <div className="mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-auto shadow-sm sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-layout: auto">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        {visibleColumns.id && (
                                            <TableHead
                                                name={"id"}
                                                sort={queryparams.sort}
                                                order={queryparams.order}
                                                sort_field={sortField}
                                            >
                                                ID
                                            </TableHead>
                                        )}
                                        {visibleColumns.name && (
                                            <TableHead
                                                name={"name"}
                                                sort={queryparams.sort}
                                                order={queryparams.order}
                                                sort_field={sortField}
                                            >
                                                Task name
                                            </TableHead>
                                        )}
                                        {visibleColumns.description && (
                                            <TableHead
                                                name={"description"}
                                                sort={queryparams.sort}
                                                order={queryparams.order}
                                                sort_field={sortField}
                                            >
                                                Description
                                            </TableHead>
                                        )}
                                        {visibleColumns.status && (
                                            <TableHead
                                                name={"status"}
                                                sort={queryparams.sort}
                                                order={queryparams.order}
                                                sort_field={sortField}
                                            >
                                                Status
                                            </TableHead>
                                        )}
                                        {visibleColumns.priority && (
                                            <TableHead
                                                name={"priority"}
                                                sort={queryparams.sort}
                                                order={queryparams.order}
                                                sort_field={sortField}
                                            >
                                                Priority
                                            </TableHead>
                                        )}
                                        {visibleColumns.image && (
                                            <TableHead
                                                name={"image"}
                                                sortable={false}
                                            >
                                                Image
                                            </TableHead>
                                        )}
                                        {visibleColumns.created_at && (
                                            <TableHead
                                                name={"created_at"}
                                                sort={queryparams.sort}
                                                order={queryparams.order}
                                                sort_field={sortField}
                                            >
                                                Created at
                                            </TableHead>
                                        )}
                                        {visibleColumns.due_date && (
                                            <TableHead
                                                name={"due_date"}
                                                sort={queryparams.sort}
                                                order={queryparams.order}
                                                sort_field={sortField}
                                            >
                                                Due date
                                            </TableHead>
                                        )}
                                        {visibleColumns.created_by && (
                                            <TableHead
                                                name={"created_by"}
                                                sort={queryparams.sort}
                                                order={queryparams.order}
                                                sort_field={sortField}
                                            >
                                                Created by
                                            </TableHead>
                                        )}
                                        {visibleColumns.updated_by && (
                                            <TableHead
                                                name={"updated_by"}
                                                sort={queryparams.sort}
                                                order={queryparams.order}
                                                sort_field={sortField}
                                            >
                                                Updated by
                                            </TableHead>
                                        )}
                                        <th className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.data.map((task) => (
                                        <tr
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            key={task.id}
                                        >
                                            {visibleColumns.id && (
                                                <td className="text-center">
                                                    {task.id}
                                                </td>
                                            )}
                                            {visibleColumns.name && (
                                                <td>{task.name}</td>
                                            )}
                                            {visibleColumns.description && (
                                                <td>{task.description}</td>
                                            )}
                                            {visibleColumns.status && (
                                                <td>
                                                    <span
                                                        className={
                                                            "px-2 py-1 rounded text-white " +
                                                            TASK_STATUS_CLASS_MAP[
                                                                task.status
                                                            ]
                                                        }
                                                    >
                                                        {
                                                            TASK_STATUS_TEXT_MAP[
                                                                task.status
                                                            ]
                                                        }
                                                    </span>
                                                </td>
                                            )}
                                            {visibleColumns.priority && (
                                                <td>
                                                    <span
                                                        className={
                                                            "px-2 py-1 rounded text-white " +
                                                            TASK_PRIORITY_CLASS_MAP[
                                                                task.priority
                                                            ]
                                                        }
                                                    >
                                                        {
                                                            TASK_PRIORITY_TEXT_MAP[
                                                                task.priority
                                                            ]
                                                        }
                                                    </span>
                                                </td>
                                            )}
                                            {visibleColumns.image && (
                                                <td>
                                                    <img
                                                        className="rounded-full w-20 h-20"
                                                        src={task.image_path}
                                                    />
                                                </td>
                                            )}
                                            {visibleColumns.created_at && (
                                                <td>{task.created_at}</td>
                                            )}
                                            {visibleColumns.due_date && (
                                                <td>{task.due_date}</td>
                                            )}
                                            {visibleColumns.created_by && (
                                                <td>{task.created_by.name}</td>
                                            )}
                                            {visibleColumns.updated_by && (
                                                <td>{task.updated_by.name}</td>
                                            )}
                                            <td>
                                                <Link
                                                    href={route(
                                                        "tasks.edit",
                                                        task.id
                                                    )}
                                                    className="font-medium text-blue dark:text-blue-500 hover:underline mx-1"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "tasks.destroy",
                                                        task.id
                                                    )}
                                                    className="font-medium text-red dark:text-red-500 hover:underline mx-1"
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Pagination links={tasks.meta.links} />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
