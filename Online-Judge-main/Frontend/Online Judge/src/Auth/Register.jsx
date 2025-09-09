import React, { useState, useRef, useEffect } from 'react'
// import Button from './Components/Button'
import { uploadDataRegister } from '../api'
import { Link, useNavigate } from 'react-router-dom'
import '../Components/Problems/ProblemDetails/style.css'
import useAuth from '../Hooks/useAuth';



function Auth() {

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [errorMsgFirstName, setErrorMsgFirstName] = useState('')
    const [errorMsgLastName, setErrorMsgLastName] = useState('')
    const [errorMsgEmail, setErrorMsgEmail] = useState('')
    const [errorMsgPass, setErrorMsgPass] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('');
    const [confirmPasswordMessage, setconfirmPasswordMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [eyeIcon, setEyeIcon] = useState('/hide.png'); // Initial image path
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [eyeIconForConfirmPassword, setEyeIconForConfirmPassword] = useState('/hide.png'); // Initial image path
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('')
    // const [clickButton,setclickButton]=useState(0)
    const [isRegistered, setIsRegistered] = useState(false);
    const {user,setUser} = useAuth()
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();
        if (firstNameRef.current.value == "") {
            setErrorMsgFirstName("This field is required")
        }
        if (lastNameRef.current.value == "") {
            setErrorMsgLastName("This field is required")
        }
        if (emailRef.current.value == "") {
            setErrorMsgEmail("This field is required")
        }
        if (passwordRef.current.value == "") {
            setErrorMsgPass("This field is required")
        }
        const Data = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        uploadDataRegister(Data).then(newResponse => {
            if (!newResponse.data.success) {
                if (newResponse.data === "User already exists") {
                    setErrorMsgEmail(newResponse.data)
                }

                if (newResponse.data.message === "Format is incorrect") {
                    setErrorMsgEmail(newResponse.data.message)
                }

            }
            else {
                setUser({ email: newResponse.data.newUser.email, id: newResponse.data.newUser._id, roles: newResponse.data.roles })
                Popup('Registered Successfully')
                setTimeout(() => {
                    navigate('/')
                }, 2000)

            }
        }).catch(error => {
            Popup("No Server Response")
        })

    };

    useEffect(() => {
        const externalElement = document.querySelector('#root');
        document.body.style.display = 'flex';
        document.body.style.alignItems = 'center';
        externalElement.style.margin = 'auto'
        externalElement.style.textAlign = 'center'

        return () => {
            document.body.style.display = '';
            document.body.style.alignItems = '';
            externalElement.style.margin = ''
            externalElement.style.textAlign = ''
            window.scrollTo(0, 0); // Scroll to top
        }

    }, [])

    const togglePasswordVisibility = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword);
        if (showPassword) {
            setEyeIcon('/hide.png'); // Image when password is hidden
        } else {
            setEyeIcon('/show.png'); // Image when password is shown
        }
    };

    const toggleConfirmPasswordVisibility = (e) => {
        e.preventDefault()
        setShowConfirmPassword(!showConfirmPassword);
        if (showConfirmPassword) {
            setEyeIconForConfirmPassword('/hide.png'); // Image when password is hidden
        } else {
            setEyeIconForConfirmPassword('/show.png'); // Image when password is shown
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        // Check password criteria
        if ((!value.length) || (value.length >= 10 && /[0-9]/.test(value) && /[A-Z]/.test(value) && /[a-z]/.test(value) && /[!@#$%^&*(),.?":{}|<>]/.test(value))) {
            setPasswordMessage(''); // Clear message if all criteria are met
        } else {
            setPasswordMessage('Must be 10 characters or more, needs at least one number, one UpperCase letter, one LowerCase letter and one special character');
        }
        if (value === confirmPasswordRef.current.value) {
            setconfirmPasswordMessage('')
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        if (value !== passwordRef.current.value) {
            setconfirmPasswordMessage('Password do not match')
        }
        else {
            setconfirmPasswordMessage('')
        }
    }

    const isButtonDisabled = errorMsgEmail || errorMsgFirstName || errorMsgLastName || errorMsgPass || passwordMessage

    const Popup = (value) => {
        setPopupMessage(value);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000); // Hide after 2 seconds
    }

    const PopupMessage = ({ message, show }) => {
        return (
            <div className={`popup ${show ? 'show' : ''}`}>
                <p>{message}</p>
            </div>
        );
    };

    return (
        <div className="flex items-center justify-center m-0 p-0 max-h-screen " >
            <div className="h-auto w-[480px] border-black-5 shadow-xl  bg-slate-50 p-8 overflow-hidden">
                <div className=' text-black font-semibold m-2 text-lg'>Online Judge</div>

                <form onSubmit={handleSubmit} className='flex-col items-center'>
                    <div className='mx-4 flex-row flex-nowrap items-center justify-center'>
                        <label htmlFor="firstName" ></label>
                        <input type="text" ref={firstNameRef} name="firstName" id="firstName" placeholder='First Name'
                            className=" outline-none border-[1px] border-slate-200 rounded-md m-4 mt-5 p-2" style={{ width: '300px' }}
                            onFocus={() => setErrorMsgFirstName('')} />
                    </div>
                    <p className='text-red-700 relative right-[6.4rem] bottom-3' style={{ fontSize: '10px' }}>{errorMsgFirstName}</p>


                    <div>
                        <label htmlFor="lastName"></label>
                        <input type="text" ref={lastNameRef} name="lastName" id="lastName" placeholder='Last Name'
                            className=" outline-none border-[1px] border-slate-200 rounded-md m-4 p-2" style={{ width: '300px' }}
                            onFocus={() => setErrorMsgLastName('')} />
                    </div>
                    <p className='text-red-700 relative right-[6.4rem] bottom-3' style={{ fontSize: '10px' }}>{errorMsgLastName}</p>


                    <div>
                        <label htmlFor="email"></label>
                        <input type="text" ref={emailRef} name="email" id="email" placeholder='Email'
                            className=" outline-none border-[1px] border-slate-200 rounded-md m-4 p-2" style={{ width: '300px' }}
                            onFocus={() => setErrorMsgEmail('')} />
                    </div>
                    <p className='text-red-700 relative right-[6.4rem] bottom-3' style={{ fontSize: '10px' }}>{errorMsgEmail}</p>


                    <div>
                        <label htmlFor="password"></label>
                        <input type={showPassword ? "text" : "password"} ref={passwordRef} name="password" id="password" placeholder='Password'
                            className=" outline-none border-[1px] border-slate-200 rounded-md m-4  p-2 relative left-7" style={{ width: '300px' }}
                            onFocus={() => setErrorMsgPass('')} onChange={handlePasswordChange} />

                        <button className='inline relative top-1 outline-none border-none focus:outline-none focus:border-none
                m-0 right-12 bg-white' onClick={togglePasswordVisibility}><img src={eyeIcon} alt="Icon" className=' m-0 w-5 h-5 p-0 bg-white' /></button>

                        {/* <p className='text-red-700 mb-20 relative left-12 break-normal max-w-[300px]' style={{fontSize:'10px'}}>{passwordMessage}</p>
                <p className='text-red-700 relative right-20 bottom-[5.7rem] mb-20'>{errorMsgPass}</p> */}
                        {passwordMessage && (
                            <p className='text-red-700 mb-5 relative left-12 break-normal max-w-[300px]' style={{ fontSize: '10px' }}>
                                {passwordMessage}
                            </p>
                        )}

                        {errorMsgPass && (
                            <p className='text-red-700 relative right-[6.4rem] bottom-[0.9rem] mb-1.5' style={{ fontSize: '10px' }}>
                                {errorMsgPass}
                            </p>
                        )}

                    </div>

                    <div>
                        <label htmlFor="Confirmpassword"></label>
                        <input type={showConfirmPassword ? "text" : "password"} ref={confirmPasswordRef} name="Confirmpassword" id="Confirmpassword" placeholder='Confirm Password'
                            className=" outline-none border-[1px] border-slate-200 rounded-md m-4  p-2 relative left-7" style={{ width: '300px' }}
                            onFocus={() => setErrorMsgPass('')} onChange={handleConfirmPasswordChange} />

                        <button className='inline relative top-1 outline-none border-none focus:outline-none focus:border-none
                m-0 right-12 bg-white' onClick={toggleConfirmPasswordVisibility}><img src={eyeIconForConfirmPassword} alt="Icon" className=' m-0 w-5 h-5 p-0 bg-white' /></button>

                        {confirmPasswordMessage && (
                            <p className='text-red-700 mb-5 relative float-left left-[3.4rem] break-normal max-w-[300px]' style={{ fontSize: '10px' }}>
                                {confirmPasswordMessage}
                            </p>
                        )}

                        {errorMsgPass && (
                            <p className='text-red-700 relative right-[6.4rem] bottom-[0.9rem] mb-5' style={{ fontSize: '10px' }}>
                                {errorMsgPass}
                            </p>
                        )}

                    </div>


                    <div>
                        <button type='submit' className={`border-2 rounded-md text-black font-medium text-center mb-2 bg-blue-400 hover:bg-blue-500 transition-colors duration-300 ease-in-out outline-none  w-full`}
                            disabled={isButtonDisabled}>Register</button>
                    </div>


                    <div>
                        <p>Already a user? <Link to="/login" className="text-black hover:text-black">Sign in</Link></p>
                    </div>

                </form>

            </div>
            {showPopup && <PopupMessage message={popupMessage} show={showPopup} />}
        </div>
    )
}

export default Auth