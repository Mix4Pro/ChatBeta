import React from 'react'
import {HashLoader} from 'react-spinners'
import "./Loading.css"


export default function Loading(props) {
  return (
    <div id="loading">
        <HashLoader color={props.color} />
        {console.log(props)}
    </div>
  )
}
