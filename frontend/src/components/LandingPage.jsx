import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faCloud
} from "@fortawesome/free-solid-svg-icons";

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo"><FontAwesomeIcon icon={faCloud} style={{position:"relative" , bottom:"10px" , fontSize:"2rem" , color:"#5492ad"}}/> CloudGallery</h2>
        <Link to="/login" className="navbar-login-button">Login</Link>
      </nav>

      {/* Header Section */}
      <br></br>
      <br></br>
      <header className="landing-header">
        <h1>Welcome to the CloudGallery</h1>
        <p>Your personal space to upload and manage your Images & Videos</p>
      </header>

      {/* Featured Images Section */}
      <section className="featured-images">
        <h2>Featured Images</h2>
        <div className="image-grid">
          <div className="image-item">
            <img src="https://www.wpexplorer.com/wp-content/uploads/add-wordpress-featured-images-guide.jpg" alt="Featured 1" />
          </div>
          <div className="image-item">
            <img src="https://nicholsonfineart.com/cdn/shop/files/055948a77efe456dbb9072a6b1778cb0.jpg?v=1698955880&width=1200" alt="Featured 2" />
          </div>
          <div className="image-item">
            <img src="https://i.pinimg.com/736x/7a/de/1e/7ade1efbda081576baca1e169b599212.jpg" alt="Featured 3" />
          </div>
          <div className="image-item">
            <img src="https://www.cartoonize.net/wp-content/uploads/2022/01/nature-photography.jpg" alt="Featured 4" />
          </div>
          <div className="image-item">
            <img src="https://www.pgclick.com/file_uploads/pg_photos/1000/T012I_1557501051.JPG" alt="Featured 5" />
          </div>
          <div className="image-item">
            <img src="https://photographylife.com/wp-content/uploads/2023/01/Libor-Toucanette.jpg" alt="Featured 6" />
          </div>
        </div>
      </section>
      <br></br>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2024 CloudGallery. All rights reserved.</p>
        <p>Follow us on social media for updates!</p>
      </footer>
    </div>
  );
}

export default LandingPage;
