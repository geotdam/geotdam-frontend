import { useCallback, useState } from "react";
import Icon from "../common/Icon";
import shareIcon from "../../assets/icons/share.svg";
import SharePopup from "../Share/SharePopup";

const ShareRoad = ({ routeId }) => {
  const [showPopup, setShowPopup] = useState(false);
  const shareUrl = `${window.location.origin}/road/${routeId}`; 

  const handleClick = useCallback(() => {
    if (!routeId) {
      alert("공유할 수 있는 루트가 없습니다.");
      return;
    }
    setShowPopup(true);
  }, [routeId]);

  return (
    <>
      <Icon
        src={shareIcon}
        alt="공유 아이콘"
        backgroundColor="#a5c64d"
        onClick={handleClick}
      />
      {showPopup && (
        <SharePopup shareUrl={shareUrl} onClose={() => setShowPopup(false)} />
      )}
    </>
  );
};

export default ShareRoad;
