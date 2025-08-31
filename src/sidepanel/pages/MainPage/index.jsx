import "@/styles/styles.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import WarningModal from "@/sidepanel/components/WarningModal";

const MainPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleStartClick = () => {
    navigate("/taskboard");
  };

  const handleLogoutAndClose = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/auth/kakao/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        },
      );

      localStorage.removeItem("accessToken");
      window.close();
    } catch {
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="flex w-full max-w-md flex-row justify-center gap-x-4 px-4">
          <button
            className="btn-orange"
            onClick={() => navigate("/repository")}
          >
            저장소
          </button>
          <button
            className="btn-orange"
            onClick={() => navigate("/settings")}
          >
            설정
          </button>
        </div>

        <div className="mt-16 w-full max-w-md px-4 text-center">
          <p className="mb-2 text-lg text-stone-950">쉬운 사용자 매뉴얼 생성기</p>
          <h1 className="text-5xl font-extrabold text-black">QuickManual</h1>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <button
            className="mb-4 cursor-pointer items-center rounded-2xl bg-orange-500 px-10 py-4 text-white hover:bg-orange-600"
            onClick={() => handleStartClick()}
          >
            <p className="mb-1 text-xl">매뉴얼 만들기</p>
            <p className="w-48 text-center text-2xl font-bold">START</p>
          </button>
          <button
            className="w-48 cursor-pointer rounded-2xl bg-gray-700 px-10 py-4 text-center text-2xl font-bold text-white hover:bg-gray-800"
            onClick={handleLogoutAndClose}
          >
            종 료
          </button>
        </div>
      </div>

      {showModal && (
        <WarningModal
          title="로그아웃 실패"
          message="로그아웃 중 오류가 발생했습니다."
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default MainPage;
