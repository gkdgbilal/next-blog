import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Post from "@/components/Post";
import { TPost } from "../types";

const getPosts = async (email: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authors/${email}`);
    const { posts } = await res.json();

    return posts;
  } catch (error) {
    return null;
  }
};

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  let postsData = [];

  if (!session) redirect("/sign-in");

  if (email) {
    postsData = await getPosts(email);
  }

  return (
    <div>
      <h1>My Posts</h1>
      {postsData && postsData.length > 0 ? (
        postsData.map((post: TPost) => (
          <Post
            key={post.id}
            id={post.id}
            author={""}
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
        <div className="py-6">
          No posts created yet.
          <Link className="underline" href="/create-post">
            Create New
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
