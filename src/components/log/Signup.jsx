import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import './login.css';
import { Link } from 'react-router-dom';


const Signup =(props)=> {
  const navigate = useNavigate()
  const [data, setData] = useState({email:"",password:"", confirmPassword:""}) 
  const [confirmPassword, setCofirmPassword] = useState("")
  const [valid, setValid] = useState(false)
  const [message, setMessage] = useState({status:"", message:""})
//   useEffect(()=>{
//     const getUserDetails = JSON.parse(localStorage.getItem("token"))
// if(getUserDetails){
//     navigate("/main")
// } 
// },[])
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(confirmPassword=== data.password){
        if(data.password.length < 6){
            setMessage({status:"Note!",message:"Password length should be minimum 6 charecters and above "})
            setValid(true)
        }
        else{
            axios.post('http://localhost:4040/register', data)
            .then(result=>{
               navigate('/')
            }).catch((e)=>{
                setMessage(e?.response?.data)
                setValid(true)
            }) 
        } 
    }else{
        setMessage({status:"Note!",message:"Password and Confirm Password doesn't matched"})
        setValid(true)
    }

}
    return (
        <React.Fragment>
        <main className='main-cont'>
            <section className='form-container col-lg-10'>

          
                    <div className="row d-flex align-items-center justify-content-center ">
                        <div className="col-8  d-flex align-items-center justify-content-center" style={{ "text-align": "center" }}>
                            <div className="row">

                                <div className="col">
                                    <div className="row">
                                        <h1 className='logo'>Logo</h1>
                                        <p>Create A New Account </p>
                                        <div className="row d-flex justify-content-around align-items-center h-100">
                                            <div className="col-lg-10">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="col-sm-12 inputBox">
                                                    <input className='form-control m-2 px-5' type='email' name="email" placeholder='User Id' required onChange={(e) => setData({ ...data, email: e.target.value })} />
                                                   
                                                    </div>
                                                    <div className="col-sm-12 inputBox">
                                                    <input className='form-control m-2 px-5' type="password" name='password' placeholder='Password' required onChange={(e) => setData({ ...data, password: e.target.value })} />
                                                  
                                                    </div>
                                                    <div className="col-sm-12 inputBox">
                                                    <input className='form-control m-2 px-5' type="password" name='confirmPassword' placeholder='Confirm Password' required onChange={(e) => setCofirmPassword(e.target.value)} />
                                                  
                                                    </div>
                                                    <button className='signin m-2 p-1 rounded-2'>Sign Up</button>
                                                    <Link to={'/'}><button className='signUp m-2 p-1 rounded-2'>Sign In</button></Link>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                
            </section>
            <Validation trigger={valid}>
                <div className='card-message'>
                    <h3>{message.status}</h3>
                    <p>{message.message}</p>
                    <button onClick={()=>setValid(false)}>ok</button> 
                </div>
                
            </Validation>
        </main>
    </React.Fragment>
    );
}

export default Signup;

const Validation=(props)=>{
    return(props.trigger)?(
        <div className='popupCard'>
            {props.children}
        </div>
    ):""
}
