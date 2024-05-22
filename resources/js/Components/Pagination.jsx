import { Link } from "@inertiajs/react"

export default function pagination({links}){
    return (
        <div>
        <nav >
            <ul class="inline-flex -space-x-px text-sm">
                {links.map((link)=>(
                    <li>
                        <Link dangerouslySetInnerHTML={{__html: link.label}} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href={link.url}>

                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
      </div>
    )

}
