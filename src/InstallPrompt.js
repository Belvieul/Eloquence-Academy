import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return; // Already installed
    }

    // Check if dismissed before
    const dismissed = localStorage.getItem('install-prompt-dismissed');
    if (dismissed) {
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show prompt after 30 seconds
      setTimeout(() => {
        setShowPrompt(true);
      }, 30000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log(`User response: ${outcome}`);
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('install-prompt-dismissed', 'true');
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-sm z-50 animate-slide-up">
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg shadow-2xl p-6 border-2 border-amber-300">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 rounded-lg p-2">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Install App</h3>
              <p className="text-amber-50 text-sm">Use offline & get faster access</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-white hover:text-amber-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <button
          onClick={handleInstall}
          className="w-full bg-white text-amber-600 font-semibold py-3 px-4 rounded-lg hover:bg-amber-50 transition-colors shadow-md"
        >
          Install Now
        </button>
        
        <p className="text-amber-50 text-xs text-center mt-3">
          💾 Save to home screen • 📱 Works offline • ⚡ Fast access
        </p>
      </div>
    </div>
  );
};

export default InstallPrompt;
