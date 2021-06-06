import React, { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Card, Image } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../App';

const UserProfile = () => {
  const [userProfile, setProfile] = useState('');
  const [updateData, setUpdateData] = useState([userProfile]);

  const { state, dispatch } = useContext(UserContext);
  const { userId } = useParams();
  const [showfollow, setShowFollow] = useState(
    state ? !state.following.includes(userId) : true
  );
  //console.log(userId)
  useEffect(() => {
    if (updateData) {
      fetch(`/user/${userId}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          //console.log(result)
          setProfile(result);
        });
    }
  }, [updateData]);
  const like = (id) => {
    fetch('/like', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        const newData = updateData.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setUpdateData(newData);
      })
      .catch((e) => console.log(e));
  };
  const unlike = (id) => {
    fetch('/unlike', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = updateData.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setUpdateData(newData);
      })
      .catch((e) => console.log(e));
  };
  const makeComment = (text, postId) => {
    fetch('/comment', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        text,
        postId,
      }),
    })
      .then((res) => res.json())
      .then((comment) => {
        console.log(comment);
        const newData = updateData.map((item) => {
          if (item._id === comment._id) {
            return comment;
          }
          return item;
        });
        setUpdateData(newData);
      });
  };
  const followUser = () => {
    fetch('/follow', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        // setFollow(result)
        dispatch({
          type: 'UPDATE',
          payload: { following: result.following, followers: result.followers },
        });
        localStorage.setItem('user', JSON.stringify(result));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, result._id],
            },
          };
        });
        setShowFollow(false);
      })
      .catch((e) => console.log(e));
  };

  const unfollowUser = () => {
    fetch('/unfollow', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        unfollowId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'UPDATE',
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem('user', JSON.stringify(data));

        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item != data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowFollow(true);
      });
  };
  return (
    <>
      {userProfile ? (
        <div className='userProfileHeadrer'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              backgroundColor: 'white',
              margin: '0',
            }}>
            <div>
              <img
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '80px',
                  border: '1px solid green',
                  marginTop: '7px',
                }}
                src={userProfile.user.pic}
              />
            </div>
            <div>
              <h4>{userProfile.user.name}</h4>
              <h5>{userProfile.user.email}</h5>
              <h5>Department: {userProfile.user.department}</h5>
              <h5>Session: {userProfile.user.session}</h5>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '108%',
                }}>
                <h6>{userProfile.posts.length} posts</h6>
                <h6>{userProfile.user.followers.length} followers</h6>
                <h6>{userProfile.user.following.length} following</h6>
              </div>

              {showfollow ? (
                <Button
                  style={{
                    margin: '10px',
                  }}
                  className='btn'
                  onClick={() => followUser()}>
                  Follow
                </Button>
              ) : (
                <Button
                  style={{
                    margin: '10px',
                  }}
                  className='btn'
                  onClick={() => unfollowUser()}>
                  UnFollow
                </Button>
              )}
            </div>
          </div>
          <hr style={{ margin: '0', padding: '0', backgroundColor: 'green' }} />
          <div className='home'>
            {userProfile.posts.map((item, index) => {
              let d = new Date(item.createdAt);
              let date = d.toLocaleString();
              return (
                <div className='card home-card' key={item._id}>
                  <div className='cardheader'>
                    <div>
                      <Image
                        src={item.postedBy.pic}
                        className='userImg'
                        roundedCircle
                      />
                    </div>
                    <div className='userName'>
                      <h4>
                        <Link
                          to={
                            item.postedBy._id !== state._id
                              ? '/profile/' + item.postedBy._id
                              : '/profile'
                          }>
                          {item.postedBy.name}
                        </Link>
                      </h4>
                    </div>
                    <div className='dateTime'>
                      <p>{date}</p>
                    </div>
                  </div>
                  <hr />
                  <div className='description'>
                    <p>{item.body}</p>
                  </div>
                  <div>
                    {item.photo ? (
                      <img
                        className='card-img'
                        src={item.photo}
                        alt='upload_missing'
                        style={{ height: '400px' }}
                      />
                    ) : (
                      ''
                    )}
                  </div>

                  <div style={{ padding: '3px' }}>
                    <h6 style={{ margin: '10px', display: 'inline' }}>
                      {item.likes.length} Likes
                    </h6>
                    <h6 style={{ margin: '70px', display: 'inline' }}>
                      {item.comments.length} Comments
                    </h6>
                  </div>
                  <hr style={{ margin: '0', padding: '0' }} />
                  <Accordion defaultActiveKey={index}>
                    <Card>
                      <Card.Header>
                        <div className='likeSection'>
                          {item.likes.includes(state._id) ? (
                            <i
                              className='material-icons'
                              style={{ color: 'blue' }}
                              onClick={() => {
                                unlike(item._id);
                              }}>
                              thumb_up
                            </i>
                          ) : (
                            <i
                              className='material-icons'
                              onClick={() => {
                                like(item._id);
                              }}>
                              thumb_up
                            </i>
                          )}
                        </div>
                        <Accordion.Toggle
                          as={Button}
                          variant='link'
                          className='comment'
                          eventKey={index + 1}>
                          Comment
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey={index + 1}>
                        <Card.Body>
                          <div id='example-collapse-text'>
                            <div>
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  makeComment(e.target[0].value, item._id);
                                  e.target[0].value = '';
                                }}>
                                <input
                                  type='text'
                                  placeholder='add a comment'
                                />
                              </form>
                              {item.comments.map((comment) => {
                                return (
                                  <h6 key={comment._id}>
                                    <span style={{ fontWeight: '500' }}>
                                      {comment.postedBy.name}:{' '}
                                    </span>{' '}
                                    {comment.text}
                                  </h6>
                                );
                              })}
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h2>loading...!</h2>
      )}
    </>
  );
};
export default UserProfile;
