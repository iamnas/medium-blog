import { useParams } from "react-router-dom";
import AppBar from "../components/AppBar";
import FullBlog from "../components/FullBlog";
import { useBlog } from "../hooks";


export default function Blog() {

  const { id } = useParams();

  const { loading, blog } = useBlog({ id: id || "" })
  if (loading) {
    return (
      <div>
        <AppBar />

        <div className="p-4 animate-pulse ">
          <div className="grid grid-cols-12 px-10 w-full pt-200">
            <div className=" bg-gray-300 col-span-8">
              <div className="text-3xl font-extrabold bg-gray-300 "></div>
              <div className="text-3xl font-extrabold bg-gray-300 "></div>
            </div>
            <div className=" bg-gray-300 col-span-4">
              <div className="text-3xl font-extrabold bg-gray-300 "></div>
              <div className="text-3xl font-extrabold bg-gray-300 "></div>
            </div>
          </div>

        </div>
      </div>

    );
  }

  return (
    <div>
      {blog && <FullBlog blog={blog} />}
    </div>
  )
}
