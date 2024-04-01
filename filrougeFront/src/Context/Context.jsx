
import React, { useContext, useEffect ,useState } from "react";
import { createContext } from "react";
import Loading from "../components/Loading";

const BlogContext = createContext();

const Context = ({ children }) => {
  const [showComment, setShowComment] = useState(false);
  const [commentLength, setCommentLength] = useState(0);
  const [authModel, setAuthModel] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <BlogContext.Provider
      value={{
        showComment,
        setShowComment,
        
        authModel,
        setAuthModel,
      }}>
      {false ? <Loading /> : children}
    </BlogContext.Provider>
  );
};

export default Context;

export const Blog = () => useContext(BlogContext);
