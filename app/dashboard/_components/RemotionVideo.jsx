import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  useVideoConfig,
  useCurrentFrame,
  interpolate,
} from "remotion";

const RemotionVideo = ({
  script,
  imageList,
  audioFileUrl,
  captions,
  createdBy,
  setDurationInFrame,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const getDurationFrame = () => {
    setDurationInFrame(captions[captions.length - 1]?.end/1000 * fps)
    return captions[captions.length - 1]?.end/1000 * fps
  }

  React.useEffect(() => {
    if (captions?.length > 0) {
      const totalDurationFrames =
        (captions[captions.length - 1]?.end / 1000) * fps;
      setDurationInFrame(totalDurationFrames);
    }
  }, [captions, fps, setDurationInFrame]);

  const totalDurationFrames =
    (captions[captions?.length - 1]?.end / 1000) * fps;

  const getCurrentCaptions = () => {
    const currentTime = (frame / fps) * 1000; // Convert frame number to milliseconds
    const currentCaption = captions.find(
      (word) => currentTime >= word.start && currentTime <= word.end
    );
    return currentCaption ? currentCaption.text : "";
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {imageList?.map((item, index) => {
        const startTime = (index * totalDurationFrames) / imageList?.length;
        const duration = getDurationFrame()
        const scale = (index) => interpolate(
            frame,
            [startTime, startTime + duration/2, startTime + duration],
            index%2===0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
        )
        return (
          <div key={index}>
            <AbsoluteFill
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Sequence
                key={index}
                from={startTime}
                durationInFrames={totalDurationFrames / imageList?.length}
              >
                <Img
                  src={item}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale(index)})` }}
                />
                <AbsoluteFill
                  style={{
                    color: "white",
                    justifyContent: "center",
                    top: undefined,
                    bottom: 50,
                    height: 150,
                    textAlign: "center",
                    width: "100%",
                    fontSize: 20,
                    fonttype: "bold",
                    fontFamily: "Arial",
                  }}
                >
                  {getCurrentCaptions()}
                </AbsoluteFill>
              </Sequence>
            </AbsoluteFill>
          </div>
        );
      })}
      <Audio src={audioFileUrl} />
    </AbsoluteFill>
  );
};

export default RemotionVideo;
