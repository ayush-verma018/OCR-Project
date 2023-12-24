import OcrDataForm from "./OcrDataForm";
import PhotoUploadCard from "./PhotoUploadCard";

const OcrPage = () => {
  return (
    <div>
      <h1 className="text-blue-500 text-2xl font-bold text-center my-4">
        ID Card OCR
      </h1>
      <div className="flex gap-8 align-center my-4 mx-4">
        {/* Left side: Photo Upload Card */}
        <div className="w-1/2 p-4 bg-blue-400 rounded-md">
          <h2 className="text-2xl text-white font-bold mb-4">Photo Upload</h2>
          <PhotoUploadCard />
        </div>

        {/* Right side: OCR Form */}
        <div className="w-1/2 p-4 bg-blue-400 rounded-md">
          <h2 className="text-2xl text-white font-bold mb-4">
            ID Card OCR Form
          </h2>
          <OcrDataForm />
        </div>
      </div>
    </div>
  );
};

export default OcrPage;
