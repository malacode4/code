import { useState } from "react";
import SideBar from "./SideBar";

const SaveSegment = () => {
  const [closeBar, setCloseBar] = useState(false);

  const onClosePage = () => setCloseBar(false);
  const onOpenPage = () => setCloseBar(true);
  return (
    <>
      <div className="segment-card">
        <div className="segmet-inner-card col-md-8">
          <div
            className={`segment-header-sec ${closeBar ? "seg-opacity" : ""}`}
          >
            <div className="view-aud">View Audience</div>
          </div>
          <div className={`segment-body ${closeBar ? "seg-opacity" : ""}`}>
            <button className="segment-btn" onClick={onOpenPage}>
              Save Segment
            </button>
          </div>
          <div className={`sidebar-position ${closeBar ? "" : "width-0"}`}>
            <SideBar onClosePage={onClosePage} />
          </div>
        </div>
      </div>
    </>
  );
};
export default SaveSegment;
