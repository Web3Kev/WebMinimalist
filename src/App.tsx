import * as React from "react";
import "./styles.css";
import { useRoomConnection } from "@whereby.com/browser-sdk/react";
import IconButton from "./IconButton";
import { useElementSize } from "./useElementSize"; // Adjust the path according to your file structure
import GridComponent from "./GridComponent";
// import ScreenShare from "./ScreenShare";



export default function App({ roomUrl, displayName }: { roomUrl: string; displayName: string  }) {

  const [isConnected, setIsConnected] = React.useState(false);



  const [isCameraActive, setIsCameraActive] = React.useState(true);
  const [isMicrophoneActive, setIsMicrophoneActive] = React.useState(true);
  const [isLocalScreenshareActive, setIsLocalScreenshareActive] =
    React.useState(false);
  const [showButtons, setShowButtons] = React.useState(false);
  const [buttonOpacity, setButtonOpacity] = React.useState(0);

  const [selfDivRef, selfSize] = useElementSize(); //?
  const [selfContainerRef, selfContainerSize] = useElementSize();
  const [selfDivStyle, setSelfDivStyle] = React.useState({});
  const [buttonStyle, setButtonStyle] = React.useState({});

  const roomConnection = useRoomConnection(roomUrl, {
    localMediaOptions: {
      audio: true,
      video: true,
    },
  });

  const { actions, components, state } = roomConnection;
  const { VideoView } = components;
  const { localParticipant, remoteParticipants, screenshares } = state; //chatMessages
  const {
    toggleCamera,
    toggleMicrophone,
    startScreenshare,
    stopScreenshare,
  } = actions;

  function getDisplayName(id: string) {
    return remoteParticipants.find((p) => p.id === id)?.displayName || "Guest";
  }

  // Function to show buttons with fade-in effect
  const handleMouseEnter = () => {
    setShowButtons(true); // Ensure buttons are rendered
    setButtonOpacity(1); // Start fade-in
  };

  // Function to initiate fade-out effect
  const initiateFadeOut = () => {
    setButtonOpacity(0); // Start fade-out
    // Wait for fade-out to complete before hiding buttons
    setTimeout(() => setShowButtons(false), 2000); // Matches CSS transition
  };

  // Trigger fade-out after a delay when buttons are shown
  React.useEffect(() => {
    if (showButtons) {
      const timer = setTimeout(initiateFadeOut, 2000); // Start fade-out after buttons are shown for 2 seconds
      return () => clearTimeout(timer); // Cleanup timeout if component unmounts or state changes again before executing
    }
  }, [showButtons]);

  React.useEffect(() => {
    // Logic to adjust styles based on container size
    if (selfContainerSize.height > selfContainerSize.width) {
      // Vertical orientation
      setSelfDivStyle({
        height: `${selfContainerSize.width*.95}px`,
        width: `${selfContainerSize.width*.95}px`,
      });
      setButtonStyle({
        flexDirection: "column",
      });
    } else {
      // Horizontal orientation
      setSelfDivStyle({
        height: `${selfContainerSize.height*.95}px`,
        width: `${selfContainerSize.height*.95}px`,
      });
      setButtonStyle({
        flexDirection: "row",
      });
    }
  }, [selfContainerSize]); // Dependency array ensures this runs when selfContainerSize changes

  return (
    <div className="topbar-container">
      <GridComponent
        remoteParticipants={remoteParticipants}
        VideoView={VideoView as unknown as (props: { stream: MediaStream | null }) => JSX.Element}
      />


      <div className="innerSpace topbar-child-common"></div>

      {/* <div className="sharescreen-container topbar-child-common">
        <div className="sharescreen-div">
        {screenshares[0]?.stream ? (
  
          
            <VideoView stream={screenshares[0].stream} />
        ):null}
        </div>
      </div>
      <div className="innerSpace topbar-child-common"></div> */}

      {/* {screenshares[0]?.stream ? (
          <>
          <div className="sharescreen-container topbar-child-common">
            <div className="sharescreen-div">
                <VideoView stream={screenshares[0].stream} />
            </div>
          </div>
          <div className="innerSpace topbar-child-common"></div>
        </>
        ) : null} */}

      {/* <div className="spotlight-container topbar-child-common">
        <div className="spotlight-div"></div>
      </div>

      <div className="sharescreen-container topbar-child-common">
        <div className="spotlight-div"></div>
        <div className="sharescreen-div"></div>
      </div>
      <div className="innerSpace topbar-child-common"></div> */}

      <div
        ref={selfContainerRef}
        className="self-container topbar-child-common"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={initiateFadeOut}
      >
        <div ref={selfDivRef} style={selfDivStyle} className="self-div">
          {/* Conditionally render local participant's video */}
          {localParticipant?.stream && (
            <VideoView muted stream={localParticipant.stream} />
          )}
        </div>

        {/* Conditionally render buttons based on showButtons state */}
        {showButtons && (
          <div
            className="buttons"
            style={{ ...buttonStyle, opacity: buttonOpacity }}
          >
            <IconButton
              variant="camera"
              isActive={isCameraActive}
              onClick={() => {
                setIsCameraActive((prev) => !prev);
                toggleCamera();
              }}
            />
            <IconButton
              variant="microphone"
              isActive={isMicrophoneActive}
              onClick={() => {
                setIsMicrophoneActive((prev) => !prev);
                toggleMicrophone();
              }}
            />
          </div>
        )}
      </div>
      {/* <div className="innerSpace topbar-child-common"></div> */}
    </div>
  );


}
