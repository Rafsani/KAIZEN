import React from "react";

export default function fetchImage(imageFilePath) {
  const PREFIX = process.env.PUBLIC_URL + "/";
  if (imageFilePath.startsWith("../client/public/")) {
    imageFilePath = imageFilePath.substr(17);
  }
  return PREFIX + imageFilePath;
}
