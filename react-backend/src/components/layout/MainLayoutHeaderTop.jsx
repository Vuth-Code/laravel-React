import { Input } from "antd";
import { config } from "../../util/config";
import Logo from "../../assets/logo/logo.jpg";
import { IoNotifications } from "react-icons/io5";
import { Dropdown } from "antd";
import { useNavigate } from "react-router-dom";

const items = [
  {
    key: "profile",
    label: "Profile",
  },
  {
    key: "change-password",
    label: "Change Password",
    // disabled: true,
  },
  {
    key: "forget-password",
    label: "Forget Password",
    // disabled: true,
  },
  {
    key: "logout",
    danger: true,
    label: "Logout",
  },
];

function MainLayoutHeaderTop() {
  const navigate = useNavigate();
  const user_profile = localStorage.getItem("image");
  const user_name = localStorage.getItem("name");
  const user_email = localStorage.getItem("email");

  return (
    <div className="h-[70px] flex items-center justify-between px-8 py-3 bg-gradient-to-r from-blue-50 to-purple-100 shadow-sm border-b border-gray-200">
      <div className="flex items-center gap-4">
        <img
          src={Logo}
          alt="logo"
          className="w-[48px] h-[48px] rounded-lg shadow"
        />
        <div className="leading-tight">
          <h1 className="text-2xl font-extrabold text-purple-700 tracking-wide">
            KH-STORE
          </h1>
          <div className="text-xs text-gray-500 font-medium uppercase tracking-widest">
            Online Shop
          </div>
        </div>
        <div className="ml-8">
          <Input.Search
            placeholder="Search"
            className="w-64 rounded-lg shadow-sm"
          />
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        {/* Empty div for centering effect */}
      </div>
      <div className="flex items-center gap-6 min-w-[320px] justify-end">
        <IoNotifications className="text-2xl text-gray-500 hover:text-purple-600 transition" />
        <Dropdown
          menu={{
            items,
            onClick: ({ key }) => {
              if (key === "logout") {
                localStorage.clear();
                window.location.href = "/login";
              } else if (key === "profile") {
                navigate("/profile");
              }
            },
          }}
        >
          <a
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="text-right">
              <h1 className="text-md font-semibold text-gray-800">
                {user_name}
              </h1>
              <div className="text-xs text-gray-500">{user_email}</div>
            </div>
            <img
              src={config.image_path + user_profile}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-purple-300 shadow"
            />
          </a>
        </Dropdown>
      </div>
    </div>
  );
}
export default MainLayoutHeaderTop;
