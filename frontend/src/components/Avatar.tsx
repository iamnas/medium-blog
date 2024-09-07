
export default function Avatar({ authorName }: { authorName: string }) {
    return (


        <div className="ring-1 ring-gray-300 relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className=" font-xs text-gray-600 dark:text-gray-300">{authorName[0].toUpperCase()}</span>
        </div>

    )
}
