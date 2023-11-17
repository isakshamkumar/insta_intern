import "../css/body.css";
import { FiMoreHorizontal } from "react-icons/fi";
import { accountList } from "../data/account";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiMessageSquare, FiBookmark } from "react-icons/fi";
import { RiShareForwardLine } from "react-icons/ri";
import { useRef, useState } from "react";
import React from "react";
import { BsFillBookmarkFill } from "react-icons/bs";
import { OverlayTest as ShowOverlay } from "../components/overlay/overlay";
import { useMediaQuery } from 'react-responsive'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import usersSlice, { fetchUsers, usersliceActions } from "../store/usersSlice";
import { addComment } from "../store/commentsSlice";

// function randomizeHomePosts(arr) {
//   const shuffledArray = [...arr];
//   for (let i = shuffledArray.length - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * (i + 1));
//     [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
//   }
//   return shuffledArray;
// }

// function randomNumberToShowPosts(num) {
//   return Math.floor(Math.random() * num);
// }

function CheckUsername(text) {
  let length = text.length;
  if (length >= 11) {
    return text.slice(0, 8) + "...";
  } else {
    return text;
  }
}

function HomeBookmark({ bookmark, onClick }) {
  if (bookmark) {
    return <BsFillBookmarkFill onClick={onClick} size={22} color="white" style={{ paddingRight: '8px', paddingTop: '7px', paddingBottom: '7px' }} />
  }
  return <FiBookmark onClick={onClick} size={25} color="white" style={{ paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />;
}

// storing all props as array in a state then passing it to the overlay component is a good idea for now

export default function Body() {
  const dispatch = useDispatch()
  const [liked, setLiked] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false)
 
  const [dataHome, setDataHome] = useState([]);
  // const userEmail = useSelector((state) => state.user.userEmail);
  const navigate = useNavigate();
  const users = useSelector(state => state.usersslice.users)
  const [user, setusers] = useState([])
  console.log(user, 'userssss');
  let userArray = []
  useEffect(() => {
    dispatch(fetchUsers());
    console.log('waiting for timeout');

    setTimeout(() => {
      console.log('waited for timeout');
      console.log(userArray, 'userAraayyyyemp');
      console.log(users);

      if (users?.accounts) {
        let newArray = [];
        for (let i = 0; i < users.accounts.length; i++) {
          newArray = newArray.concat(users.accounts[i].posts);
        }

        console.log(newArray, 'new');
        setusers(newArray);
        console.log('setted users');
      }
    }, 2000);
  }, []);
  const [commentValue, setcommentValue] = useState('')

const handleLike=()=>{
  setLiked(!liked);
}


  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
  // const [randomizedAccountList, setRandomizedAccountList] = useState(randomizeHomePosts(accountList));
  // const [randomizedStoryList, setRandomizedStoryList] = useState(randomizeHomePosts(accountList));
  // const [randomizedNumber, setRandomizedNumber] = useState(randomNumberToShowPosts(3));
  const [ShowOverlayState, setShowOverlayState] = useState([false, "", "", "", "", ""]);
  const [showOverlay, overlayId, overlayCaption, overlayLikes, overlayImageID, overlayEmail] = ShowOverlayState;


  const handleOverlayStateChange = () => {
    setShowOverlayState(prevState => [!prevState[0], ...prevState.slice(1)]);
  };

  //bookmark is currently not stored in firestore database
  const [bookmark, setBookmark] = useState(false);
  const handleBookmark = (accountId, postNumber) => {
    const bookmarkId = `${accountId}+${postNumber}`;
    if (bookmark.includes(bookmarkId)) {
      setBookmark(prevBookmarkImages => prevBookmarkImages.filter(image => image !== bookmarkId));
    } else {
      setBookmark(prevBookmarkImages => [...prevBookmarkImages, bookmarkId]);
    }
  };
  const handleNavigation = (targetEmail) => {
    navigate(`/profile?prop=${targetEmail}`)
    console.log();
  }
  const commentHandler = (number) => {
    // setCommentVisible(!commentVisible)
    let arrayToUpdate = user.findIndex(user => user.number === number)
    // console.log(arrayToUpdate,'array to update');
    if (arrayToUpdate !== -1) {
      setusers((prevUsers) => {
        const updatedArray = [...prevUsers];
        updatedArray[arrayToUpdate] = {
          ...updatedArray[arrayToUpdate],
          commentVisible: !updatedArray[arrayToUpdate].commentVisible,
        };
        console.log(updatedArray, 'inside if');
        return updatedArray;
      });
    }
    console.log(arrayToUpdate, 'after update');
  }
  const commentChangeHandler = (e) => {
    setcommentValue(e.target.value)
    console.log(e.target.value);

  }
  const addCommentHandler = (postId) => {
    let userId = "pushkarm029";
    let post = user.findIndex((user) => user.number===postId );
   console.log(post,'ppst se;ected');
   console.log(commentValue,'commmentvalueeeeeeee');
    if (post !== -1) {
      setusers((prevUsers) => {
        const updatedArray = [...prevUsers];
        const updatedPost = { ...updatedArray[post] };
        updatedPost.comment=[...updatedPost.comment, { userId, message: commentValue }];
        updatedArray[post] = updatedPost;
        return updatedArray;
      });
    }
  // usersliceActions.addComment(postId,commentValue)
  setcommentValue('')
  };

  return (
    // implement story is not completed yet
    <div className="body">
      {showOverlay && <ShowOverlay
        onStateChange={handleOverlayStateChange}
        OverAcID={overlayId}
        OverAcCaption={overlayCaption}
        OverAcLikes={overlayLikes}
        OverAcImages={overlayImageID}
        OverAcEmail={overlayEmail}
      />}

      <div className="stories">
        {accountList.slice(0, 8).map((account) => (
          <div key={account.id} className="storyinner">
            <img src={account.url} alt={account.id} />
            {/* <p>{CheckUsername(account.username)}</p> */}
            <p>{CheckUsername(account.id)}</p>
          </div>
        ))}
      </div>
      <div className="posts">
        {user?.length > 0 ? (
          user.map((account, index) => (
            // {account.posts.map(post=>post)}
            <div className="post" key={index}>
              <div className="individualpost" key={account.number}>
                <div className="postheader">
                  <div className="postheaderpartone">
                    {/* profile link to be fetched */}
                    <img src={account.imageurl} alt={account.number} />
                    <p className="postheadertopid">
                      {/* {account.username} */}
                    </p>
                    <p className="postheadertopduration">· 1 d</p>
                  </div>
                  <FiMoreHorizontal color="white" size={20} />
                </div>
                <div key={index}>
                  {/* implement double click like here */}
                  <div
                    // onDoubleClick={handleLike}
                    className="postimage"
                  >
                    <img src={account.imageurl} alt="" />
                  </div>
                  <div className="interactablepost">
                    <div className="interactablepostleft">
                      {liked ? (
                        <AiFillHeart
                          onClick={handleLike}
                          size={25} color="white" style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />
                      ) : (
                        <AiOutlineHeart
                           onClick={handleLike}
                          size={25}
                          color="white" style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }} />
                      )}
                      <FiMessageSquare
                        onClick={() => commentHandler(account.number)}
                        size={25}
                        color="white"
                        style={{
                          paddingLeft: "7px",
                          paddingRight: "7px",
                          paddingTop: "7px",
                          paddingBottom: "7px",
                        }}
                      />
                      <RiShareForwardLine
                        size={25}
                        color="white"
                        style={{
                          paddingLeft: "7px",
                          paddingTop: "7px",
                          paddingBottom: "7px",
                        }}
                        onClick={()=>alert(account.imageurl)}
                      />
                    </div>
                    <div style={bookmark?{backgroundColor:'white',height:'2rem',width:'2rem'}:{}}>
                      {bookmark ?<HomeBookmark
                      onClick={() =>setBookmark(!bookmark)}
                      // bookmark={bookmark.includes(`${account.username}+${index}`)}
                      />:<HomeBookmark size={25} color="white" style={{ paddingLeft: '7px', paddingRight: '7px', paddingTop: '7px', paddingBottom: '7px' }}
                      onClick={() =>setBookmark(!bookmark)}
                      // bookmark={bookmark.includes(`${account.username}+${index}`)}
                      />}
                      
                    </div>
                  </div>
                  <div className="postfooter">
                    {liked ?
                      (<p className="homeLikeMeter">{parseInt(account.likes) + 1} Likes</p>)
                      :
                      (<p className="homeLikeMeter">{account.like}{account.likes} Likes</p>)
                    }
                    <p className="homeLikeMeter"></p>
                    <div className="postfootercaption">
                      <p className="postFooterAccountName">{account.username}</p>
                      <p className="postFooterAccountCaption">{account.caption}</p>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <input
                        onChange={commentChangeHandler}
                        type="text"
                        value={commentValue}
                        placeholder="Add a comment..."
                        style={{
                          backgroundColor: 'black',
                          color: 'white',
                          border: 'none',
                          fontSize: '1rem',
                          width: '100%',
                          padding: '8px',
                          outline: 'none',
                        }}
                      />

                      <div onClick={() => addCommentHandler(account.number)} style={{ width: '20%', backgroundColor: 'black', color: '#0095f6', height: '2px' }}>Add</div>
                    </div>
                      {/* {account.comment.map(comment=><p>{comment.message.length} {comment.message.length > 1 ? 'Comments' : 'Comment'} </p>)} */}
                    
                    {account.commentVisible !== commentVisible ? (
                        <p>{account.comment.map(comment => <div>{comment.message}</div>)}</p>
                      ) : (
                        <p>No Comments</p>
                      )
                    }


                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading Posts....</p>
        )}
      </div>
    </div>
  );
}