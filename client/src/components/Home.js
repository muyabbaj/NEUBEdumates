import React, { useContext, useEffect, useState } from "react";
import { Accordion, Button, Card, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  const sortData = data.map((item, index) => {
    return data[data.length - 1 - index];
  });

  useEffect(() => {
    fetch("/allpost", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.posts);
        // console.log(data)
        //setData(previousData=>[...previousData,data.posts])
        //setData.push(data.posts)
      })
      .catch((e) => console.log(e));
  }, []);
  const like = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((e) => console.log(e));
  };
  const unlike = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((e) => console.log(e));
  };
  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text,
        postId,
      }),
    })
      .then((res) => res.json())
      .then((comment) => {
        console.log(comment);
        const newData = data.map((item) => {
          if (item._id === comment._id) {
            return comment;
          }
          return item;
        });
        setData(newData);
      });
  };

  //Result
  const [result,setResult]=useState([])
  const sortResult = result.map((item, index) => {
      return result[result.length - 1 - index];
    });
  useEffect(() => {
      fetch("/showresult", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setResult(data);
          console.log(data)
          //setData(previousData=>[...previousData,data.posts])
          //setNotice.push(data)
        })
        .catch((e) => console.log(e));
    }, []);

    
  //Routine
  const [routine,setRoutine]=useState([])
  const sortRoutine = routine.map((item, index) => {
      return routine[routine.length - 1 - index];
    });
  useEffect(() => {
      fetch("/showroutine", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setRoutine(data);
          console.log(data)
          //setData(previousData=>[...previousData,data.posts])
          //setNotice.push(data)
        })
        .catch((e) => console.log(e));
    }, []);

    const deletePost = (postid)=>{
      fetch(`/deletepost/${postid}`,{
          method:"delete",
          headers:{
              Authorization:"Bearer "+localStorage.getItem("jwt")
          }
      }).then(res=>res.json())
      .then(result=>{
          console.log(result)
          const newData = data.filter(item=>{
              return item._id !== result._id
          })
          setData(newData)
      })
  }
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={3}>
            <div className="leftSide">
              <ListGroup as="ul">
                <ListGroup.Item as="li">All Department</ListGroup.Item>
                <ListGroup.Item as="li">
                  <Link to="/noticeboard">Academic Notice</Link>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  <Link to="/elibrary">E-Library</Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="list">
                  <Accordion defaultActiveKey="1">
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="0"
                        >
                          Class Routine
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body className="routine">
                        <ul>
                            {
                              sortRoutine.map((item,index)=>{
                                return(
                                  <li>
                                  <a href={item.photo} className="link" style={{color:"white"}}>{item.title}</a>
                                  
                                </li>
                                )
                              })
                            }
                              <li>
                                  <a href="https://www.dropbox.com/s/rjqvd5z67w2urhd/CSERoutineSpring2021_OnlineRoutine.pdf?dl=1" className="link" style={{color:"white"}}>CSE Routine Spring Online Routine</a>
                                  
                                </li>
                          </ul>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  <Link to="/questionbank">Question Bank</Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="list">
                  <Accordion defaultActiveKey="1">
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="0"
                        >
                          Result
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body className="routine">
                          <ul>
                            {
                              sortResult.map((item,index)=>{
                                return(
                                  <li>
                                  <a href={item.photo} className="link" style={{color:"white"}}>{item.title}</a>
                                  
                                </li>
                                )
                              })
                            }
                            <li>
                                  <a href="https://www.neub.edu.bd/attachments/article/711/BSc_Engg_CSE_Result_Fall-2020.pdf" className="link" style={{color:"white"}}>
                                  BSc Engg. CSE Result Fall-2020
                                  </a>
                                  
                                </li>
                          </ul>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  <Link to="/cgpacalculator">CGPA Calculator</Link>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
          <Col md={6}>
            <Scrollbars
              style={{ width: "100%", height: "100vh" }}
              thumbMinSize={3}
            >
              <div className="home">
                <main>
                  {sortData.map((item, index) => {
                    let d=new Date(item.createdAt);
                    let date=d.toLocaleString();
                    return (
                      <div className="card home-card" key={item._id}>
                        <div className="cardheader">
                          <div>
                          
                            <Image
                              src={item.postedBy.pic}
                              className="userImg"
                              roundedCircle
                            />
                          </div>

                          <div className="userName">
                          <h4><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }>{item.postedBy.name}</Link> 
                             
                             <span style={{margin:"3px",color:"blue"}}> {item.postedBy._id == state._id 
                             && <i className="material-icons" style={{
                                 float:"right",marginTop:"5px"
                             }} 
                             onClick={()=>deletePost(item._id)}
                             >delete</i>
                             }</span> 
                             </h4>
                          </div>
                          <div className="dateTime">
                            <p>{date}</p>
                          </div>
                        </div>
                        <hr />
                        <div className="description">
                          <p>{item.body}</p>
                        </div>
                        <div>
                          {item.photo ? (
                            <img
                              className="card-img"
                              src={item.photo}
                              alt="upload_missing"
                              style={{ height: "400px" }}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        <div style={{ padding: "3px" }}>
                          <h6 style={{ margin: "10px", display: "inline" }}>
                            {item.likes.length} Likes
                          </h6>
                          <h6 style={{ margin: "70px", display: "inline" }}>
                            {item.comments.length} Comments
                          </h6>
                        </div>
                        <hr style={{ margin: "0", padding: "0" }} />
                        <Accordion defaultActiveKey={index}>
                          <Card>
                            <Card.Header>
                              <div className="likeSection">
                                {item.likes.includes(state._id) ? (
                                  <i
                                    className="material-icons"
                                    style={{ color: "blue" }}
                                    onClick={() => {
                                      unlike(item._id);
                                    }}
                                  >
                                    thumb_up
                                  </i>
                                ) : (
                                  <i
                                    className="material-icons"
                                    onClick={() => {
                                      like(item._id);
                                    }}
                                  >
                                    thumb_up
                                  </i>
                                )}
                              </div>
                              <Accordion.Toggle
                                as={Button}
                                variant="link"
                                className="comment"
                                eventKey={index + 1}
                              >
                                Comment
                              </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={index + 1}>
                              <Card.Body>
                                <div id="example-collapse-text">
                                  <div>
                                    <form
                                      onSubmit={(e) => {
                                        e.preventDefault();
                                        makeComment(
                                          e.target[0].value,
                                          item._id
                                        );
                                        e.target[0].value = "";
                                      }}
                                    >
                                      <input
                                        type="text"
                                        placeholder="add a comment"
                                      />
                                    </form>
                                    {item.comments.map((comment) => {
                                      return (
                                        <h6 key={comment._id}>
                                          <span style={{ fontWeight: "500" }}>
                                            {comment.postedBy.name}:{" "}
                                          </span>{" "}
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
                </main>
              </div>
            </Scrollbars>
          </Col>
          <Col md={3}>
            <div className="leftSide">
              <ListGroup as="ul">
                <ListGroup.Item as="li">Class Update</ListGroup.Item>
                <ListGroup.Item as="li">
                  <Link to="/class/CSE">CSE</Link>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  <Link to="/class/BBA">BBA</Link>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  <Link to="/class/English">English</Link>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  <Link to="/class/Law">LAW</Link>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
