import { PostType } from "@/types";
import Image from "next/image";
import Link from "next/link";

async function fetchAllBlogs(){
  const res = await fetch(`http://localhost:3000/api/blog`,{
    cache: "no-store",//SSR
  });

  const data = await res.json();

  return data.posts;
}


export default async function Home() {
  const posts = await fetchAllBlogs();
  return(
<main className="w-full h-full">
  <div className="md:w-2/4 sm:w-2/4 m-auto p-4 my-5 rounded-lg bg-green-600 drop-shadow-xl">
    <h1 className="text-slate-100 text-center text-2xl font-extrabold">
      Full Stack Blog 📝
    </h1>
  </div>

  {/* Link */}
  <div className="flex my-5">
    <Link
      href={"/blog/add"}
      className="md:w-1/6 sm:w-4/4 text-center rounded-md p-2 m-auto bg-orange-300 font-semibold text-slate-500"
    >
      ブログ新規作成
    </Link>
  </div>

  <div className="w-full flex flex-col justify-center items-center">
    {posts.map((post: PostType) => (
          <div 
          key={posts.id}
          className="w-3/4 p-4 rounded-md mx-3 my-2 bg-orange-100 flex flex-col justify-center">
          <div className="flex items-center my-3">
            <div className="mr-auto">
              <h2 className="mr-auto font-semibold text-slate-500">
                {post.title}
                </h2>
            </div>
            <Link
              href={`/blog/edit/${post.id}`}
              className="px-4 py-1 text-center text-xl bg-green-300 rounded-md font-semibold text-slate-500"
            >
              編集
            </Link>
          </div>
    
          <div className="mr-auto my-1">
            <blockquote className="font-bold text-slate-500">
              {new Date(post.date).toDateString()}
            </blockquote>
          </div>
    
          <div className="mr-auto my-1">
            <h2 className="text-slate-500 ">
              {post.description}
            </h2>
          </div>
        </div>
    ))}
  </div>
</main>
  );
}