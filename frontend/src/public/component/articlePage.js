import "bootstrap/dist/css/bootstrap.min.css";
import airPutih from '../images/air-putih.jpg';
import polaHidup from '../images/pola-hidup.webp';
import olahraga from '../images/olahraga.jpg';
import makan from '../images/makan-sehat.webp'
import makan2 from '../images/makan2.jpg'

const articles = [
    {
        id: 1,
        title: "Manfaat Air Putih untuk Kesehatan",
        description:
            "Air putih memiliki banyak manfaat seperti meningkatkan metabolisme dan menjaga keseimbangan cairan tubuh.",
        image: airPutih,
        url: "https://www.alodokter.com/jangan-remehkan-manfaat-air-putih",
    },
    {
        id: 2,
        title: "Pola Makan Sehat untuk Diet",
        description:
            "Menerapkan pola makan sehat adalah kunci keberhasilan diet jangka panjang.",
        image: polaHidup,
        url: "https://www.halodoc.com/artikel/7-tips-menerapkan-pola-makan-sehat-yang-mudah-dilakukan",
    },
    {
        id: 3,
        title: "Olahraga Ringan yang Efektif",
        description:
            "Tidak perlu ke gym, olahraga ringan seperti jalan kaki atau yoga bisa sangat bermanfaat.",
        image: olahraga,
        url: 'https://ayosehat.kemkes.go.id/terlalu-sibuk-7-olahraga-ringan-ini-bisa-dilakukan-di-rumah',
    },
];

const featuredArticles = [
    {
        id: 1,
        title: "Makan Enak Tanpa Takut Gemuk: Tips Diet Sehat yang Mudah Dilakukan",
        author: "Love",
        image: makan,
    },
    {
        id: 2,
        title: "Emotional Eating: Ketika Emosi Mengendalikan Nafsu Makanmu",
        author: "Hillary",
        image: makan2,
    },
];


function ArticlePage() {
    return (
        <div style={{ backgroundColor: "#f5f9f5" }}>
            <div className="menu-page">
            <div className="menu-banner">
                <div className="menu-banner-overlay">
                <h1 className="menu-title">ARTICLE</h1>
                </div>
            </div>
            </div>
            <section className="container py-5">
                <div className="container my-5">
            <div
                className="row justify-content-center p-4"
                style={{
                    backgroundColor: "#e8f2e5",
                    borderRadius: "16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
            >
                {featuredArticles.map((article) => (
                    <div className="col-md-5 mx-2 mb-4" key={article.id}>
                        <div
                            className="text-center p-3 article-card"
                            style={{ borderRadius: "12px", transition: "0.3s" }}
                        >
                            <div className="overflow-hidden rounded" style={{ height: "200px" }}>
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="img-fluid w-250 article-img"
                                    style={{
                                        objectFit: "cover",
                                        height: "100%",
                                        transition: "transform 0.3s ease",
                                    }}
                                />
                            </div>
                            <p className="fw-semibold mt-3">{article.title}</p>
                            <p className="text-muted small">by {article.author}</p>
                        </div>
                    </div>
                ))}
            </div>
            </div>
                <h2 className="text-center fw-bold mb-4 bg-custom text-white">OUR LATEST ARTICLE</h2>
                <div className="row justify-content-center">
                    {articles.map((article) => (
                        <div className="col-md-4 mb-4" key={article.id}>
                            <div className="card h-100 shadow-sm border-0">
                                <img
                                    src={article.image}
                                    className="card-img-top"
                                    alt={article.title}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body text-center">
                                    <h5 className="card-title">{article.title}</h5>
                                    <p className="card-text small">{article.description}</p>
                                </div>
                                <div className="text-center mb-3">
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="category-button"
                                        style={{ position: "relative", zIndex: 2 }}
                                    >
                                        SEE MORE
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center my-4">
                    <button className="cta">Order Now</button>
                </div>
            </section>
        </div>
    );
}

export default ArticlePage;
