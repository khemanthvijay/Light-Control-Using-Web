import Axios from 'axios';
import './App.css';
import React, { useState,useEffect } from 'react';
function App() {

  const [val1, setVal1] = useState(false);
  const [val2, setVal2] = useState(false);
  const [val3, setVal3] = useState(false);
  const [val4, setVal4] = useState(false);

const [ct1, setCt1] = useState('off');
const [ct2, setCt2] = useState('off');
const [ct3, setCt3] = useState('off');
const [ct4, setCt4] = useState('off');


useEffect(() => {
  Axios.get('http://65.49.44.136:6060/intial').then((res)=>{
    setVal1(res.data.light1);
    setVal2(res.data.light2);
    setVal3(res.data.light3);
    setVal4(res.data.light4);
    setCt1(res.data.ct1);
    setCt2(res.data.ct2);
    setCt3(res.data.ct3);
    setCt4(res.data.ct4);
  })
  subscribe();
  subsct();
  }, []);

const toggler1 = () => {
  if(val1 === 1)
    { 
      setVal1(0)
      putData1(0);
    }
    else{
      setVal1(1);
      putData1(1);
    }
  }
const toggler2 = () => {
   if(val2 === 1)
      { 
        setVal2(0)
        putData2(0);
      }
      else{
        setVal2(1);
        putData2(1);
      }
    }
const toggler3 = () => {
  if(val3 === 1)
   { 
      setVal3(0)
      putData3(0);
        }
        else{
          setVal3(1);
          putData3(1);
        }
      }
 const toggler4 = () => {
  if(val4 === 1)
  { 
    setVal4(0)
    putData4(0);
  }
  else{
    setVal4(1);
    putData4(1);
  }
}
async function subscribe() {
  try{
      let res = await Axios.get('http://65.49.44.136:6060/poll')
      setVal1(res.data.light1);
      setVal2(res.data.light2);
      setVal3(res.data.light3);
      setVal4(res.data.light4);
          } catch (err) {
          console.log('error :')
          console.log(err)
}
await subscribe();
}
const putData1=(s)=>{ 
  Axios.put('http://65.49.44.136:6060/update1',{data:s}).then(res=>{
}).catch(error=>{console.log(error);});
}
const putData2=(s)=>{ 
  Axios.put('http://65.49.44.136:6060/update2',{data:s}).then(res=>{
}).catch(error=>{console.log(error);});
}
const putData3=(s)=>{ 
  Axios.put('http://65.49.44.136:6060/update3',{data:s}).then(res=>{
}).catch(error=>{console.log(error);});
}
const putData4=(s)=>{ 
  Axios.put('http://65.49.44.136:6060/update4',{data:s}).then(res=>{
}).catch(error=>{console.log(error);});
}

async function subsct() {
  try{
      let response = await Axios.get('http://65.49.44.136:6060/poll2')
      if(response.data.ct1==='on'||response.data.ct1==="off")
        {
          setCt1(response.data.ct1)
          setCt2(response.data.ct2)
          setCt3(response.data.ct3)
          setCt4(response.data.ct4)
        }
      else if(response.data.ct){
        alert(response.data.ct)
      }
          } catch (err) {
          console.log('error :')
          console.log(err)
}
await subsct();
}
  return (
    <div className='ovel'>
    <br/>
    <br/>
    <br/>
    <br/>
<h1>SMART STREET LIGHT SYSTEM</h1>
<br/>
<br/>

  <div className='App'>

    <div className='row'>
      <h2 class="animate-charcter">Light Control</h2>
      <br/>
      <br/>
     <div className='sb'>
      <h3>Light 1</h3>
      <label className="switch" >
        <input type="checkbox" checked={val1} onClick={toggler1}></input>
        <span className="slider round"></span>
      </label>
      <p>CT Status 1 is {ct1}</p>
      </div> 
      <br/>
      <div className='sb'>
      <h3>Light 2</h3>
      <label className="switch" >
        <input type="checkbox" checked={val2} onClick={toggler2}></input>
        <span className="slider round"></span>
      </label>
      <p>CT Status 2 is {ct2}</p>

    </div>
    <br/>
    <div className='sb'>
      <h3>Light 3</h3>
      <label className="switch" >
        <input type="checkbox" checked={val3} onClick={toggler3}></input>
        <span className="slider round"></span>
      </label>
      <p>CT Status 3 is {ct3}</p>
      </div>
      <br/>
      <div className='sb'>
      <h3>Light 4</h3>
      <label className="switch" >
        <input type="checkbox" checked={val4} onClick={toggler4}></input>
        <span className="slider round"></span>
      </label>
      <p>CT Status 4 is {ct4}</p>

      </div>
    </div>
  </div>
  </div>
);
}

export default App