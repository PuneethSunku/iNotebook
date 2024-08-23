import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext';

// const About = () => {
//   const a = useContext(noteContext)
//   useEffect( ()=>{
//     a.update();
//     //eslint-disable-next-line
//   } , []) //Empty array is given to run only once
//   return (
//     <div>
//       This is About {a.state.name} and he is in class {a.state.class}
//     </div>
//   )
// }

const About = () => {
  return (
    <div>
      This is About Page
    </div>
  )
}

export default About
