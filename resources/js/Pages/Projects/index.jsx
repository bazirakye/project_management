import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import TableHead from '@/Components/TableHead';

export default function index({ auth, projects, queryparams=null,}) {
    queryparams = queryparams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryparams[name] = value;
        }else {
            delete queryparams[name];
        }
        router.get(route('projects.index', queryparams));
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
        router.get(route('projects.index', queryparams));
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projects</h2>}
        >
            <Head title="Projects" />

            <div className="py-12">
            <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">

                <div class="pb-4 flex flex-wrap">
                    <div class="flex mx-1 my-px">
                        <TextInput placeholder="project name" defaultValue = {queryparams.name} onBlur = {e=>searchFieldChanged('name', e.target.value)} onKeyPress = {e => onKeyPress('name', e)}/>
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
                                        Project name
                                    </TableHead>

                                    <TableHead name={'description'} sort={queryparams.sort} order={queryparams.order} sort_field = {sortField}>
                                        Description
                                    </TableHead>

                                    <TableHead name={'status'} sort={queryparams.sort} order={queryparams.order} sort_field = {sortField}>
                                        Status
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
                                {projects.data.map((project) =>(
                                    <tr bg-white border-b dark:bg-gray-800 dark:border-gray-700  key={project.id}>
                                        <td className='text-center'>{project.id}</td>
                                        <td>{project.name}</td>
                                        <td>{project.description}</td>
                                        <td><span className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}>{PROJECT_STATUS_TEXT_MAP[project.status]}</span></td>
                                        <td><img class="rounded-full w-20 h-20" src={project.image_path}/></td>
                                        <td>{project.created_at}</td>
                                        <td>{project.due_date}</td>
                                        <td>{project.created_by.name}</td>
                                        <td>{project.updated_by.name}</td>
                                        <td>
                                            <Link href={route('projects.edit', project.id)} className="font-medium text-blue dark:text-blue-500 hover:underline mx-1">
                                                Edit
                                            </Link>
                                            <Link href={route('projects.destroy', project.id)} className="font-medium text-red dark:text-red-500 hover:underline mx-1">
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination links={projects.meta.links}/>
                </div>
            </div>
            </div>
        </AuthenticatedLayout>
    );
}
