const selectedPhoto = "";

const PhotoUploadCard = () => {
  return (
    <div>
      <input type="file" accept="image/*" className="mb-4" />

      {selectedPhoto && (
        <div className="mb-4">
          <img
            src={selectedPhoto}
            alt="Selected"
            className="max-w-full h-auto rounded-md"
          />
        </div>
      )}

      <p className="text-gray-900 text-sm">
        Upload a photo for OCR processing.
      </p>
    </div>
  );
};

export default PhotoUploadCard;
