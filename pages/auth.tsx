import { useCallback, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import axios from 'axios'
import { signIn } from 'next-auth/react'

import Input from '~/components/Input'

import logo from '/public/images/logo.png'

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

const Auth = () => {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [variant, setVariant] = useState('login')

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

  const handleToggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    )
  }, [setVariant])

  const handleLogin = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/',
      })

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }, [email, password, router])

  const handleRegister = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password,
      })

      handleLogin()
    } catch (error) {
      console.log(error)
    }
  }, [email, name, password, handleLogin])

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
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  id="name"
                  type="text"
                  value={name}
                  label="Username"
                  onChange={handleNameChange}
                />
              )}
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
            <button
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              onClick={variant === 'login' ? handleLogin : handleRegister}
            >
              {variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            <div className="flex flex-row center gap-4 mt-8 justify-center">
              <div
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                onClick={() => signIn('google', { callbackUrl: '/' })}
              >
                <FcGoogle size={30} />
              </div>
              <div
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                onClick={() => signIn('github', { callbackUrl: '/' })}
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === 'login'
                ? 'First time using Netflix?'
                : 'Already have an account?'}
              <span
                className="text-white ml-1 hover:underline cursor-pointer"
                onClick={handleToggleVariant}
              >
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
