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
  import { fetchUsers } from "../store/usersSlice";



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

  export default function Body({post , userID}) {
    
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false);
    const [dataHome, setDataHome] = useState([]);
    const navigate = useNavigate();
    const users = useSelector(state => state.usersslice.users)
    const [user, setusers] = useState([])
    console.log(users);
    const [allPosts, setAllPosts] = useState([])

    
    useEffect(() => {
      dispatch(fetchUsers());

      setTimeout(() => {
        const postsArray = [];
        if (users?.accounts) {
          for (let i = 0; i < users.accounts.length; i++) {
            postsArray.push(...users.accounts[i].posts);
          }
        }

        setAllPosts(postsArray);
      }, 2);

    }, [dispatch, users]);

    const handleLike = () => {
      dispatch(fetchUsers.likePost({ userID, postID: post.number }));
    };


    let userArray = []
    console.log(userArray, 'userAraayyyyemp');
    if(users?.account){

      for (let i = 0; i < users.accounts.length; i++) {
        let newArray = userArray.concat(users.accounts[i].posts)
        userArray.concat(newArray)

      }

      console.log(userArray, 'userAraayyyy');
    }
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
    const [ShowOverlayState, setShowOverlayState] = useState([false, "", "", "", "", ""]);
    const [showOverlay, overlayId, overlayCaption, overlayLikes, overlayImageID, overlayEmail] = ShowOverlayState;


    const handleOverlayStateChange = () => {
      setShowOverlayState(prevState => [!prevState[0], ...prevState.slice(1)]);
    };

    //bookmark is currently not stored in firestore database
    const [bookmark, setBookmark] = useState([]);

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
    }
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
          {allPosts && allPosts.length > 0 ? (
            allPosts.map((account, index) => (
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
                      <img src={account.imageurl} alt=''/>
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
                          // onClick={() =>
                          //   setShowOverlayState([
                          //     true,
                          //     account.username,
                          //     account.caption,
                          //     account.like,
                          //     account.image_link,
                          //     account.email,
                          //   ])
                          // }
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
                        />
                      </div>
                      <div className="interactablepostright">
                        <HomeBookmark
                        onClick={() => handleBookmark(account.username, index)}
                        bookmark={bookmark.includes(`${account.username}+${index}`)}
                        />
                      </div>
                    </div>
                    <div className="postfooter">
                      {liked ?
                        (<p className="homeLikeMeter">{parseInt(account.like) + 1} Likes</p>)
                        :
                        (<p className="homeLikeMeter">{account.likes} Likes</p>)
                      }
                      <p className="homeLikeMeter"></p>
                      <div className="postfootercaption">
                        <p className="postFooterAccountName">{account.username}</p>
                        <p className="postFooterAccountCaption">{account.caption}</p>
                      </div>
                      <p>1 comment</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No post available</p>
          )}
        </div>
      </div>
    );
  }