import Image from "next/image";
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useDropzone } from "react-dropzone";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";

function Footer() {
  return (
    <div className="w-full md:h-5 text-xs md:text-lg px-4 sm:px-6 lg:px-8 pt-6 pb-2 md:fixed bottom-15 md:bottom-10 bg-[#222C42]">
      <div className="flex justify-center text-center font-normal text-white">
        <span className="font-normal">© 2023 </span>
        <Link
          href="https://github.com/Utkarshn10"
          className="ml-1  hover:underline underline-offset-2"
        >
          Utkarsh Nagar
        </Link>
        <span className="ml-1">· All rights reserved.</span>
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  const [droppedImage, setDroppedImage] = useState(null);
  const [imageHeight, setImageHeight] = useState(400);
  const [padding, setPadding] = useState(2);
  const [imageWidth, setImageWidth] = useState(400);
  const [imageBorder, setImageBorder] = useState(0);
  const [twittercheckbox, setTwitterCheckbox] = useState(false);
  const captureDivRef = useRef(null);

  const onDelete = () => {
    setDroppedImage(null);
  };

  const handleBorderChange = (newValue) => {
    setImageBorder(newValue);
  };

  const handlePadddingChange = (newValue) => {
    setPadding(newValue);
  };

  const handleHeightChange = (newValue) => {
    setImageHeight(newValue);
  };

  const handleWidthChange = (newValue) => {
    setImageWidth(newValue);
  };

  const downloadImage = () => {
    if (captureDivRef.current) {
      const divToCapture = captureDivRef.current;
  
      // Temporarily remove the border radius from the outer div for capture
      const originalBorderRadius = divToCapture.style.borderRadius;
      divToCapture.style.borderRadius = "0";
  
      const scale = 2;
  
      html2canvas(divToCapture, { scale }).then((canvas) => {
        // Reset the border radius to its original value
        divToCapture.style.borderRadius = originalBorderRadius;
  
        canvas.toBlob((blob) => {
          saveAs(blob, "snaptool-image.png"); // You can change the file format and name here
        });
      });
    }
  };
  
  const downloadTwitterHeaderImage = () => {
    if (captureDivRef.current) {
      const divToCapture = captureDivRef.current;
  
      // Set the dimensions of the div to match Twitter header dimensions (1500x500)
      const width = 1500;
      const height = 500;
  
      divToCapture.style.width = width + "px";
      divToCapture.style.height = height + "px";
  
      // Temporarily remove the border radius from the outer div for capture
      const originalBorderRadius = divToCapture.style.borderRadius;
      divToCapture.style.borderRadius = "0";
  
      // Define the scale to capture a higher-quality image (e.g., 2 for 2x resolution)
      const scale = 2;
  
      html2canvas(divToCapture, { scale }).then((canvas) => {
        // Reset the dimensions and border radius to their original values
        divToCapture.style.width = ""; // Clear the width
        divToCapture.style.height = ""; // Clear the height
        divToCapture.style.borderRadius = originalBorderRadius;
  
        canvas.toBlob((blob) => {
          saveAs(blob, "snaptool-twitter-header.png"); // You can change the file format and name here
        });
      });
    }
  };
  

  const onDrop = useCallback((acceptedFiles) => {
    const imageFile = acceptedFiles.find((file) =>
      file.type.startsWith("image/")
    );

    if (imageFile) {
      const reader = new FileReader();

      reader.onload = function () {
        setDroppedImage(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handlePaste = (event) => {
    const items = event.clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        const reader = new FileReader();

        reader.onload = () => {
          setDroppedImage(reader.result);
        };

        reader.readAsDataURL(blob);

        // Prevent the default paste action (e.g., pasting text)
        event.preventDefault();
        break; // Stop processing further items
      }
    }
  };

  const bgColors = [
    {
      name: "Sweet Morning",
      from: "#FF5F6D",
      to: "#FFC371",
    },
    {
      name: "Green Beach",
      from: "#02AABD",
      to: "#00CDAC",
    },
    {
      name: "Bloody Mary",
      from: "#FF512F",
      to: "#DD2476",
    },
    {
      name: "Yosemite",
      from: "#EA8D8D",
      to: "#A890FE",
    },
    {
      name: "Exotic",
      from: "#FF61D2",
      to: "#FE9090",
    },
    {
      name: "Norse Beauty",
      from: "#ec77ab",
      to: "#7873f5",
    },
    {
      name: "Happy Memories",
      from: "#ff5858",
      to: "#ff5858",
    },
  ];
  const [currentBgColor, setCurrentBgColor] = useState(bgColors[0]);

  return (
    <>
      <Analytics />
      <div
        className="flex flex-col min-h-screen bg-[#222C42]"
        onPaste={handlePaste}
      >
        <h2 className="text-4xl font-bold px-4  py-2 text-white">SnapTool</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 px-5">
          <div className="py-6 col-span-2">
            <div className="grid gap-6">
              <div className="flex flex-col space-y-4">
                <div
                  {...getRootProps()}
                  ref={captureDivRef}
                  className={`h-full min-h-[300px] lg:min-h-[400px] xl:min-h-[400px] w-full rounded-md border border-slate-600 flex items-center justify-center py-full hover:cursor-pointer`}
                  style={{
                    background: `linear-gradient(to right, ${currentBgColor.from}, ${currentBgColor.to})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <input {...getInputProps()} />
                  <div
                    className={`dropzone-div`}
                    style={{
                      width: `${imageWidth}px`,
                      height: `${imageHeight}px`,
                      padding: `${padding}px`,
                    }}
                  >
                    {droppedImage && (
                      <img
                        src={droppedImage}
                        alt="Dropped Image"
                        className={`w-full h-full`}
                        style={{
                          position: "relative",
                          zIndex: 1,
                          borderRadius: `${imageBorder}px`,
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container py-4">
            <div className="grid gap-2">
              <div className="text-center">
                <h1 className="my-3 font-semibold text-2xl text-[#AAC1C5]">
                  Choose Background
                </h1>
              </div>
              <div className="grid grid-cols-4 my-3">
                {bgColors.map((color, index) => (
                  <div key={index} className="text-center">
                    <button
                      key={index}
                      onClick={() => setCurrentBgColor(color)}
                      className="h-10 w-14 rounded-sm m-2"
                      style={{
                        background: `linear-gradient(to right, ${color.from}, ${color.to})`,
                      }}
                    ></button>
                    <p className="text-xs text-[#FFFFFF]">{color.name}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {" "}
                <div className="my-2 text-[#FFFFFF]">
                  <h1 className="my-2">Border Radius</h1>
                  <Slider
                    defaultValue={[imageBorder]}
                    max={24}
                    step={1}
                    onValueChange={handleBorderChange}
                  />
                </div>
                <div className="my-2 text-[#FFFFFF]">
                  <h1 className="my-2">Padding</h1>
                  <Slider
                    defaultValue={[padding]}
                    max={200}
                    step={1}
                    onValueChange={handlePadddingChange}
                  />
                </div>
                <div className="my-2 text-[#FFFFFF]">
                  <h1 className="my-2">Height</h1>
                  <Slider
                    defaultValue={[imageHeight]}
                    max={550}
                    step={1}
                    onValueChange={handleHeightChange}
                  />
                </div>
                <div className="my-2 text-[#FFFFFF]">
                  <h1 className="my-2">Width</h1>
                  <Slider
                    defaultValue={[imageWidth]}
                    max={900}
                    step={1}
                    onValueChange={handleWidthChange}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 my-4">
                <input type="checkbox" onChange={() => setTwitterCheckbox(!twittercheckbox)} className="bg-white text-black h-4 w-4"/>
                <label
                  htmlFor="terms2"
                  className="text-sm font-medium text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Twitter Header
                </label>
              </div>
              {droppedImage !== null ? (
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    className="w-full"
                    onClick={() =>
                      twittercheckbox
                        ? downloadTwitterHeaderImage()
                        : downloadImage()
                    }
                  >
                    Download
                  </Button>
                  <Button className="w-full " onClick={() => onDelete()}>
                    Remove
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
