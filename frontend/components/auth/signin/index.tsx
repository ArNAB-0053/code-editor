"use client"
import LeftSide from './left-side'
import RightSide from './right-side'

const SignIn = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <LeftSide/>
      <RightSide/>      
    </div>
  )
}

export default SignIn