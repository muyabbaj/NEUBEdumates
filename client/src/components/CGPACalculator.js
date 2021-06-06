import React from "react";
import Course from "./Course";
class CGPACalculator extends React.Component {
  constructor() {
    super();
    this.state = {
      course: [
        { credit: 3.0, grade: 4.0 },
        { credit: 1.5, grade: 4.0 }
      ],
    };
  }
  handleChange(i, change) {
    const course = this.state.course.slice();
    course[i] = { ...course[i], ...change };
    this.setState({
      course: course,
    });
  }
  addCourse() {
    this.setState({
      course: [...this.state.course, { credit: 0.0, grade: 0.0 }],
    });
  }
  render() {
    let totalCredit = 0,
      totalGrade = 0;
    const course = this.state.course.map((course, i) => {
      totalCredit += course.credit;
      totalGrade += course.grade * course.credit;
      return <Course index={i} handleChange={this.handleChange.bind(this)} />;
    });
    return (
      <div className="cgpaCalculator">
        <h2>CGPA Calculator</h2>
        <p>Select, course, credits, and grade to calculate GPA.</p>
        <p>Click '+' to add more courses.</p>
        {course}
        <div>
          <div className="addCourse">
            <i
              className="material-icons addIcon"
              onClick={this.addCourse.bind(this)}
            >
              add
            </i>
          </div>
          <div className="cgpaResult">
            CGPA: <strong>{(totalGrade / totalCredit).toFixed(2)}</strong>
          </div>
        </div>
      </div>
    );
  }
}

export default CGPACalculator;
