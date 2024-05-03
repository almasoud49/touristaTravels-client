import { useEffect } from "react";
import { useState } from "react";
import { axiosSecure } from "../../hooks/useAxios";
import BlogQuestions from "./BlogQuestions";


const Blogs = () => {
    const [blogs, setBlogs]=useState([]);

    useEffect(()=>{
        const url = "/blogs"
        axiosSecure.get(url)
        .then(res => setBlogs(res.data))
    },[])
    return (
        <div  className="bg-stone-900 text-white">
           {
            blogs.map((blog)=>(
                <BlogQuestions key={blog._id} blog={blog}></BlogQuestions>
            ))
           } 
        </div>
    );
};

export default Blogs;