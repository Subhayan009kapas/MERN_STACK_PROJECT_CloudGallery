import axios from "axios";
import React, { useState, useEffect } from "react";
import "./UploadImage.css"; // Import CSS for styling
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaEllipsisV, FaTrash, FaSearchPlus, FaTimes, } from "react-icons/fa";
import {
  faUpload,
  faBorderAll,
  faImage,
  faVideo,
  faRightFromBracket,
  faTrash,
  faCloud
} from "@fortawesome/free-solid-svg-icons";

function UploadImage() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("image");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [images, setImages] = useState([]);
  const [isUserCardOpen, setIsUserCardOpen] = useState(false);
  const [isUploadCardOpen, setIsUploadCardOpen] = useState(false);
  const[opensuccessCard , setopensuccessCard ]=useState(false)

  const [showAllImage, setshowAllImage] = useState(true);
  const [showvideo, setshowvideo] = useState(false);
  const [showimage, setshowimage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showUploadForm, setshowUploadForm] = useState(true);

  const [activeOption, setActiveOption] = useState("all"); // Track the active option
  const username = localStorage.getItem("username"); // fetch username from local storage
  const token = localStorage.getItem("token"); // token from local storage
  const naviagte = new useNavigate();

  // Fetch all images for the logged-in user
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/auth/images?userId=${username}`
        );
        setImages(response.data);
      } catch (error) {
        console.log("Error fetching images");
      }
    };
    fetchImages();
  }, [username]);

  // Upload image files
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);
    formData.append("userId", username);

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setopensuccessCard(true);
      setTimeout(() => {
        setSuccessMsg("Image uploaded successfully!");
      }, 1000);
      
      
      setLoading(false);
      setTimeout(() => {
        window.location.reload()

      }, 5000);

      setFile(null);
      setDescription("");

      // Re-fetch images after upload
      const updatedResponse = await axios.get(
        `http://localhost:3000/auth/images?userId=${username}`
      );
      setImages(updatedResponse.data);
    } catch (error) {
      setLoading(false);
      setErrorMsg(
        "Error uploading image: " +
        (error.response?.data?.message || error.message)
      );

    }
  };

  // handel Delete image -------------
  const handleDelete = async (imageId) => {
    try {
      await axios.delete(`http://localhost:3000/auth/images/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setImages(images.filter((image) => image._id !== imageId));
    } catch (error) {
      console.error("Error deleting image:", error.response || error.message);
      setErrorMsg(
        "Error deleting image: " +
        (error.response?.data?.message || error.message)
      );
    }
  };
  // handel Delete-------------

  // Logout user
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");

    // Reload or redirect to login page
    naviagte("/");
  };

  const upload_card_open = () => {
    setIsUploadCardOpen((isUserCardOpen) => !isUserCardOpen);
    setshowAllImage(false);
    setshowvideo(false);
  };
  const showAllImageAfterUpload = () => {
    if (file) {
      setshowAllImage(true);


    }
    setTimeout(() => {

    }, 2000);
  };
  const openUserCard = () => {
    setIsUserCardOpen((isUserCardOpen) => !isUserCardOpen);
  };

  const [sidePanelWidth, setSidePanelWidth] = useState(0);

  const openNav = () => {
    setSidePanelWidth(200);
  };

  const closeNav = () => {
    setSidePanelWidth(0);
  };

  // function for delete menu
  const [showMenu, setShowMenu] = useState(null);
  const [zoomImage, setZoomImage] = useState(null);

  const toggleMenu = (imageId) => {
    setShowMenu(showMenu === imageId ? null : imageId);
  };

  const handleZoom = (imageUrl) => {
    setZoomImage(imageUrl);
  };

  // for  filter img and video start
  const [mediaType, setMediaType] = useState("all"); // State to track selected media type

  const showAll_Media_by_sidebar = () => {
    setshowAllImage(true);
    setIsUploadCardOpen(false);
    setMediaType("all");
  };
  const show_only_image_by_sidebar = () => {
    setshowvideo(true);
    setMediaType("images");
    setIsUploadCardOpen(false);
  };
  const show_only_video_by_sidebar = () => {
    setshowimage(true);
    setMediaType("videos");
    setIsUploadCardOpen(false);
  };

  const filteredImages = images.filter((image) => {
    if (mediaType === "images") return image.url.includes("/image/");
    if (mediaType === "videos") return !image.url.includes("/image/");
    return true; // Show all
  });

  // for  filter img and video end

  // active option on side bar
  const Sidebar = ({
    sidePanelWidth,
    closeNav,
    showAll_Media_by_sidebar,
    show_only_image_by_sidebar,
    show_only_video_by_sidebar,
    upload_card_open,
    handleLogout,
  }) => { };
  return (
    <>
    <div className="upload_image_container">
      {/* code for side panel */}
      <div className="sidepanel" style={{ width: sidePanelWidth }}>
        <a href="#!" className="closebtn" onClick={closeNav}>
          &times;
        </a>
        <a
          href="#"
          className={activeOption === "all" ? "active" : ""}
          onClick={() => {
            showAll_Media_by_sidebar();
            setActiveOption("all");
          }}
        >
          <FontAwesomeIcon icon={faBorderAll} /> All
        </a>
      
        <a
          href="#"
          className={activeOption === "images" ? "active" : ""}
          onClick={() => {
            show_only_image_by_sidebar();
            setActiveOption("images");
          }}
        >
          <FontAwesomeIcon icon={faImage} /> Images
        </a>
        <a
          href="#"
          className={activeOption === "videos" ? "active" : ""}
          onClick={() => {
            show_only_video_by_sidebar();
            setActiveOption("videos");
          }}
        >
          <FontAwesomeIcon icon={faVideo} /> Videos
        </a>
        <a
          href="#"
          onClick={() => {
            upload_card_open();
            setActiveOption("upload");
          }}
        >
          <FontAwesomeIcon icon={faUpload} /> Upload
        </a>

        <a href="#" className="side-nav-logout" onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} /> Logout
        </a>
      </div>
      <nav className="upload_image_navbar">
        <button class="openbtn" onClick={openNav}>
          ☰{" "}
        </button>

        <div className="upload_image_title"><FontAwesomeIcon icon={faCloud} style={{position:"relative" , bottom:"10px" , fontSize:"2rem" , color:"#5492ad"}}/> CloudGallery</div>
       
        <div className="upload_image_userName" onClick={openUserCard}>
          {username}
        </div>
        {isUserCardOpen && (
          <div className="upload_image_userCard">
            <h3>{username}</h3>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </nav>

      <div className="upload_image_welcome">
        <h1><FontAwesomeIcon icon={faCloud} style={{position:"relative" , bottom:"25px" , fontSize:"3rem" , color:"#5492ad"}}/>CloudGallery</h1>
      </div>

      {isUploadCardOpen && (
        <div className="upload_image_uploadCard">
          {showUploadForm && (
            <form onSubmit={handleSubmit}>
              <button onClick={upload_card_open} className="uploadcard_close">
                <FaTimes />
              </button>
              <label htmlFor="file" className="custum-file-upload">
                <div className="icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill=""
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                        fill=""
                      ></path>
                    </g>
                  </svg>
                </div>
                <div className="text">
                  <span>Click to upload image</span>
                </div>
                <br></br>
                <input
                  id="file"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </label>
              <button
                type="submit"
                className="image-upload-button"
                onClick={showAllImageAfterUpload}
              >
                Upload <FontAwesomeIcon icon={faUpload} bounce />
              </button>

              {loading && (
                <div className="loader">
                  <div className="box">
                    <div className="box1"></div>
                    <div className="box2"></div>
                    <div className="box3"></div>
                  </div>
                </div>
              )}

              {/* for success card */}

              {opensuccessCard && (
<div className="card-success-con">
              <div class="card-success">
                <svg class="wave-success" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0,256L11.4,240C22.9,224,46,192,69,192C91.4,192,114,224,137,234.7C160,245,183,235,206,213.3C228.6,192,251,160,274,149.3C297.1,139,320,149,343,181.3C365.7,213,389,267,411,282.7C434.3,299,457,277,480,250.7C502.9,224,526,192,549,181.3C571.4,171,594,181,617,208C640,235,663,277,686,256C708.6,235,731,149,754,122.7C777.1,96,800,128,823,165.3C845.7,203,869,245,891,224C914.3,203,937,117,960,112C982.9,107,1006,181,1029,197.3C1051.4,213,1074,171,1097,144C1120,117,1143,107,1166,133.3C1188.6,160,1211,224,1234,218.7C1257.1,213,1280,139,1303,133.3C1325.7,128,1349,192,1371,192C1394.3,192,1417,128,1429,96L1440,64L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"
                    fill-opacity="1"
                  ></path>
                </svg>

                <div class="icon-container-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    stroke-width="0"
                    fill="currentColor"
                    stroke="currentColor"
                    class="icon-success"
                  >
                    <path
                      d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                    ></path>
                  </svg>
                </div>
                <div class="message-text-container-success">
                  {successMsg && (
                    <p class="message-text-success">File uploaded Successfully !</p>
                  )}

                  <p class="sub-text-success">Everything seems great</p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 15 15"
                  stroke-width="0"
                  fill="none"
                  stroke="currentColor"
                  class="cross-icon-success"
                >
                  <path
                    fill="currentColor"
                    d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
              </div>
              )}
              {/* for success card */}

              {errorMsg && (
                <h3 className="upload_image_error-message">{errorMsg}</h3>
              )}
            </form>
          )}
        </div>
      )}
      {/* working code ------------*/}

      {/* {showAllImage && (
        <div className="upload_image_images">
          {images.map((image) => (
            <div className="upload_image_image-item" key={image._id}>
              {image.url.includes("/image/") ? (
                <a href={image.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={image.url}
                    alt={image.description}
                    className="upload_image_gallery-image"
                  />
                </a>
              ) : (
                <a href={image.url} target="_blank" rel="noopener noreferrer">
                  <video className="upload_image_gallery-video" controls>
                    <source src={image.url} type="video/mp4" />
                  </video>
                </a>
              )}
               <button className="delete-button" onClick={() => handleDelete(image._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
       */}
      {/* working code --end ----------*/}
      {filteredImages.length > 0 && (
        <div className="upload_image_images">
          {filteredImages.map((image) => (
            <div className="upload_image_image-item" key={image._id}>
              <div className="menu-container">
                <button
                  className="menu-button"
                  onClick={() => {
                    toggleMenu(image._id);
                  }}
                >
                  <FaEllipsisV />
                </button>

                {showMenu === image._id && (
                  <div className="menu-dropdown">
                    <button
                      className="menu-option"
                      onClick={() => handleZoom(image.url)}
                    >
                      <FaSearchPlus /> Zoom
                    </button>
                    <button
                      className="menu-option"
                      onClick={() => handleDelete(image._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                )}
              </div>
              {image.url.includes("/image/") ? (
                <a href={image.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={image.url}
                    alt={image.description}
                    className="upload_image_gallery-image"
                  />
                </a>
              ) : (
                <video className="upload_image_gallery-video" controls>
                  <source src={image.url} type="video/mp4" />
                </video>
              )}
            </div>
          ))}
        </div>
      )}
      {zoomImage && (
        <div className="zoom-popup">
          <div className="zoom-content">
            <img src={zoomImage} alt="Zoomed In" className="zoomed-image" />
            <button className="close-zoom" onClick={() => setZoomImage(null)}>
              <FaTimes />
            </button>
          </div>
        </div>
      )}
      
    </div>
     <div className="upload_image_navOption" onClick={upload_card_open}>
     <img src="https://i.ibb.co/xJMdpL5/cloud-computing-1.png" alt="cloud-computing-1" border="0" height={"60px"}/>
   </div>
   </>
    
  );
}
export default UploadImage;
