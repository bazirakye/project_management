import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

export default function TableHead({name, sortable =true, children, sort_field=()=>{}, sort= null, order = null}){
    return(
        <th className="px-6 py-3" onClick={(e) =>  sort_field(name)}>
        <div className="flex items-center gap-1 cursor-pointer">
            <span>{children}</span>
            {sortable && (
                <div className="flex flex-col items-center">
                    <ChevronUpIcon className={"w-4 "+ (sort === name && order ==='asc'?'text-white ': '')} />
                    <ChevronDownIcon className={"w-4 -mt-2 "+ (sort === name && order ==='desc'?'text-white ': '')} />
                </div>
            )}
        </div>
    </th>
    )
}
