// GridComponent.tsx
import React, { useState, useEffect } from 'react';
import { useElementSize } from './useElementSize';

interface RemoteParticipant {
  stream: MediaStream | null; // Allow stream to be null
  inboundId?: string; // Optional inboundId property
}

interface GridComponentProps {
  remoteParticipants: RemoteParticipant[];
  VideoView: ({ stream }: { stream: MediaStream | null }) => JSX.Element; // Allow stream to be null
}

// function getDisplayName(id: string) {
//   return RemoteParticipant.find((p) => p.id === id)?.displayName || "Guest";
// }

const GridComponent: React.FC<GridComponentProps> = ({
  remoteParticipants,
  VideoView,
}) => {
  const [gridContainerRef, { width: gridWidth, height: gridHeight }] = useElementSize();
  const [gridStyle, setGridStyle] = useState<React.CSSProperties>({});
  const [itemStyle, setItemStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    let gridTemplateColumns = '1fr';
    let gridTemplateRows = '1fr';
    let itemWidth = '100px'; // Default, to be adjusted
    let itemHeight = '100px'; // Default, to be adjusted

    const itemsCount = remoteParticipants.length;
    const spaceBetween = .95; //5% off

    if (itemsCount === 1) 
    {
        if (gridHeight > gridWidth) {
          itemWidth = itemHeight = `${gridWidth*spaceBetween}px`;
        } else {
          itemWidth = itemHeight = `${gridHeight*spaceBetween}px`;
        }
  
        console.log("one participant");
      } 
      else if (itemsCount === 2) 
      {
        if (gridHeight > gridWidth) 
        {
          //vertical 2
          gridTemplateColumns = "1fr";
          gridTemplateRows = "repeat(2, 1fr)";
          itemWidth = itemHeight = `${(gridHeight / 2)*spaceBetween}px`;
          console.log("two participant : vertical");
        } 
        else 
        {
          //horizontal 2
          gridTemplateColumns = "repeat(2, 1fr)";
          gridTemplateRows = "1fr";
          const halfWidth = gridWidth / 2;
          if(halfWidth<gridHeight)
          {
            itemWidth = itemHeight =`${halfWidth*spaceBetween}px`;
          }else
          {
            itemWidth = itemHeight =`${gridHeight*spaceBetween}px`;
          }
        }
      } else if (itemsCount === 3 || itemsCount === 4) {
        if (gridHeight > gridWidth) {
          //2 by 2 square
          gridTemplateColumns = "repeat(2, 1fr)";
          gridTemplateRows = "repeat(2, 1fr)";
          itemWidth = itemHeight = `${(gridHeight / 2)*spaceBetween}px`;
          console.log("2 by 2 grid");
        } else {

          if (itemsCount === 3) {
            const thirdWidth = gridWidth / 3;
            const halfHeight = gridHeight / 2;
  
            if (thirdWidth < halfHeight) {
              //2 by 2 square
              gridTemplateColumns = "repeat(2, 1fr)";
              gridTemplateRows = "repeat(2, 1fr)";
              itemWidth = itemHeight = `${halfHeight*spaceBetween}px`;
              console.log("2 by 2 grid with 3");
            } else {
              //horizontal 3
              gridTemplateColumns = "repeat(3, 1fr)";
              gridTemplateRows = "1fr";
              if(thirdWidth<gridHeight)
              {
                itemWidth = itemHeight = `${thirdWidth*spaceBetween}px`;
              }
              else
              {
                itemWidth = itemHeight = `${gridHeight*spaceBetween}px`;
              }
              
              console.log("3 next to each other");
            }
          } else {
            const quarterWidth = gridWidth / 4;
            const halfHeight = gridHeight / 2;
  
            if (quarterWidth < halfHeight) {
              //2 by 2 square
              gridTemplateColumns = "repeat(2, 1fr)";
              gridTemplateRows = "repeat(2, 1fr)";
              itemWidth = itemHeight = `${halfHeight*spaceBetween}px`;
              console.log("2 by 2 grid with 4");
            } else {

              //horizontal 4 
              gridTemplateColumns = "repeat(4, 1fr)";
              gridTemplateRows = "1fr";
              
              if(quarterWidth<gridHeight)
              {
                itemWidth = itemHeight = `${quarterWidth*spaceBetween}px`;
              }
              else
              {
                itemWidth = itemHeight = `${gridHeight*spaceBetween}px`;
              }
              console.log("4 next to each other");
            }
          }
        }
      } else if (itemsCount === 5 || itemsCount === 6) 
      {
        if (gridHeight > gridWidth) {
          //no horizontal space... go vertical
          gridTemplateColumns = "repeat(2, 1fr)";
          gridTemplateRows = "repeat(3, 1fr)";
          itemWidth = itemHeight = `${(gridHeight / 3)*spaceBetween}px`;
          console.log("2 by 3 grid vertical");
        } 
        else 
        {
          //let's check horizontal space
          const thirdWidth = gridWidth / 3;
          const halfHeight = gridHeight / 2;
          const thirdHeight = gridHeight / 3;
  
          if (thirdWidth > thirdHeight) 
          {
            //bigger circles if grid is laying flat
            gridTemplateColumns = "repeat(3, 1fr)";
            gridTemplateRows = "repeat(2, 1fr)";
  
            if (thirdWidth > halfHeight) {
              itemWidth = itemHeight = `${halfHeight*spaceBetween}px`;
            } else {
              itemWidth = itemHeight = `${thirdWidth*spaceBetween}px`;
            }
  
            console.log("2 by 3 grid horizontal");
          } 
          else 
          {
            gridTemplateColumns = "repeat(2, 1fr)";
            gridTemplateRows = "repeat(3, 1fr)";
            itemWidth = itemHeight = `${thirdHeight*spaceBetween}px`;
            console.log("2 by 3 grid vertical");
          }
        }
      } 
      else if (itemsCount >= 6) 
      {
        if (gridHeight > gridWidth) {
          gridTemplateColumns = "repeat(2, 1fr)";
          gridTemplateRows = "repeat(4, 1fr)";
          itemWidth = itemHeight = `${(gridHeight / 4)*spaceBetween}px`;
          console.log("2 by 4 grid vertical");
        } else {
          if (gridWidth / 4 > gridHeight / 4) {
            gridTemplateColumns = "repeat(4, 1fr)";
            gridTemplateRows = "repeat(2, 1fr)";
  
            if (gridWidth / 4 > gridHeight / 2) {
              itemWidth = itemHeight = `${(gridHeight / 2)*spaceBetween}px`;
            } else {
              itemWidth = itemHeight = `${(gridWidth / 4)*spaceBetween}px`;
            }
            console.log("2 by 4 grid horizontal");
          } else {
            gridTemplateColumns = "repeat(2, 1fr)";
            gridTemplateRows = "repeat(4, 1fr)";
            itemWidth = itemHeight = `${(gridWidth / 4)*spaceBetween}px`;
            console.log("2 by 4 grid vertical");
          }
        }
      }

    setGridStyle({
      display: 'grid',
      gridTemplateColumns,
      gridTemplateRows,
      gridGap: '1vw', 
    });

    setItemStyle({
      width: itemWidth,
      height: itemHeight,
    });
  }, [gridWidth, gridHeight, remoteParticipants]);

  return (
    <div className="grid-container topbar-child-common" ref={gridContainerRef}>
      <div id="allpeople-grid" style={gridStyle}>
        {remoteParticipants.map((participant, index) => (
          <div key={index} className="grid-item" style={itemStyle}>
            <div className="other-div">
              <VideoView stream={participant.stream} />
            </div>
            {/* <p>{participant.displayName}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridComponent;
