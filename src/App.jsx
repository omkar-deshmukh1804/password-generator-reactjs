import { useCallback, useEffect, useState, useRef } from 'react'


function App() {
  const [length, setLength] = useState(6)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

    
  const passwordRef = useRef(null)
  const generatePassword = useCallback(() => {
    
    let pass = ""
    let passDictionary = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) passDictionary += "0123456789"
    if (charAllowed) passDictionary += "!@#$%^&*()_+"

    for (let index = 1; index <= length; index++) {
      let randomIndex = Math.floor(Math.random() * passDictionary.length)
      pass += passDictionary[randomIndex]
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed])
  
  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed])
  
  const copyPasswordToClipBoard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  return (
    
      <div className='w-full max-w-md mx-auto shadow-md 
      rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-white text-center my-3'>
          Password Generator
        </h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyPasswordToClipBoard}
          >copy</button>
        </div>
        <div
        className='flex text-sm gap-x-2'
        >
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
            name="" 
            id=""
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
        

        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          onChange={() => {
            setNumberAllowed((prev) => !prev)
          }}
          name=""
          id="" />
          <label htmlFor="number">Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
          name=""
          id="" />
          <label htmlFor="charInput">Character</label>
        </div>

      </div>
    </div>
    
  )
}

export default App
