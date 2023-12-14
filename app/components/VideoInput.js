import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import logger from '../utils/logger';

export default function VideoInput({ onCapture }) {
  const webcamRef = useRef(null);
  // const [showCam, setShowCam] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isAnalysing, setAnalysing] = useState(false);
  const [question, setQuestion] = useState('');

  const questionHandler = (event) => {
    if (!event) return;
    setQuestion(event.target.value);
  };

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm',
    });
    mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const captureAndSend = useCallback(
    async (questionParam) => {
      try {
        setAnalysing(true);
        if (recordedChunks.length) {
          const blob = new Blob(recordedChunks, { type: 'video/webm' });
          const file = new File([blob], 'recorded-video.webm', { type: 'video/webm' });
          setRecordedChunks([]);
          await onCapture(file, questionParam);
        }
      } finally {
        setAnalysing(false);
      }
    },
    [recordedChunks]
  );

  return (
    <div className='w-1/2'>
      {/* <button onClick={() => setShowCam((p) => !p)}>
        {!showCam ? 'Show Camera' : 'Stop Camera'}
      </button> */}
      {/* {showCam && ( */}
      <div className='flex flex-col gap-2 h-1/2 min-h-fit'>
        <>
          <Webcam height={480} width={640} audio={true} ref={webcamRef} />
          {capturing ? (
            <button
              className='bg-red-500 disabled:opacity-25 hover:bg-red-900 hover:text-white'
              onClick={handleStopCaptureClick}
            >
              Stop Capture
            </button>
          ) : (
            <button
              className='bg-lime-500 disabled:opacity-25 hover:bg-lime-900 hover:text-white'
              onClick={handleStartCaptureClick}
              disabled={recordedChunks.length > 0 || isAnalysing}
            >
              Start Capture
            </button>
          )}
          {/* {recordedChunks.length > 0 && <button onClick={captureAndSend}>Download</button>} */}
        </>
        <label className='flex items-center gap-2 w-full'>
          Question
          <input
            onChange={questionHandler}
            className='p-2 my-2 border border-2 border-rounded grow'
            disabled={isAnalysing}
          />
        </label>
        <button
          className='bg-sky-500 disabled:opacity-25 hover:bg-sky-900 hover:text-white'
          onClick={() => captureAndSend(question)}
          disabled={recordedChunks.length === 0 || question === '' || isAnalysing}
        >
          {isAnalysing ? 'Analysing . . .' : 'Send the video'}
        </button>
      </div>
      {/* )} */}
    </div>
  );
}
