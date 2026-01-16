import { RxEnterFullScreen, RxExitFullScreen } from "react-icons/rx";
import { useEffect, useState } from "react";

export const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  return (
    <button
      onClick={toggleFullscreen}
      className="opacity-90 cursor-pointer"
      title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
    >
      {isFullscreen ? (
        <RxExitFullScreen size={20} />
      ) : (
        <RxEnterFullScreen size={20} />
      )}
    </button>
  );
};
