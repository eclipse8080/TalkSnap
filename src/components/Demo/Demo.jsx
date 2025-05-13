import { useState, useRef } from 'react';
import styles from './Demo.module.css';

const Demo = ({ heading, subheading }) => {
  const [timer, setTimer] = useState('00:00:00');
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      // Start the timer
      const startTime = Date.now();
      timerRef.current = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const hours = String(Math.floor(elapsedTime / 3600000)).padStart(2, '0');
        const minutes = String(Math.floor((elapsedTime % 3600000) / 60000)).padStart(2, '0');
        const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0');
        setTimer(`${hours}:${minutes}:${seconds}`);
      }, 1000);
    } catch (error) {
      console.error('Error accessing audio devices:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      mediaRecorderRef.current.onstop = () => {
        clearInterval(timerRef.current);
        setTimer('00:00:00');

        // Combine audio chunks into a single Blob
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setShowPopup(true); // Show the popup
      };
    }
  };

  const saveRecording = () => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'recording.webm'; // Use .webm format for compatibility
    link.click();
    setAudioUrl(null); // Reset after saving
    setShowPopup(false); // Close the popup
  };

  const cancelRecording = () => {
    setAudioUrl(null); // Discard the recording
    setShowPopup(false); // Close the popup
  };

  return (
    <div className={styles.demoWrapper}>
      <section className={styles.demo}>
        <div className={styles.heading}>{heading}</div>
        <div className={styles.subheading}>{subheading}</div>
        <div className={styles.timerContainer}>
          <div className={styles.timerBox}>
            <span className={styles.timer}>{timer}</span>
          </div>
        </div>
        <div className={styles.controls}>
          <div className={styles.startWrapper}>
            <button
              className={styles.start}
              onClick={startRecording}
              disabled={isRecording}
            >
              Start
            </button>
          </div>
          <button
            className={styles.stop}
            onClick={stopRecording}
            disabled={!isRecording}
          >
            Stop
          </button>
        </div>
        {showPopup && (
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <p>Do you want to save the recording?</p>
              <div className={styles.popupButtons}>
                <button className={styles.save} onClick={saveRecording}>
                  Save
                </button>
                <button className={styles.cancel} onClick={cancelRecording}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Demo;
