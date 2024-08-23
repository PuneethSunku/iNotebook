import React from 'react'

function Alert(props) {
    const capitalize =(word)=>{ //to make first letter capital
      if(word==="danger"){word="Error"}
        const lower=word.toLowerCase();
        return lower.charAt(0).toUpperCase()+ lower.slice(1);// slice(1):It will take all the caharacters except the first character
    }
  return (
    <div style={{height: '50px'}}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
          <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
      </div>}
    </div>
  )
}

export default Alert

