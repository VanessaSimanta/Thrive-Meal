import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

function FaqPage() {
  const faqs = [
    {
      id: 1,
      question: "What time does the delivery arrive?",
      answer: "Delivery usually arrives between 10 AM and 1 PM depending on your location.",
    },
    {
      id: 2,
      question: "Is it safe for consumption by people with certain medical conditions?",
      answer: "Yes, we provide detailed nutritional information and cater to specific dietary needs. Please consult your doctor for specific advice.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="menu-page">
      <div className="menu-banner">
        <div className="menu-banner-overlay">
          <h1 className="menu-title">FAQ</h1>
        </div>
      </div>
      {/* FAQ Section */}
      <section className="container py-5">
        <h2 className="text-center fw-semibold mb-4">Frequently Ask Question</h2>
        <div
          className="p-4 rounded"
          style={{
            backgroundColor: "#e8f2e5",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {faqs.map((faq, index) => (
            <div key={faq.id} className="mb-3">
              <button
                className="w-100 text-start p-3 border-0 rounded d-flex justify-content-between align-items-center"
                style={{
                  backgroundColor: "#afbea2",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                }}
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span>{openIndex === index ? "▲" : "▼"}</span>
              </button>
              {openIndex === index && (
                <div className="mt-2 p-3 bg-white rounded shadow-sm">
                  <p className="mb-0">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default FaqPage;
