import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyAxios from '../Utils/MyAxios'

export default function TestAxios() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //USE normal axios
    // axios.get("http://localhost:2000/api/users")
    //   .then((res) => {
    //     setPosts(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    //USE MyAxios
    MyAxios.get("users")
        .then((res)=>{
            setPosts(res.data);
        })
        .catch((e)=>{
            console.log(e);
        })
  }, []);

  console.log(posts);

  return <>Hello axios, view result in console</>;
}