import SelectInput from "@/Components/SelectInput";
import TableHead from "@/Components/TableHead";
import TextInput from "@/Components/TextInput";
import Pagination from "@/Components/Pagination";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP, TASK_PRIORITY_TEXT_MAP, TASK_PRIORITY_CLASS_MAP} from '@/constants';



export default function index({auth, tasks, queryparams = null, }){
    queryparams = queryparams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryparams[name] = value;
        }else {
            delete queryparams[name];
        }
        router.get(route('tasks.index', queryparams));
    }
    const onKeyPress = (name, e) => {
        if (e.key === 'Enter') {
            searchFieldChanged(name, e.target.value)
        }else{
            return;
        }
    }

    const sortField = (name) =>{
        queryparams['sort'] = name;
        queryparams['order'] = queryparams['order'] === 'asc'? 'desc' : 'asc';
        router.get(route('tasks.index', queryparams));
    }

    return(
        <Authenticated
            user = {auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Taks</h2>}
        >
            <Head title="Tasks" />


            <div className="py-12">
                <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div class="pb-4 flex flex-wrap">
                        <div class="flex mx-1 my-px">
                            <TextInput placeholder="Task name" defaultValue = {queryparams.name} onBlur = {e=>searchFieldChanged('name', e.target.value)} onKeyPress = {e => onKeyPress('name', e)}/>
                        </div>
                        <div class="flex mx-1 my-px">
                            <SelectInput className = 'w-full' defaultValue = {queryparams.status} onChange = {e=> searchFieldChanged('status', e.target.value)}>
                            <option value="">Select status</option>
                            <option value="pending">Pending</option>
                            <option value="In_progress">In progress</option>
                            <option value="completed">Completed</option>

                            </SelectInput>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-auto shadow-sm sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-layout: auto">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr >
                                        <TableHead name={'id'} sort={queryparams.sort} order={queryparams.order} sort_field = {sortField}>
                                            ID
                                        </TableHead>

                                        <TableHead name={'name'} sort={queryparams.sort} order={queryparams.order} sort_field = {sortField}>
                                            Task name
                                        </TableHead>

                                        <TableHead name={'description'} sort={queryparams.sort} order={queryparams.order} sort_field = {sortField}>
                                            Description
                                        </TableHead>

                                        <TableHead name={'status'} sort={queryparams.sort} order={queryparams.order} sort_field = {sortField}>
                                            Status
                                        </TableHead>

                                        <TableHead name={'priority'} sort={queryparams.sort} order={queryparams.order} sort_field = {sortField}>
                                            Priority
                                        </TableHead>

                                        <TableHead name={'image'} sortable = {false} >
                                            Image
                                        </TableHead>

                                        <TableHead name={'created_at'} sort={queryparams.sort} order={queryparams.order} sort_field = {sortField}>
                                            Created at
                                        </TableHead>

                                        <TableHead name={'due_date'} sort={queryparams.sort} order={queryparams.order} sort_field = {sortField}>
                                            Due date
                                        </TableHead>

                                        <TableHead name={'created_by'} sort={queryparams.sort} order={queryparams.order} sort_field = {sortField}>
                                            Created by
                                        </TableHead>

                                        <TableHead name={'updated_by'} sort={queryparams.sort} order={queryparams.order} sort_field = {sortField}>
                                            Updated by
                                        </TableHead>
                                        <th className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.data.map((task) =>(
                                        <tr bg-white border-b dark:bg-gray-800 dark:border-gray-700  key={task.id}>
                                            <td className='text-center'>{task.id}</td>
                                            <td>{task.name}</td>
                                            <td>{task.description}</td>
                                            <td><span className={"px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]}>{TASK_STATUS_TEXT_MAP[task.status]}</span></td>
                                            <td><span className={"px-2 py-1 rounded text-white " + TASK_PRIORITY_CLASS_MAP[task.priority]}>{TASK_PRIORITY_TEXT_MAP[task.priority]}</span></td>
                                            <td><img class="rounded-full w-20 h-20" src={task.image_path}/></td>
                                            <td>{task.created_at}</td>
                                            <td>{task.due_date}</td>
                                            <td>{task.created_by.name}</td>
                                            <td>{task.updated_by.name}</td>
                                            <td>
                                                <Link href={route('tasks.edit', task.id)} className="font-medium text-blue dark:text-blue-500 hover:underline mx-1">
                                                    Edit
                                                </Link>
                                                <Link href={route('tasks.destroy', task.id)} className="font-medium text-red dark:text-red-500 hover:underline mx-1">
                                                    Delete
                                                </Link>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Pagination links={tasks.meta.links}/>


                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
