import React, { FC, useState, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataState } from "../reducer/buildPageReducer";
import { changeableImageType } from "../Blocks/helper/ChangeableImage";
import axios from "axios";
import { changeImage } from "../action/actions";

// in this tsx, textIndex means imageIndex.

const ChangeableImage: FC<changeableImageType> = ({
  blockIndex,
  imageIndex,
  dist,
}) => {
  const dispatch = useDispatch();

  const images: string = useSelector<dataState, string>(
    (state) => state.dataTypeArr[blockIndex].imageArr[imageIndex]
  );

  const [modalChangImg, setModalChangImg] = useState(false);
  const openModal = () => setModalChangImg(true);
  const closeModal = () => setModalChangImg(false);

  const fileInput = createRef();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const postUrl: string = "http://" + window.location.host + "/upload-img";
    const submitData = new FormData();

    submitData.append("image", fileInput.current.files[0]);

    await axios
      .post(postUrl, submitData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        const image: string = res.data.img;
        dispatch(changeImage({ blockIndex, imageIndex, image }));
        // images()
        console.log(image);
        console.log(images);
      });
  };

  const [modalImage, setModalImage] = useState(false);
  return dist ? (
    <></>
  ) : (
    <>
      {modalChangImg ? (
        <>
          <button className="upload-img" onClick={openModal}>
            changeImage
          </button>
        </>
      ) : (
        <>
          {/* <button className="upload-img" onClick={closeModal}>
            ✕
          </button> */}
          <form onSubmit={handleSubmit}>
            <label className="change_image">
              画像を変更
              <input type="file" ref={fileInput} onChange={handleSubmit} />
            </label>
            <button type="submit" style={{ display: "none" }}>
              Submit
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default ChangeableImage;
