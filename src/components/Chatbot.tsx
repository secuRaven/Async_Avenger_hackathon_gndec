import React, { useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Chatbot = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Create script elements for Botpress chatbot
    const injectScript = document.createElement('script');
    injectScript.src = 'https://cdn.botpress.cloud/webchat/v2.2/inject.js';
    injectScript.async = true;

    const configScript = document.createElement('script');
    configScript.src = 'https://files.bpcontent.cloud/2025/04/03/10/20250403105026-55V82DE2.js';
    configScript.async = true;

    // Add scripts to document
    document.body.appendChild(injectScript);
    document.body.appendChild(configScript);

    // Set color scheme based on dark mode
    if (window.botpressWebChat) {
      window.botpressWebChat.onEvent(
        'LIFECYCLE.LOADED', 
        () => {
          window.botpressWebChat.sendEvent({ 
            type: 'SET_THEME', 
            payload: { 
              theme: isDarkMode ? 'dark' : 'default'
            }
          });
        }
      );
    }

    // Cleanup function to remove scripts when component unmounts
    return () => {
      document.body.removeChild(injectScript);
      document.body.removeChild(configScript);
    };
  }, [isDarkMode]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Custom toggle button - if needed to replace the default Botpress button */}
      <button 
        className={`p-4 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:shadow-xl transition-all duration-200`}
        onClick={() => {
          if (window.botpressWebChat) {
            window.botpressWebChat.sendEvent({ type: 'TOGGLE_WEBCHAT' });
          }
        }}
        aria-label="Toggle Chatbot"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    </div>
  );
};

// Add type definition for the Botpress webchat global object
declare global {
  interface Window {
    botpressWebChat: {
      sendEvent: (event: { type: string; payload?: any }) => void;
      onEvent: (event: string, handler: Function) => void;
    };
  }
}

export default Chatbot; 