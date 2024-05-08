"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useTheme } from "@/context/theme";
import editorDarkCss from "@/utils/editorDarkCss";
import toast from "react-hot-toast";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const { theme } = useTheme();
  // blog
  const [id, setId] = useState(""); // added for blog update
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  // tags
  const [tagName, setTagName] = useState("");
  const [tags, setTags] = useState([]);
  // selected tags
  const [selectedTags, setSelectedTags] = useState([]);
  // featured image
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  // multi step form
  const [step, setStep] = useState(1);
  // tag update
  const [updatingTag, setUpdatingTag] = useState(null);
  // blogs
  const [blogs, setBlogs] = useState([]);
  // pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // for multi steps
  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);
  const current = (n, condition = true) =>
    step >= n && condition ? "✅" : null;

  useEffect(() => {
    const customStyle = document.createElement("style");
    customStyle.classList.add("editor-dark-theme"); // Add a class for identification
    customStyle.innerHTML = editorDarkCss;

    const existingStyle = document.querySelector(".editor-dark-theme");
    if (theme === "dark") {
      if (!existingStyle) {
        document.head.appendChild(customStyle);
      }
    } else {
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    }
  }, [theme]);

  // Load the content from local storage on component mount
  useEffect(() => {
    if (!id) {
      const savedTitle = localStorage.getItem("savedTitle");
      const savedMarkdown = localStorage.getItem("savedMarkdown");
      if (savedTitle && savedMarkdown) {
        setTitle(savedTitle);
        setMarkdown(savedMarkdown);
      }
    }
  }, []);

  // Save the content to local storage whenever it changes
  useEffect(() => {
    if (!id) {
      localStorage.setItem("savedTitle", title);
      localStorage.setItem("savedMarkdown", markdown);
    }
  }, [title, markdown]);

  // tags
  const tagCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.API}/crud/tag`, {
        method: "POST",
        body: JSON.stringify({ name: tagName }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.err);
      } else {
        setTags([data, ...tags]);
        setTagName("");
        toast.success("Tag created");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const tagList = async () => {
    try {
      const response = await fetch(`${process.env.API}/tags`, {
        method: "GET",
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.err);
      } else {
        setTags(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const tagUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.API}/crud/tag/${updatingTag?._id}`,
        {
          method: "PUT",
          body: JSON.stringify({ name: tagName }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.err);
      } else {
        // Find the index of the old tag in the list
        const index = tags.findIndex((tag) => tag._id === data._id);

        if (index !== -1) {
          // Replace the old tag with the updated tag
          const updatedTags = [...tags];
          updatedTags[index] = data;
          setTags(updatedTags);
        }

        setTagName("");
        toast.success("Tag updated");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const tagDelete = async (tagId) => {
    try {
      const response = await fetch(`${process.env.API}/crud/tag/${tagId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.err);
      } else {
        // remove tag from selectedTags if it exist
        const updatedSelectedTags = selectedTags.filter(
          (tag) => tag._id !== tagId
        );
        setSelectedTags(updatedSelectedTags);

        setTags(tags.filter((tag) => tag._id !== tagId));
        setTagName("");
        toast.success("Tag deleted");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const blogCreate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.API}/crud/blog`, {
        method: "POST",
        body: JSON.stringify({
          title,
          content: markdown,
          tags: selectedTags?.map((tag) => tag._id),
          featuredImage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.err);
      } else {
        toast.success("Blog created");
        // clear local storage
        localStorage.removeItem("savedTitle");
        localStorage.removeItem("savedMarkdown");
        localStorage.removeItem("selectedTags");
        localStorage.removeItem("featuredImage");
        localStorage.removeItem("imagePreview");
        // clear state
        setTitle("");
        setMarkdown("");
        setSelectedTags([]);
        setFeaturedImage(null);
        setImagePreview(null);
        // back to step 1
        setStep(1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAuthorBlogs = async (page = 1) => {
    try {
      const response = await fetch(
        `${process.env.API}/author/blogs?page=${page}`,
        {
          method: "GET",
          next: { revalidate: 1 },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.err);
      } else {
        setBlogs(data?.blogs);
        setPage(data?.page);
        setTotalPages(data?.totalPages);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUpdatingBlog = async (slug) => {
    try {
      const response = await fetch(`${process.env.API}/blog/${slug}`, {
        method: "GET",
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.err);
      } else {
        setId(data?._id);
        setTitle(data?.title);
        setMarkdown(data?.content);
        setSelectedTags(data?.tags);
        setFeaturedImage(data?.featuredImage);
        setImagePreview(data?.featuredImage);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const blogUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.API}/author/blog/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          content: markdown,
          tags: selectedTags?.map((tag) => tag._id),
          featuredImage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.err);
      } else {
        toast.success("Blog updated");
        // clear state
        setTitle("");
        setMarkdown("");
        setSelectedTags([]);
        setFeaturedImage(null);
        setImagePreview(null);
        // back to step 1
        setStep(1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const blogDelete = async (blogId) => {
    // Ask for user confirmation
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    // If the user confirms, proceed with deletion
    if (userConfirmed) {
      try {
        const response = await fetch(
          `${process.env.API}/author/blog/${blogId}`,
          {
            method: "DELETE",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          toast.error(data?.err);
        } else {
          toast.success("Blog deleted");

          // Filter deleted blog from blogs state
          const updatedBlogs = blogs.filter((blog) => blog._id !== blogId);
          setBlogs(updatedBlogs);

          // Back to step 1
          setStep(1);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const fetchBlogs = async (page = 1) => {
    try {
      const response = await fetch(`${process.env.API}/blogs?page=${page}`, {
        method: "GET",
        next: { revalidate: 1 },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.err);
      } else {
        setBlogs(data?.blogs);
        setPage(data?.page);
        setTotalPages(data?.totalPages);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBlogsForAdmin = async (page = 1) => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/blogs?page=${page}`,
        {
          method: "GET",
          next: { revalidate: 1 },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.err);
      } else {
        setBlogs(data?.blogs);
        setPage(data?.page);
        setTotalPages(data?.totalPages);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const blogPublishedStatus = async (blogId) => {
    try {
      const response = await fetch(`${process.env.API}/admin/blog`, {
        method: "PUT",
        body: JSON.stringify({ blogId }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.err);
      } else {
        // window.location.reload();
        const updatedBlogIndex = blogs.findIndex((blog) => blog._id === blogId);

        if (updatedBlogIndex !== -1) {
          const updatedBlogs = [...blogs];
          updatedBlogs[updatedBlogIndex] = data;
          setBlogs(updatedBlogs);
        }
        toast.success(`Blog ${data?.published ? "published" : "unpublished"}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BlogContext.Provider
      value={{
        title,
        setTitle,
        markdown,
        setMarkdown,
        tagName,
        setTagName,
        tags,
        setTags,
        tagCreate,
        blogCreate,
        tagList,
        updatingTag,
        setUpdatingTag,
        tagUpdate,
        selectedTags,
        setSelectedTags,
        featuredImage,
        setFeaturedImage,
        uploadingImage,
        setUploadingImage,
        imagePreview,
        setImagePreview,
        tagDelete,
        step,
        setStep,
        handleNextStep,
        handlePrevStep,
        current,
        fetchAuthorBlogs,
        blogs,
        page,
        totalPages,
        getUpdatingBlog,
        blogUpdate,
        blogDelete,
        fetchBlogs,
        blogPublishedStatus,
        fetchBlogsForAdmin,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
