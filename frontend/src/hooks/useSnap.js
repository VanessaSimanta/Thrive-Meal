import { useEffect } from 'react';
import { MIDTRANS_CLIENT_ID } from '../utils/const';
import { BACK_END_URL } from '../utils/const';

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

  const snapPay = (token, transactionId, onLoading) => {
    if (window.snap && token) {
      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log('Success:', result);
          if (onLoading) onLoading(true);

          fetch(`${BACK_END_URL}/api/paymentSuccess/${transactionId}`, {
            method: 'PUT',
          })
            .then((res) => res.json())
            .then((data) => {
              console.log('Payment status updated:', data);
              window.location.href = '/';
            })
            .catch((err) => {
              console.error('Failed to update payment status:', err);
              window.location.href = '/';
            });
        },
        onPending: function (result) {
          console.log('Pending:', result);
        },
        onError: function (result) {
          console.error('Error:', result);
        },
        onClose: function () {
          console.log('User closed Snap popup.');
          window.location.href = '/';
        }
      });
    }
  };

  return { snapPay };
};

export default useSnap;
