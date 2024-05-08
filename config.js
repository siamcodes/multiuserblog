
const DB_URI =
  process.env.NODE_ENV === "production"
    ? "mongodb+srv://siamcodes:6Eba0874@cluster0.l2npy.gcp.mongodb.net/multiuserblog?retryWrites=true&w=majority"
    : "mongodb://localhost:27017/multiuserblog";


//const DB_URI = "mongodb+srv://siamcodes:6Eba0874@cluster0.l2npy.gcp.mongodb.net/multiuserblog?retryWrites=true&w=majority";

const API =
  process.env.NODE_ENV === "production"
    ? "https://multiuserblog-one.vercel.app/api"
    : "http://localhost:3000/api";

const NEXTAUTH_SECRET = "GSFGS5566dhdhDHDH888";

const GOOGLE_CLIENT_ID = "1051833473520-0u00l10smfs7gn4agqajb05qd4jfkui8.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "JpNPaXaDnU985DhyyUSMXlvT";

// merncms
const CLOUDINARY_CLOUD_NAME = "siamcodes-com";
const CLOUDINARY_API_KEY = "247645991226988";
const CLOUDINARY_API_SECRET = "U3T72RRFJLvpMxrC5ODkrDZqo9w";

// sending email
const GMAIL_AUTH_USER = "siamcodes@gmail.com";
const GMAIL_AUTH_PASS = "@6Eba0874";

module.exports = {
  DB_URI,
  API,
  NEXTAUTH_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  GMAIL_AUTH_USER,
  GMAIL_AUTH_PASS,
};
