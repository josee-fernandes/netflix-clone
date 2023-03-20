import { useCallback, useState } from 'react'

import Image from 'next/image'

import Input from '@/components/Input'

import logo from '/public/images/logo.png'

const Auth = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value !== name) setName(event.target.value)
    },
    [name, setName]
  )

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value !== email) setEmail(event.target.value)
    },
    [email, setEmail]
  )

  const handlePasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value !== password) setPassword(event.target.value)
    },
    [password, setPassword]
  )

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image
            src={logo}
            alt="Netflix Logo"
            className="object-contain h-12 w-auto"
          />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">Sign in</h2>
            <div className="flex flex-col gap-4">
              <Input
                id="name"
                type="text"
                value={name}
                label="Username"
                onChange={handleNameChange}
              />
              <Input
                id="email"
                type="email"
                value={email}
                label="Email"
                onChange={handleEmailChange}
              />
              <Input
                id="password"
                type="password"
                value={password}
                label="Password"
                onChange={handlePasswordChange}
              />
            </div>
            <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              Login
            </button>
            <p className="text-neutral-500 mt-12">
              First time using Netflix?
              <span className="text-white ml-1 hover:underline cursor-pointer">
                Create an account
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
