import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Load Botpress webchat script
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v2.2/inject.js';
    script1.async = true;
    document.body.appendChild(script1);

    // Load Botpress configuration script
    const script2 = document.createElement('script');
    script2.src = 'https://files.bpcontent.cloud/2025/04/03/10/20250403105026-55V82DE2.js';
    script2.async = true;
    document.body.appendChild(script2);

    // Cleanup function to remove scripts when component unmounts
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return null; // The chatbot will be injected into the DOM by the scripts
};

export default Chatbot; 