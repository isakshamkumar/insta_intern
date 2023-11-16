import { React, useState } from 'react';
import ReactPlayer from 'react-player';
import { BsMusicNoteList } from 'react-icons/bs';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FiMessageCircle } from 'react-icons/fi';
import { FaTelegramPlane } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import '../css/reel.css'
import { reelsList } from '../data/reels';

function CheckUsernameReelsDescription(text) {
  let length = text.length;
  if (length >= 25) {
    return text.slice(0, 20) + " ..more";
  }
  else {
    return text;
  }
}

function randomizeReelsPosts(arr) {
  const shuffledArray = [...arr];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default function Reels() {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [randomizedReelsList, setRandomizedReelsList] = useState(randomizeReelsPosts(reelsList));
  const reelLiked = () => {
    setLiked(!liked);
  }
  const reelBookmarked = () => {
    setBookmarked(!bookmarked);
  }
  return (
    <div className='reels'>
      {randomizedReelsList.map((reels) => (
        <div className='reel'>
          <div className='reelsSectionOne'>
            <ReactPlayer
              className='reelVideoPlayer'
              width='369px'
              height='525px'
              url={reels.url}
              playing={true}
              loop={true}
              volume={0}
            />
            <div className='reelsSectionOneHeader'>
              <div className='reelsSectionOProfile'>
                <img src={reels.imageurl}></img>
                <p>{reels.id} &#183;</p>
                <h2>Follow</h2>
              </div>
              <div className='reelsCaption'>
                <p>{CheckUsernameReelsDescription(reels.description)}</p>
              </div>
              <div className='reelsAudioTitle'>
                <BsMusicNoteList size={12} color="white" style={{ padding: '2px' }} />
                <p>{reels.audio} &#183; Original Audio</p>
              </div>
            </div>
          </div>
          <div className='reelsSectionTwo'>
            <div className='reelsSectionTwoLike'>
              {liked ? (
                <AiFillHeart onClick={reelLiked} size={27} color="white" style={{ padding: '2px' }} />
              ) : (
                <AiOutlineHeart onClick={reelLiked} size={27} color="white" style={{ padding: '2px' }} />
              )}
              <p>{reels.likes}</p>
            </div>
            <div className='reelsSectionTwoComments'>
              <FiMessageCircle size={27} color="white" style={{ padding: '2px' }} />
              <p>{reels.comments}</p>
            </div>
            <div className='reelsSectionTwoForward'>
              <FaTelegramPlane size={27} color="white" style={{ padding: '2px' }} />
            </div>
            <div className='reelsSectionTwoBookmark'>
              {bookmarked ? (
                <BsFillBookmarkFill onClick={reelBookmarked} size={27} color="white" style={{ padding: '2px' }} />
              ) : (
                <BsBookmark onClick={reelBookmarked} size={27} color="white" style={{ padding: '2px' }} />
              )}
            </div>
            <div className='reelsSectionTwoMore'>
              <FiMoreHorizontal size={27} color="white" style={{ padding: '2px' }} />
            </div>
            <div className='reelsSectionTwoAudioOwner'>
              <img src={reels.imageurl}></img>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}