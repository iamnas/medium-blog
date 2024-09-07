import { Blog } from "../hooks"
import AppBar from "./AppBar"
import Avatar from "./Avatar"

export default function FullBlog({ blog }: { blog: Blog }) {
    const formattedDate = blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Unknown Date';
    
    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div className='grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-10'>
                    <div className=' col-span-8'>
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-400 pt-2">
                            Posted on {formattedDate}
                        </div>
                        <div className="">
                            {blog.content}
                        </div>
                    </div>
                    <div className=' col-span-4'>
                        <div className="text-slate-600 text-lg">
                            Author
                        </div>
                        <div className="flex w-full">
                            <div className="pr-4 flex flex-col justify-center">
                                <Avatar authorName={blog.author.name || "Anono"} />
                            </div>
                            <div>
                                <div className="text-xl font-bold ">
                                    {blog.author.name || "Anono"}
                                </div>
                                <div className="pt-1 text-slate-500">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, atque!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
