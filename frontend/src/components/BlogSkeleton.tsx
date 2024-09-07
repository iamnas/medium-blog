
export default function BlogSkeleton() {
    return (

        <div className="p-4 w-screeb max-w-screen-md cursor-pointer">
            <div role="status" className="max-w-sm animate-pulse">
                <div className="flex">
                    <div className="flex">
                        <div className="h-2 w-4 bg-gray-200 rounded-full mb-4"></div>

                    </div>
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>

                </div>
                <div className=" text-xl font-semibold pt-2">
                    <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>

                </div>
                <div className=" text-md font-thin">
                    <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>

                </div>
                <div className=" text-slate-500 text-sm font-thin pt-2">

                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>

                </div>

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            </div>
            <span className="sr-only">Loading...</span>
        </div>



    )
}
