import Image from "next/image";
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useDropzone } from "react-dropzone";

export default function PlaygroundPage() {
  const [droppedImage, setDroppedImage] = useState(null);

  const onDelete = () => {
    setDroppedImage(null);
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
  ];
  const [currentBgColor, setCurrentBgColor] = useState(bgColors[0]);

  return (
    <>
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">SnapTool</h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            {/* <PresetSelector presets={presets} />
            <PresetSave /> */}
            <div className="hidden space-x-2 md:flex">
              {/* <CodeViewer />
              <PresetShare /> */}
            </div>
            {/* <PresetActions /> */}
          </div>
        </div>
        <Separator />
        <Tabs defaultValue="complete" className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_300px]">
              <div className="md:order-1">
                <TabsContent value="complete" className="mt-0 border-0 p-0">
                  <div className="flex h-full flex-col space-y-4">
                    <div
                      {...getRootProps()}
                      className={`h-full flex items-center justify-center min-h-[300px] lg:min-h-[480px] xl:min-h-[480px] w-full border-2 border-slate-600 flex items-center justify-center py-full rounded-3xl hover:cursor-pointer`}
                      style={{
                        background: `linear-gradient(to right, ${currentBgColor.from}, ${currentBgColor.to})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <input {...getInputProps()} />
                      <div className="dropzone-div h-50 w-60">
                        {droppedImage && (
                          <img
                            src={droppedImage}
                            alt="Dropped Image"
                            className="w-60 h-60 "
                            style={{ position: "relative", zIndex: 1 }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>

              <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                <div className="grid gap-2">
                  <HoverCard openDelay={200}>
                    <HoverCardTrigger asChild>
                      <span className="text-md text-semibold font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Choose Background
                      </span>
                    </HoverCardTrigger>
                  </HoverCard>

                  <div className="grid grid-cols-5 my-10">
                    {bgColors.map((color, index) => {
                      return (
                        <button
                          key={index}
                          onClick={() => setCurrentBgColor(color)}
                          className="h-10 w-10 rounded-xl"
                          style={{
                            background: `linear-gradient(to right, ${color.from},${color.to}`,
                          }}
                        ></button>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button className="w-full">Download</Button>
                    <Button className="w-full " onClick={() => onDelete()}>
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  );
}
