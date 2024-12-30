import React from 'react'
import { IoIosFitness } from 'react-icons/io'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto">
        {/* left side */}
        <div>
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

      </div>
    </div >
  )
}
