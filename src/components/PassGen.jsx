import React, { useState, useCallback , useEffect, useRef } from 'react'

function PassGen() {

   const [password, setPassword] = useState("");
   const [length, setlength] = useState(8);
   const [charAllowed, setcharAllowed] = useState(false);
   const [numAllowed, setnumAllowed] = useState(false);

   const passwordRef=useRef(null);

   const passwordGen= useCallback(()=>{
        let pass=""
        let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if(numAllowed) str+='0123456789'
        if(charAllowed) str+='!@#$%^&+/-*'
    
        for (let i = 0; i <length; i++) {
           const char=Math.floor(Math.random()*str.length)
           pass+=str.charAt(char);   
        }

    setPassword(pass);
   },
    [length,charAllowed,numAllowed,setPassword]);


    
    const copyPassword=useCallback(()=>{
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(password);
 },[password])
    
    useEffect(()=>{
   passwordGen()
    },[length,charAllowed,numAllowed,passwordGen])
   

  return (
   <div className='bg-black w-full h-screen flex justify-center '>
    <div className="bg-gray-400 h-44 w-96 mt-32 px-4 py-2">
        <input type='text' 
        placeholder='Password' 
        value={password} 
        className='w-72 h-8 rounded-lg' 
        ref={passwordRef} readOnly/>  \

        <button className='bg-slate-900 text-white px-3 py-1 rounded-lg' onClick={copyPassword}> Copy</button>
        
    <input type='range' min='8' max='60' value={length} onChange={(e)=>{setlength(e.target.value)}}/>
    <label for='length'>Label:{length}</label>
{/* checkbox */}
   <input type='checkbox' id='num' checked={numAllowed} onChange={()=>{setnumAllowed(prev=> !prev)}} />
   <label htmlFor='num'>Number</label>
   <input type='checkbox' id='char' checked={charAllowed} onChange={()=>{setcharAllowed(prev=>!prev)}}/>
   <label htmlFor='char'>Character</label>

   </div>
   </div>
  )
}

export default PassGen