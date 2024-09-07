import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import Cricle from "./Cricle";
import { Link } from "react-router-dom";



interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}
export default function BlogCard({ id, authorName, title, content, publishedDate }: BlogCardProps) {

    const [readingTime, setReadingTime] = useState(0);
    const [publishedAt, setPublishedAt] = useState('');

    useEffect(() => {

        const wpm = 225;
        const words = content.trim().split(/\s+/).length;
        const time = Math.ceil(words / wpm);
        setReadingTime(time)


        const date = new Date(publishedDate);

        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        setPublishedAt(`${month[date.getMonth()]} ${date.getDay()} ${date.getFullYear()}`)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Link to={`/blog/${id}`}>
            <div className="p-4 w-screeb max-w-screen-md cursor-pointer">
                <div className="flex">
                    <div className="flex">
                        <Avatar authorName={authorName} />
                    </div>
                    <div className="text-sm font-extralight pl-2 flex justify-center flex-col">{authorName}</div>
                    <div className="flex justify-center flex-col pl-2 "><Cricle /></div>
                    <div className="pl-2 font-thin text-slate-500 text-sm justify-center flex-col" >{publishedAt}</div>
                </div>
                <div className=" text-xl font-semibold pt-2">
                    {title}
                </div>
                <div className=" text-md font-thin">
                    {content?.slice(0, 100) + "..."}
                </div>
                <div className=" text-slate-500 text-sm font-thin pt-2">
                    <p><span>{readingTime}</span> min read</p>
                </div>

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            </div>
        </Link>
    )
}
