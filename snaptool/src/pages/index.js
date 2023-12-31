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
import Head from "next/head";

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
      <Head>
        <title>Add Beautiful Background to Your Screenshots | Snaptool</title>
        <meta
          name="description"
          content="Add a beautiful background to your screenshots with Snaptool. Elevate your content creation with this powerful screenshot editing tool."
        />
        <meta
          name="keywords"
          content="snap, screenshot, tool, content creation, background"
        />
        <meta name="author" content="Utkarsh Nagar" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Additional meta tags can be added here */}
      </Head>
      <div
        className="flex flex-col min-h-screen bg-[#222C42] md:pl-5"
        onPaste={handlePaste}
      >
        <h2 className="text-4xl font-bold px-4  py-2 text-white md:mt-5">
          SnapTool
        </h2>
        <div className="grid grid-cols-1 p-1 md:grid-cols-3 md: mt-8 px-2 md:px-5">
          <div className="md:py-6 md:col-span-2">
            <div className="grid gap-6">
              <div
                {...getRootProps()}
                ref={captureDivRef}
                className={`min-h-[200px] md:min-h-[400px] xl:min-h-[400px] w-full rounded-md border border-slate-600 flex items-center justify-center py-full hover:cursor-pointer`}
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
                    width: "100%", // Adjusted width for smaller screens
                    padding: `${padding}px`,
                  }}
                >
                  <div
                    className={`${droppedImage === null ? "border border-dashed border-white" : ""}  text-white rounded-lg mx-4`}
                  >
                    {droppedImage ? (
                      <img
                        src={droppedImage}
                        alt="Dropped Image"
                        placeholder="Drag or Drop Image"
                        className={`w-full`}
                        style={{
                          position: "relative",
                          zIndex: 1,
                          borderRadius: `${imageBorder}px`,
                        }}
                      />
                    ) : (
                      <div className="flex flex-col  items-center py-12 justify-center">
                        <h1 className="text-2xl">Drag or Drop Image</h1>
                        <h4 className="text-md mt-2">
                          or click to select Image
                        </h4>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container py-4">
            <div className="grid gap-2">
              <div className="text-center">
                <h1 className="my-3 font-semibold text-xl md:text-2xl text-[#AAC1C5]">
                  Choose Background
                </h1>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 my-3">
                {bgColors.map((color, index) => (
                  <div key={index} className="text-center">
                    <button
                      key={index}
                      onClick={() => setCurrentBgColor(color)}
                      className="h-8 w-10 md:h-10 md:w-14 rounded-sm m-1 md:m-2"
                      style={{
                        background: `linear-gradient(to right, ${color.from}, ${color.to})`,
                      }}
                    ></button>
                    <p className="text-xs md:text-sm text-[#FFFFFF]">
                      {color.name}
                    </p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="my-2 text-[#FFFFFF]">
                  <h1 className="my-2 text-sm md:text-base">Border Radius</h1>
                  <Slider
                    defaultValue={[imageBorder]}
                    max={24}
                    step={1}
                    onValueChange={handleBorderChange}
                  />
                </div>
                <div className="my-2 text-[#FFFFFF]">
                  <h1 className="my-2 text-sm md:text-base">Padding</h1>
                  <Slider
                    defaultValue={[padding]}
                    max={120}
                    step={1}
                    onValueChange={handlePadddingChange}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 my-4">
                <input
                  type="checkbox"
                  onChange={() => setTwitterCheckbox(!twittercheckbox)}
                  className="bg-white text-black h-4 w-4"
                />
                <label
                  htmlFor="terms2"
                  className="text-xs md:text-sm font-medium text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
