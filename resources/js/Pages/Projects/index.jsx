import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants';

export default function index({ auth, projects}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projects</h2>}
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-auto shadow-sm sm:rounded-lg">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-layout: auto">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr >
                                    <th class="px-6 py-3">Project Id</th>
                                    <th class="px-6 py-3">ProjectName</th>
                                    <th class="px-6 py-3">Project Description</th>
                                    <th class="px-6 py-3">Project status</th>
                                    <th class="px-6 py-3">Image</th>
                                    <th class="px-6 py-3">Created at</th>
                                    <th class="px-6 py-3">Due date</th>
                                    <th class="px-6 py-3">created by</th>
                                    <th class="px-6 py-3">Updated by</th>
                                    <th class="px-6 py-3">Action</th>

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
        </AuthenticatedLayout>
    );
}
