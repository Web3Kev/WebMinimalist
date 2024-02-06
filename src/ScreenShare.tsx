import React from 'react';
import { useElementSize } from './useElementSize'; // Assuming you'll use this hook for something

interface ScreenShareProps {
  VideoView: ({ stream }: { stream: MediaStream | null }) => JSX.Element; // Allow stream to be null
  screenshares: { stream: MediaStream | null }[]; // Assuming screenshares is an array of objects with a stream
}

const ScreenShare: React.FC<ScreenShareProps> = ({
  VideoView,
  screenshares,
}) => {
  // Assuming you might use useElementSize somewhere here

  // Ensure there's at least one screenshare to display
  const hasScreenshare = screenshares && screenshares.length > 0;

  return (
    <>
      <div className="sharescreen-container topbar-child-common">
        <div className="sharescreen-div">
          {hasScreenshare ? (
            <VideoView stream={screenshares[0].stream} />
          ) : (
            <div>No screenshare available</div>
          )}
        </div>
      </div>
      <div className="innerSpace topbar-child-common"></div>
    </>
  );
};

export default ScreenShare;
