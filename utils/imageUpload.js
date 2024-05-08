import Resizer from "react-image-file-resizer";
import toast from "react-hot-toast";

export const imageUpload = async (file) => {
  return new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      1280,
      720,
      "JPEG",
      100,
      0,
      async (uri) => {
        try {
          // Make a POST request to your server to upload the base64 image
          const response = await fetch(`${process.env.API}/crud/uploads`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: uri }),
          });

          if (response.ok) {
            const data = await response.json();
            resolve(data?.url);
          } else {
            reject(new Error("Image upload failed"));
            toast.error("Image upload failed");
          }
        } catch (error) {
          reject(error);
        }
      },
      "base64"
    );
  });
};
