import React from 'react';
import faqBanner from '../images/banner-menu.jpg';

function FaqPage() {
  return (
    <div style={{ backgroundColor: "#fffbf0" }}>
      <div className="faq-page">
        <div
          className="faq-banner"
          style={{
            backgroundImage: `url(${faqBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
            position: "relative",
          }}
        >
          <div
            className="faq-banner-overlay"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 className="faq-title display-1 fw-bold">FAQ</h1>
          </div>
        </div>
      </div>

      <section className="container py-5">
        <h2 className="text-center fw-bold mb-4">Frequently Asked Questions</h2>
        <div
          className="row justify-content-center p-4"
          style={{
            backgroundColor: "#e8f2e5",
            borderRadius: "16px",
            marginBottom: "50px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  What time does the delivery arrive?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Our deliveries usually arrive between 10:00 AM and 12:00 PM.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Is it safe for consumption by people with certain medical conditions?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Yes, we provide full nutritional info. Always consult your doctor for personalized advice.
                </div>
              </div>
            </div>

            {/* Tambahkan pertanyaan lain di sini jika ada */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default FaqPage;
