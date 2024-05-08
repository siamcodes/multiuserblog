import { useEffect } from "react";
import { useBlog } from "@/context/blog";
import { imageUpload } from "@/utils/imageUpload";

export default function FeaturedImage({ onNextStep, onPrevStep }) {
  const {
    featuredImage,
    setFeaturedImage,
    uploadingImage,
    setUploadingImage,
    imagePreview,
    setImagePreview,
  } = useBlog();

  // useEffect(() => {
  //   const storedImagePreview = localStorage.getItem("imagePreview");
  //   const storedImageUrl = localStorage.getItem("featuredImage");

  //   if (storedImagePreview) {
  //     setImagePreview(storedImagePreview);
  //   }

  //   if (storedImageUrl) {
  //     setFeaturedImage(storedImageUrl);
  //   }
  // }, []);

  const handleImageUpload = async (e) => {
    const selectedImage = e.target.files[0];

    // Preview the selected image
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);

        // Save image preview data URL in Local Storage
        localStorage.setItem("imagePreview", event.target.result);
      };
      reader.readAsDataURL(selectedImage);

      setUploadingImage(true);
      try {
        const imageUrl = await imageUpload(selectedImage);
        localStorage.setItem("featuredImage", imageUrl);
        setFeaturedImage(imageUrl);
        setUploadingImage(false);
      } catch (err) {
        console.log(err);
        setUploadingImage(false);
      }
    }
  };

  return (
    <div className="container">
      {imagePreview && (
        <div className="col-lg-8 offset-lg-2">
          <img
            src={imagePreview}
            className="img img-fluid rounded"
            alt="Preview"
          />
        </div>
      )}

      <div className="d-flex justify-content-center col-lg-8 offset-lg-2 mt-5">
        <label
          className={`btn btn-outline-secondary p-5 col ${
            uploadingImage && "disabled"
          }`}
        >
          {uploadingImage ? "Uploading..." : "Upload Featured Image"}
          <input
            onChange={(e) => handleImageUpload(e)}
            type="file"
            accept="image/*"
            hidden
          />
        </label>
      </div>

      <div className="d-flex justify-content-center my-4">
        <button
          className="btn btn-outline-primary p-5 col-6 my-5 me-1"
          onClick={onPrevStep}
        >
          Previous
        </button>

        <button
          className="btn btn-outline-primary p-5 col-6 my-5 ms-1"
          onClick={onNextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
}
