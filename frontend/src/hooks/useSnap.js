import { useEffect } from 'react';
import { MIDTRANS_CLIENT_ID }  from '../utils/const';


const useSnap = () => {
  useEffect(() => {
    const scriptId = 'snap-script';
    const clientKey = MIDTRANS_CLIENT_ID;
    const snapUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src = snapUrl;
      script.setAttribute('data-client-key', clientKey);
      script.id = scriptId;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const snapPay = (token) => {
    if (window.snap && token) {
      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log('Success:', result);
          window.location.href = '/'; // Redirect ke home
        },
        onPending: function (result) {
          console.log('Pending:', result);
        },
        onError: function (result) {
          console.error('Error:', result);
        },
        onClose: function () {
          console.log('User closed Snap popup.');
          window.location.href = '/'; // Redirect jika ditutup manual
        }
      });
    }
  };

  return { snapPay };
};

export default useSnap;
