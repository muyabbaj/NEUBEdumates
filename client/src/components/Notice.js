import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

const Notice = () => {
    const [notice,setNotice]=useState([])
    const sortData = notice.map((item, index) => {
        return notice[notice.length - 1 - index];
      });
    useEffect(() => {
        fetch("/shownotice", {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt"),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setNotice(data);
            console.log(data)
            //setData(previousData=>[...previousData,data.posts])
            //setNotice.push(data)
          })
          .catch((e) => console.log(e));
      }, []);
    return (
        <div>
            <Card style={{margin:"4%",padding:"0"}}>        
                <Container fluid>
                <Row id="noticeHeading">      
                        <Col sm={2}>
                               <div >
                                   Date
                                </div>                   
                        </Col>
                        <Col sm={10}>
                            <div>
                                Title
                            </div>
                        </Col>
                    </Row>
                    
                        
                        {
                        sortData.map((item,index)=>{
                            let d=new Date(item.createdAt);
                            let date=d.toLocaleString();
                            return(
                                <Row className="noticeRow">
                                 <Col sm={2}>{date}</Col>
                                 <Col sm={10}>
                                     <a href={item.photo}>{item.title}</a>
                                 </Col>
                                                                 
                            </Row>
                            )
                        })
                        }
                        
                     
                    <Row className="noticeRow">      
                        <Col sm={2}>
                               <div >
                               05-02-2021
                                </div>                   
                        </Col>
                        <Col sm={10}>
                            <div>
                            <a href="https://drive.google.com/file/d/1r4LyoBbHyVPmUL3imj9dOXuch2nfUrgT/view?usp=sharing">Fall Class Routine</a>
                            </div>
                        </Col>
                    </Row>
                    <Row className="noticeRow">      
                        <Col sm={2}>
                               <div >
                               10-01-2021
                                </div>                   
                        </Col>
                        <Col sm={10}>
                            <div>
                            <a href="https://drive.google.com/file/d/1r4LyoBbHyVPmUL3imj9dOXuch2nfUrgT/view?usp=sharing">Fall Class Routine</a>
                            </div>
                        </Col>
                    </Row>                    <Row className="noticeRow">      
                        <Col sm={2}>
                               <div >
                               19-01-2021
                                </div>                   
                        </Col>
                        <Col sm={10}>
                            <div>
                            <a href="https://drive.google.com/file/d/1r4LyoBbHyVPmUL3imj9dOXuch2nfUrgT/view?usp=sharing">Fall Class Routine</a>
                            </div>
                        </Col>
                    </Row>                    <Row className="noticeRow">      
                        <Col sm={2}>
                               <div >
                               15-02-2021
                                </div>                   
                        </Col>
                        <Col sm={10}>
                            <div>
                            <a href="https://drive.google.com/file/d/1r4LyoBbHyVPmUL3imj9dOXuch2nfUrgT/view?usp=sharing">Fall Class Routine</a>
                            </div>
                        </Col>
                    </Row>                    <Row className="noticeRow">      
                        <Col sm={2}>
                               <div >
                            25-01-2021
                                </div>                   
                        </Col>
                        <Col sm={10}>
                            <div>
                            <a href="https://drive.google.com/file/d/1r4LyoBbHyVPmUL3imj9dOXuch2nfUrgT/view?usp=sharing">Fall Class Routine</a>
                            </div>
                        </Col>
                    </Row>                    <Row className="noticeRow">      
                        <Col sm={2}>
                               <div >
                               15-12-2020
                                </div>                   
                        </Col>
                        <Col sm={10}>
                            <div>
                            <a href="https://drive.google.com/file/d/1r4LyoBbHyVPmUL3imj9dOXuch2nfUrgT/view?usp=sharing">Fall Class Routine</a>
                            </div>
                        </Col>
                    </Row>

                    <Row className="noticeRow">      
                        <Col sm={2}>
                               <div >
                               23-12-2020
                                </div>                   
                        </Col>
                        <Col sm={10}>
                            <div>
                            <a href="https://drive.google.com/file/d/1r4LyoBbHyVPmUL3imj9dOXuch2nfUrgT/view?usp=sharing">Fall Class Routine</a>
                            </div>
                        </Col>
                    </Row>

                    
                </Container>          
            </Card>      
        </div>
    )
}

export default Notice