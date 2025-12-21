import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const CalendlyWidget = ({ isOpen, onClose, calendlyUrl, prefill = {} }) => {
  useEffect(() => {
    if (isOpen && window.Calendly) {
      window.Calendly.initInlineWidget({
        url: calendlyUrl,
        parentElement: document.getElementById('calendly-embed'),
        prefill: prefill,
        utm: {}
      });
    }
  }, [isOpen, calendlyUrl, prefill]);

  useEffect(() => {
    // Load Calendly script
    if (!document.getElementById('calendly-script')) {
      const script = document.createElement('script');
      script.id = 'calendly-script';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);

      const link = document.createElement('link');
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] max-h-[800px] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Schedule a Call</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Calendly Embed */}
        <div className="flex-1 overflow-hidden">
          <div id="calendly-embed" className="h-full w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CalendlyWidget;
