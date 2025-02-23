const Part = ({ part }) => {
  return (
    <li>
      <ul>{part.name} {part.exercises}</ul>
    </li>
  )
}
const Header = ({ course }) => {    
    return (
        <h2>{course.name}</h2>
    )
}

const Total = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>Total exercises: {totalExercises}</p>
  )
}
const Courses = ({ courses }) => {
return (
    <div>
        {courses.map((course) => (
            <div key={course.id}>
                <Header course={course} />
                <ul>
                    {course.parts.map((part) => (
                        <Part key={part.id} part={part} />
                    ))}
                </ul>
                <Total course={course} />
            </div>
        ))}
    </div>
)
}

export default Courses