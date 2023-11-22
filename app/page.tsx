import CategoriesList from "@/components/CategoriesList";
import Post from "@/components/Post";
import { TPost } from "./types";

const getPosts = async (): Promise<TPost[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
      cache: "no-store",
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default async function Home() {
  const posts = await getPosts();
  return (
    <>
      <CategoriesList />
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            author={post.author.name}
            authorEmail={post.authorEmail}
            date={post.createdAt}
            thumbnail={post.imageUrl}
            category={post.catName}
            content={post.content}
            links={post.links || []}
            title={post.title}
          />
        ))
      ) : (
        <div className="py-6">No posts to display</div>
      )}
    </>
  );
}
