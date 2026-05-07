export const getImageUrl = (image) => {
  if (!image) {
    return "";
  }

  return typeof image === "string" ? image : image.url;
};

export const splitLines = (value = "") => value.split("\n").filter(Boolean);
