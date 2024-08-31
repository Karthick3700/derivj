import React, { Fragment, useState } from "react";
import defaultImage from "../../../public/default-ui.png";
import Image from "next/image";
// import { useSelector } from "react-redux";

const ImageUploader = () => {
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";
  // const path = useSelector((state) => state?.profile?.imagePath);

  const [avatarurl, setAvatarUrl] = useState(defaultImage);

  // useEffect(() => {
  //   if (path && path.trim()) {
  //     setAvatarUrl(`${imageBaseUrl}${path}`);
  //   } else {
  //     setAvatarUrl(defaultImage);
  //   }
  // }, [path, imageBaseUrl]);

  return (
    <Fragment>
      <div className="w-full h-full col-span-1">
        <div className=" w-24 h-24 md:w-36 md:h-36 border-2 rounded-full  flex items-center justify-center overflow-hidden">
          <Image
            src={avatarurl}
            className="w-full h-full"
            alt="User profile image"
            loading="lazy"
            width={100}
            height={100}
          />
        </div>
      </div>
    </Fragment>
  );
};
export default ImageUploader;
