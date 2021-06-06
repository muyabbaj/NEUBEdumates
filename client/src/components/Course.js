import React from 'react';

class Course extends React.Component {
    handleGradeChange(event){
        this.props.handleChange(this.props.index,{grade:Number(event.target.value)})
    }
    handleCreditChange(event){
        this.props.handleChange(this.props.index,{grade:Number(event.target.value)})
    }
    render(){
    return (
        <div>
            <div className="cgpaCalculator">
                <div className="mainPartOfCalculator">
                    <select className="courseName" >
                        <option selected disabled hidden>Select Course</option>
                        <option>Fundamentals of Computer</option>
                        <option>Calculus</option>
                        <option>Fundamentals of English</option>
                        <option >Basic Electronics</option>
                        <option>Basic Electronics Lab</option>
                        <option>Fundamentals of Computer</option>
                        <option>Fundamentals of Computer</option>
                        <option>Fundamentals of Computer</option>
                        <option >Fundamentals of Computer</option>
                        <option >Discrete Mathemathics</option>
                        <option>Neural Network And Fuzzy</option>
                    
                    </select>
            
                    <select className="courseGrade" onChange={this.handleCreditChange.bind(this)}>
                        <option selected disabled hidden>Credite</option>
                        <option value="1"> 1.5 </option>
                        <option value="2"> 2 </option>
                        <option value="3" > 3</option>
                        <option value="4"> 4</option>
                    </select>

                    <select className="grade" onChange={this.handleGradeChange.bind(this)}>
                        <option selected disabled hidden>Grade</option>
                        <option value="4"> A+ </option>
                        <option value="3.75"> A </option>
                        <option value="3.5"> A- </option>
                        <option value="3.25"> B+ </option>
                        <option value="3"> B </option>
                        <option value="2.75"> B- </option>
                        <option value="2.5"> C+ </option>
                        <option value="2.25"> C </option>
                        <option value="2"> D </option>
                        <option value="0"> F </option>
                    </select>
                </div>
                
                <div>
                    {/* <div className="addCourse"><i className="material-icons addIcon">add</i></div> */}
                    {/* <div className="cgpaResult">CGPA: <strong>3.82</strong></div> */}
                </div>
            </div>
        </div>
    )
    }
}

export default Course
