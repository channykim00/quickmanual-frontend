import "@/styles/styles.css";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import kakaoLoginBtn from "@/assets/kakao_login_large_narrow.png";
import logoIcon from "@/assets/logo.png";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.token) {
        localStorage.setItem("accessToken", event.data.token);
        setIsLoggedIn(true);
        navigate("/");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleLoginClick = () => {
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code&prompt=login`;

    const popup = window.open(kakaoLoginUrl, "_blank", "width=500,height=700");

    if (!popup) {
      alert("팝업이 차단되었어요. 브라우저 설정을 확인해주세요.");
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-orange-500 px-4">
        <div className="flex flex-col items-center space-y-4">
          <img
            src={logoIcon}
            alt="quickmanual Logo"
            className="h-40 w-40"
          />
          <h1 className="text-5xl font-extrabold text-white">QuickManual</h1>
        </div>

        <p className="mt-8 text-center font-bold text-white">
          매뉴얼을 더 쉽고 빠르게
          <br />
          만들어보세요!!
        </p>

        <div className="mt-25">
          <button onClick={handleLoginClick}>
            <img
              src={kakaoLoginBtn}
              alt="카카오 로그인"
              className="h-auto w-[200px]"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
