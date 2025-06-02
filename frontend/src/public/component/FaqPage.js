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
  {
    id: 3,
    question: "What's included in one Thrive Meal?",
    answer: "Each Thrive Meal includes a balanced portion of protein, carbohydrates, vegetables, and healthy fats—designed to meet your daily nutritional needs.",
  },
  {
    id: 4,
    question: "Is Thrive Meal Catering Halal?",
    answer: "Yes, all our ingredients are sourced from certified Halal suppliers and prepared following Halal practices.",
  },
  {
    id: 5,
    question: "How does the subscription system work?",
    answer: "You can subscribe weekly or monthly. Choose your meals in advance, and they’ll be delivered according to your selected schedule.",
  },
  {
    id: 6,
    question: "Is it possible to request a specific delivery time for the catering?",
    answer: "We offer delivery time slots during checkout, but availability depends on your location. Contact support for custom requests.",
  },
  {
    id: 7,
    question: "Can the meals be adjusted for allergies or dietary restrictions?",
    answer: "Absolutely. You can specify dietary preferences or allergies during your order, and we will tailor the meals accordingly.",
  },
  {
    id: 8,
    question: "Does Thrive Meal catering use oil?",
    answer: "Yes, but we primarily use healthy oils such as olive oil or coconut oil, and always in minimal quantities to maintain nutritional balance.",
  },
  {
    id: 9,
    question: "Can I pause or cancel my subscription anytime?",
    answer: "Yes, subscriptions can be paused, skipped, or canceled anytime through your account dashboard—no penalties.",
  },
  {
    id: 10,
    question: "Are the containers eco-friendly?",
    answer: "Yes, we use biodegradable and recyclable packaging to reduce environmental impact.",
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
