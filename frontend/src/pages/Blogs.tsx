
import AppBar from '../components/AppBar'
import BlogCard from '../components/BlogCard'
import BlogSkeleton from '../components/BlogSkeleton';
import { useBlogs } from '../hooks'


export default function Blogs() {

  const { loading, blogs } = useBlogs();

  if (loading ) {
    return (
      <div>
        <AppBar />

        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
      </div>
    );
  }
  return (
    <div>
      <AppBar />
      <div className='flex justify-center'>
        <div className=''>
          {blogs?.map(blog => (

            <BlogCard key={blog.id} id={blog.id} authorName={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} publishedDate={blog.createdAt} />
          ))}

        </div>
      </div>
    </div>
  )
}
