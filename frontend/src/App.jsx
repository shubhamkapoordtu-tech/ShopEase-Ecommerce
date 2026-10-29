
import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5000/api/products";

const productImages = {
  "Wireless Headphones":
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",
  "Smart Watch":
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85",
  "Laptop Backpack":
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",
  "Wireless Mouse":
    "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=700&q=85",
};

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API}?search=${encodeURIComponent(search)}`,
          { signal: controller.signal }
        );

        if (!response.ok) throw new Error("Could not load products");

        setProducts(await response.json());
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Unable to load products. Please check your backend.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadProducts();
    return () => controller.abort();
  }, [search]);

  async function showDetails(id) {
    setError("");

    try {
      const response = await fetch(`${API}/${id}`);
      if (!response.ok) throw new Error("Could not load details");

      setSelectedProduct(await response.json());
    } catch {
      setError("Unable to load product details. Please try again.");
    }
  }

  function getImage(product) {
    return productImages[product.name] || product.image;
  }

  function formatPrice(price) {
    return `₹${Number(price).toLocaleString("en-IN")}`;
  }

  return (
    <div className="shop">
      <header className="topbar">
        <a
          className="brand"
          href="#home"
          onClick={() => setSelectedProduct(null)}
        >
          shop<span>ease.</span>
        </a>

        <nav className="navigation">
          <a href="#home" onClick={() => setSelectedProduct(null)}>Home</a>
          <a href="#collection" onClick={() => setSelectedProduct(null)}>Collection</a>
          <a href="#about">About</a>
        </nav>

        <a className="header-link" href="#collection">Explore shop ↗</a>
      </header>

      <main>
        {selectedProduct ? (
          <section className="detail-page">
            <button
              className="back-link"
              onClick={() => setSelectedProduct(null)}
            >
              ← Back to collection
            </button>

            <div className="detail-layout">
              <div className="detail-photo">
                <img
                  src={getImage(selectedProduct)}
                  alt={selectedProduct.name}
                />
              </div>

              <div className="detail-copy">
                <span className="eyebrow">THE SHOP EASE COLLECTION</span>
                <h1>{selectedProduct.name}</h1>
                <p className="detail-description">
                  {selectedProduct.description}
                </p>
                <p className="detail-price">
                  {formatPrice(selectedProduct.price)}
                </p>
                <p className="stock-note">✓ A great pick for everyday life</p>
                <button
                  className="primary-button"
                  onClick={() => setSelectedProduct(null)}
                >
                  Continue exploring <span>↗</span>
                </button>
              </div>
            </div>
          </section>
        ) : (
          <>
            <section className="hero" id="home">
              <div className="hero-copy">
                <span className="eyebrow">GOOD THINGS, EVERY DAY</span>
                <h1>
                  Everyday essentials,
                  <em> thoughtfully chosen.</em>
                </h1>
                <p>
                  Discover useful finds, timeless favourites, and little
                  upgrades that make everyday life better.
                </p>
                <a className="primary-button" href="#collection">
                  Explore collection <span>↗</span>
                </a>

                <div className="hero-note">
                  <span className="note-dot" />
                  A little something for everyone
                </div>
              </div>

              <div className="hero-visual">
                <img
                  src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1000&q=85"
                  alt="Featured everyday lifestyle product"
                />
                <div className="hero-sticker">
                  <span>CURATED</span>
                  <strong>for you.</strong>
                </div>
                <div className="hero-caption">
                  <span>THE EVERYDAY EDIT</span>
                  <span>01 / 04</span>
                </div>
              </div>
            </section>

            <section className="benefits" id="about">
              <div><span>✳</span> Thoughtful everyday finds</div>
              <div><span>◇</span> Simple, useful essentials</div>
              <div><span>↗</span> Find your next favourite</div>
            </section>

            <section className="collection" id="collection">
              <div className="collection-heading">
                <div>
                  <span className="eyebrow">A FEW GOOD FINDS</span>
                  <h2>Meet your new favourites<span>.</span></h2>
                  <p>Useful things. Lovely details. Everyday prices.</p>
                </div>

                <label className="search-box">
                  <span>⌕</span>
                  <input
                    type="search"
                    placeholder="Find something..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    aria-label="Search products"
                  />
                  {search && (
                    <button onClick={() => setSearch("")} aria-label="Clear search">
                      ×
                    </button>
                  )}
                </label>
              </div>

              <div className="results-line">
                <span>OUR COLLECTION</span>
                <span>{loading ? "Loading..." : `${products.length} items`}</span>
              </div>

              {error && <p className="error-message">{error}</p>}
              {loading && <p className="empty-message">Finding your favourites...</p>}

              {!loading && !error && products.length === 0 && (
                <p className="empty-message">
                  No products found. Try a different search.
                </p>
              )}

              <div className="product-grid">
                {!loading && products.map((product, index) => (
                  <article className="product-card" key={product.id}>
                    <button
                      className="product-picture"
                      onClick={() => showDetails(product.id)}
                      aria-label={`View ${product.name} details`}
                    >
                      <span className="product-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <img src={getImage(product)} alt={product.name} />
                      <span className="image-action">View item ↗</span>
                    </button>

                    <div className="product-meta">
                      <div>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                      </div>
                      <strong>{formatPrice(product.price)}</strong>
                    </div>

                    <button
                      className="text-link"
                      onClick={() => showDetails(product.id)}
                    >
                      Discover product <span>↗</span>
                    </button>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="footer">
        <a className="brand" href="#home">shop<span>ease.</span></a>
        <p>Thoughtfully chosen for everyday living.</p>
        <span>© 2026 ShopEase</span>
      </footer>
    </div>
  );
}

export default App;
