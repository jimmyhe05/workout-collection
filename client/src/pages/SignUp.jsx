import React from 'react'
import { IoIosFitness } from 'react-icons/io'
import { Label, TextInput, Button } from 'flowbite-react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left side */}
        <div className='flex-1'>
          <Link
            to="/"
            className="flex items-center whitespace-nowrap text-md font-bold dark:text-white text-4xl"
            aria-label="My Workout Collection Homepage"
          >
            <span className="px-2 py-1 md:hidden bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 rounded-lg text-white">
              <IoIosFitness className="w-8 h-8" />
            </span>
            <span className="hidden md:inline px-2 py-1 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 rounded-lg text-white">
              Jimmy's Workout
            </span>
            Collection
          </Link>
          <p className="text-sm mt-5">
            <b>Welcome to My Workout Collection</b>
            <br />
            Here, I share my personal workout routines along with recommended videos and content from various fitness influencers. Whether you're looking for guidance or inspiration, My Workout Collection helps you stay motivated and track your progress effortlessly.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1 flex-col gap-3">
          <form className="flex flex-col gap-2">
            <div className="">
              <Label value="EMAIL" />
              <TextInput type="text" placeholder='' id="email"></TextInput>
            </div>
            <div className="">
              <Label value="USERNAME" />
              <TextInput type="text" placeholder='' id="username"></TextInput>
            </div>
            <div className="mb-2">
              <Label value="PASSWORD" />
              <TextInput type="text" placeholder='' id="password"></TextInput>
            </div>
            <Button gradientDuoTone="pinkToOrange" type="submit">
              Join My Workout
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to="/sign-in" className='text-blue-500'>Sign In</Link>
          </div>
        </div>
      </div>
    </div >
  )
}
