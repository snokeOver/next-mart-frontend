import React from "react";
import { Input } from "../input";
import { cn } from "@/lib/utils";

interface IImageUploaderProps {
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
  label: string;
  className?: string;
}

const ImageUploader = ({
  setImageFiles,
  setImagePreview,
  className,
  label,
}: IImageUploaderProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFiles((image) => [...image, file]);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((state) => [...state, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  return (
    <div className={cn("flex flex-col items-center w-full gap-4", className)}>
      <Input
        onChange={handleImageChange}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        id="image-uploader"
      />
      <label
        htmlFor="image-uploader"
        className="w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition"
      >
        {label}
      </label>
    </div>
  );
};

export default ImageUploader;
