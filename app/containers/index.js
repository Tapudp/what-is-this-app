'use client';
import React, { useState } from 'react';
import VideoInput from '../components/VideoInput';
import ProductDescriptions from '../components/ProductDescriptions';
import logger from '../utils/logger';

export default function HomeContainer() {
  const [descriptions, setDescriptions] = useState([]);

  const submitVideoToLLaVA = async (videoFile, question) => {
    try {
      logger.info(':: question :: ', question);
      const formData = new FormData();
      formData.append('video', videoFile, 'recorded-video.webm');
      formData.append('question', question);

      const response = await fetch('/api/llava', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error calling LLaVA API: ${response.statusText}`);
      }

      const data = await response.json();
      setDescriptions((prev) => [...prev, { question: question, answer: data.response }]);
    } catch (error) {
      logger.error('Error submitting video to LLaVA:', error);
      alert(`Error submitting video to LLaVA: ${error.message}`);
    }
  };

  return (
    <div className='flex flex-col'>
      <h1 className='text-4xl p-2 flex justify-center align-center bg-blue-200 border-rounded my-2'>
        Live Video Analysis
      </h1>
      <div className='flex flex-row gap-4'>
        <VideoInput onCapture={submitVideoToLLaVA} />
        <ProductDescriptions descriptions={descriptions} />
      </div>
    </div>
  );
}
