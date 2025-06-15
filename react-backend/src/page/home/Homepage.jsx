// import React from "react";
// import { Button } from "antd";
// import { Select, QRCode, Input, Space } from "antd";
function Homepage() {
  // const [text, setText] = React.useState("https://ant.design/");
  const api_url = "http://52.76.95.241:8000";
  const image_path = "http://52.76.95.241:8000/storage/";

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const phone = localStorage.getItem("phone");
  const image = localStorage.getItem("image");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg text-center border-t-8 border-purple-400">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-8 tracking-wide drop-shadow">
          Homepage
        </h1>
        <div className="mb-8 space-y-2">
          <div className="text-lg font-semibold text-gray-700">
            <span className="text-gray-500">Name:</span>{" "}
            <span className="font-bold text-gray-800">{name}</span>
          </div>
          <div className="text-lg font-semibold text-gray-700">
            <span className="text-gray-500">Email:</span>{" "}
            <span className="font-bold text-gray-800">{email}</span>
          </div>
          <div className="text-lg font-semibold text-gray-700">
            <span className="text-gray-500">Phone:</span>{" "}
            <span className="font-bold text-gray-800">
              {phone || <span className="italic text-gray-400">N/A</span>}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full border-4 border-purple-300 shadow-lg flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 mb-2">
            {image ? (
              <img
                src={image_path + image}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-lg">No Image</span>
            )}
          </div>
          <div className="text-xs text-gray-400 break-all max-w-xs">
            {image ? image_path + image : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
