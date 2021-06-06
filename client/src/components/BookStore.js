import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const BookStore = () => {
  const { dept } = useParams();
  //console.log(dept)

  const [allbook, setAllbook] = useState([]);

  const sortData = allbook.map((item, index) => {
    return allbook[allbook.length - 1 - index];
  });

  //    { const book=allbook.map((item)=>{
  //         const match=item.department;
  //         console.log(match)
  //         console.log(item)

  //         if(match===dept){
  //             console.log("CSE")
  //             return item;
  //         }
  //     })

  //     }

  useEffect(() => {
    fetch(`/showbook/${dept}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllbook(data);
        //console.log(data)
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <Container fluid>
        <Row className="createdClass">
          {sortData.map((item) => {
            return (
              <Col md={4} lg={3} key={item._id}>
                <Card className="bookCard">
                  <div className="classRoomHeader">
                    <div className="bookPic">
                      <Image src={item.bookLink} width="100%" height="200px" />
                    </div>
                  </div>

                  <div className="bookDetails">
                    <h6>
                      Book name:<strong>{item.bookName}</strong>
                    </h6>
                    <p>
                      Author: <strong>{item.authorName}</strong>
                    </p>
                    <p>Publisher: {item.publisher}</p>
                    <p>Edition: {item.edition}</p>
                    <Button block><a href="https://www.just.edu.jo/~mqais/CIS99/PDF/Ch.01_Introduction_%20to_computers.pdf" style={{color:"white"}}>View</a></Button>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default BookStore;
