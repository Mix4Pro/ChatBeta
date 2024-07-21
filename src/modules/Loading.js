import React from 'react'
import {HashLoader} from 'react-spinners'
import "./Loading.css"


export default function Loading() {
  return (
    <div id="loading">
        <HashLoader color='#fff' />
    </div>
  )
}
