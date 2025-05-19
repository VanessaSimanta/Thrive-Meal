import { useEffect } from 'react';

const useSnap = () => {
  useEffect(() => {
    const scriptId = 'snap-script';
    const clientKey = 'YOUR_MIDTRANS_CLIENT_KEY'; // Ganti dengan client key Midtrans Anda
    const snapUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src = `${snapUrl}`;
      script.setAttribute('data-client-key', clientKey);
      script.id = scriptId;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const snapEmbed = (token, domId, options = {}) => {
    const interval = setInterval(() => {
      if (window.snap && window.snap.embed) {
        window.snap.embed(token, {
          embedId: domId,
          ...options
        });
        clearInterval(interval);
      }
    }, 100);
  };

  return { snapEmbed };
};

export default useSnap;
