import * as React from 'react';

const submitLikePost = (id: number) => {
  console.log(`POST request to like ${id}`)
}

const submitUnlikePost = (id: number) => {
  console.log(`POST request to unlike ${id}`)
}

export const LikeButton = (props: { id: number, likes: number, setNumOfLikes:  React.Dispatch<React.SetStateAction<number>> }) => {
  const { id, likes, setNumOfLikes } = props;
  const unLikedImage = "https://cdn-icons-png.flaticon.com/512/1077/1077035.png";
  const likedImage = "https://cdn-icons-png.flaticon.com/512/1076/1076984.png"

  const [image, setImage] = React.useState(unLikedImage);

  const onClick = () => {
    if (image === likedImage) {
      setImage(unLikedImage);
      setNumOfLikes(likes);
      submitUnlikePost(id);
    } else {
      setImage(likedImage);
      setNumOfLikes(likes + 1);
      submitLikePost(id);
    }
  };

  return (
    <a onClick={onClick} style={{padding: "5px"}}>
      <img src={image} alt="" width="30px" height="30px" />
    </a>
  );
};