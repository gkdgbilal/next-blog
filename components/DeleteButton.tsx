"use client";
import toast from "react-hot-toast";

const DeleteButton = ({ id }: { id: string }) => {
  const deleteImage = async (publicId: string) => {
    const res = await fetch("/api/removeImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicId }),
    });
  };

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this post?");

    if (confirmed) {
      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const post = await res.json();
          const { publicId } = post;

          if (publicId) {
            await deleteImage(publicId);
          }

          toast.success("Post deleted successfully.");
          location.reload();
        }
      } catch (error) {
        toast.error("Something went wrong.");
        console.log(error);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:scale-105 transition"
    >
      Delete
    </button>
  );
};

export default DeleteButton;
