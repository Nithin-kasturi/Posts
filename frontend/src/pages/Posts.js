import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Posts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/posts');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className='flex flex-col items-center mb-8'>
      <h1 className='text-sm font-bold text-blue-500 md:text-2xl lg:text-3xl'>Here are the posts from MongoDB</h1>
      {data && data.length > 0 ? (
        data.map((item, index) => (
          <div className='flex flex-col justify-center items-center mt-5' key={index}>
            <img className='h-[300px] w-[300px] rounded-2xl' src={item.post} alt={`Post ${index}`} />
            <div className='sm:text-sm md:text-xl lg:text-2xl flex flex-row mt-5 gap-7 items-center'>
              <h1 className=' font-semibold text-red-400'>Post By:</h1>
              <h1 className='font-semibold'>{item.name}</h1>
            </div>
            <div className='sm:text-sm md:text-xl lg:text-2xl flex flex-row mt-5 gap-7 items-center'>
              <h1 className='text-yellow-500 flex flex-row gap-2'>
                This Post is liked by <h1 className='text-green-400'>{item.likes}</h1> people
              </h1>
            </div>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}
