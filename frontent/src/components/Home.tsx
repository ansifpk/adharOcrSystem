import React, { useEffect, useState } from "react";
import { CloudUpload } from "lucide-react";
import useRequest from "../hooks/useRequest";
import toast from "react-hot-toast";
type DynamicObject = {
  [key: string]: string;
};
const Home: React.FC = () => {
  const [adharData, setAdhardata] = useState<DynamicObject>({});
  // const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [front, setFront] = useState<File | null>(null);
  const [back, setBack] = useState<File | null>(null);
  const [apiResponse, setApiResponse] = useState<string>(
    "Start Performing OCR by inputing your Aadhaar front and back"
  );
  const { doRequest, errors } = useRequest();
  const handleFileUpload = (side: "front" | "back") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    if (side == "front") {
      input.name = "frontImage";
    } else {
      input.name = "backImage";
    }
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          const result = event.target?.result as string;
          if (side === "front") {
            setFrontImage(result);
            setFront(file);
          } else {
            setBackImage(result);
            setBack(file);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };
  useEffect(() => {
    console.log(errors,"hiiiii")
    errors?.map((err) => toast.error(err.message));
  }, [errors]);
  const handleParseAadhaar = async () => {
    setLoading(true)
    
    if (frontImage && backImage) {

      
      // setSuccess(false);
    
      setApiResponse("");
      const formData = new FormData();
      formData.append("frontImage", front as File);
      formData.append("backImage", back as File);
      setApiResponse("Processing Aadhaar card...");
      doRequest({
        url: "/detailes",
        method: "post",
        body: formData,
        onSuccess: (res) => {
          setAdhardata(res.data);
          setLoading(false)
          // setSuccess(true);
          setApiResponse("");
        },
      });
    } else {
      setLoading(false)
      setApiResponse("Please upload both front and back of Aadhaar card");
    }
  };

  return (
    <div className=" w-full mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="w-full flex justify-center gap-10">
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Aadhaar Front</label>
            <div
              onClick={() => handleFileUpload("front")}
              className="border-2 border-dashed border-purple-300 rounded-lg text-center cursor-pointer hover:bg-purple-50 transition h-40 w-72 flex items-center justify-center"
            >
              {frontImage ? (
                <img
                  src={frontImage}
                  alt="Aadhaar Front"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <CloudUpload className="text-purple-500" size={40} />

                  <p className="text-purple-500 mt-2">
                    Click here to Upload/Capture
                  </p>
                </div>
              )}
            </div>
            <div className="w-full p-2 justify-center flex">
              {frontImage && (
                <button
                  className="w-50 text-xs rounded-full bg-zinc-400 text-white py-3  hover:bg-zinc-500 cursor-pointer transition"
                  onClick={() => handleFileUpload("front")}
                >
                  <i className="bi bi-camera-fill"></i> Press to
                  Re-capture/Upload
                </button>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Aadhaar Back</label>
            <div
              onClick={() => handleFileUpload("back")}
              className="border-2 border-dashed border-purple-300 rounded-lg text-center cursor-pointer hover:bg-purple-50 transition h-40 w-72 flex items-center justify-center"
            >
              {backImage ? (
                <img
                  src={backImage}
                  alt="Aadhaar Back"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <CloudUpload className="text-purple-500" size={40} />
                  <p className="text-purple-500 mt-2">
                    Click here to Upload/Capture
                  </p>
                </div>
              )}
            </div>
            <div className="w-full p-2 justify-center flex">
              {backImage && (
                <button
                  className="w-50 text-xs rounded-full bg-zinc-400 text-white py-3  hover:bg-zinc-500 cursor-pointer transition"
                  onClick={() => handleFileUpload("back")}
                >
                  <i className="bi bi-camera-fill"></i> Press to
                  Re-capture/Upload
                </button>
              )}
            </div>
          </div>
          <button
            onClick={handleParseAadhaar}
            disabled={loading}
            className={`w-full bg-blue-500 text-white py-3 rounded-lg  ${loading?"":'hover:bg-blue-600 transition cursor-pointer'}`}
          >

            PARSE AADHAAR
          </button>
        </div>
        <div className="mt-4 p-3 bg-gray-100 w-100 rounded-lg text-gray-700">
          {
            loading?(
              <>
              <div className="flex justify-center items-center h-screen">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 bg-black rounded-sm animate-brick-wave delay-${
                        i * 100
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </>
            ):( 
              <>
                {
                  apiResponse?apiResponse:
                  <>
                  <div className=" grid grid-cols-2 gap-2">
                     <div className="border-b ">
                       <label htmlFor="adharnum">Adhar Number</label>
                       <p className="text-xs">{adharData.UID}</p>
                     </div>
                     <div className="border-b ">
                      <label htmlFor="adharnum">Adhar Number</label>
                      <p className="text-xs">{adharData.Name}</p>
                     </div>
                     <div className="border-b ">
                       <label htmlFor="adharnum">Date of Birth</label>
                       <p className="text-xs">{adharData.DOB}</p>
                     </div>
                     <div className="border-b ">
                      <label htmlFor="adharnum">Adhar Gender</label>
                      <p className="text-xs">{adharData.Gender}</p>
                     </div>
                     
                  </div>
                  <div>
                  <div className="border-b ">
                       <label htmlFor="adharnum">Address</label>
                       <p className="text-xs">{adharData.addres} {adharData.district} {adharData.state}</p>
                     </div>
                     <div className="border-b ">
                      <label htmlFor="adharnum">Pincode</label>
                      <p className="text-xs">{adharData.pincode}</p>
                     </div>
                  </div>
                </>
                }
              </>
            )
          }
          
        </div>
      </div>
    </div>
  );
};

export default Home;
