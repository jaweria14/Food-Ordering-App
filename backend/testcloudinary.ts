import "dotenv/config";
import crypto from "node:crypto";

async function testUpload() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary environment variables are missing");
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();

  // Only timestamp is included in the signature
  const signature = crypto
    .createHash("sha1")
    .update(`timestamp=${timestamp}${apiSecret}`)
    .digest("hex");

  const formData = new URLSearchParams({
    file: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    api_key: apiKey,
    timestamp,
    signature,
  });

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    }
  );

  const result = await response.text();

  console.log("HTTP status:", response.status);
  console.log("Response:", result);
}

testUpload().catch(console.error);