import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { AuthContext } from '../../../Context/AuthContext';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxios from '../../../Hook/useAxios';

const Register = () => {
  const {register,handleSubmit}=useForm();
  const {createUser,updateProfilePic}=useContext(AuthContext);
  const [profilePic,setProfilePic]=useState('');
  const axiosInstance=useAxios();

const onSubmit = data =>{
  createUser(data.email,data.password)
  .then(async(result)=>{
    console.log('user registered successfully');
    console.log(result.user);

    // update profile in database
    const userInfo = {
      email:data.email,
      role:'participent',
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString()
    } ;

    const userRes = await axiosInstance.post('/users',userInfo);
    console.log(userRes.data);



//  update profile in firebase
const updateProfileInfo = {
  displayName:data.name,
  photoURL:profilePic
}

updateProfilePic(updateProfileInfo)
.then(()=>{
  console.log('Profile updated');
})
.catch((error)=>{
  console.log(error);
})
  })
};


// image upload
const handleImageUpload = async(e) =>{
  const image = e.target.files[0];
  const formData = new FormData();
  formData.append('image',image);
  const imageUploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`

  const res=await axios.post(imageUploadURL,formData);
  setProfilePic(res.data.data.url);
  console.log(res.data.data.url);


}

    return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h2 className='text-3xl mt-4 text-secondary text-center font-bold'>Register Now</h2>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
           
            {/* name */}
          <label className="label">Name</label>
          <input type="text" {...register('name',{required:true})}
           className="input w-full" placeholder="Name" />
          
            {/* photo URL */}
          <label className="label">Photo</label>
          <input type="file" onChange={handleImageUpload}
           className="input w-full" placeholder="Photo URL" />
          
            {/* email */}
          <label className="label">Email</label>
          <input type="email" {...register('email',{required:true})}
           className="input w-full" placeholder="Email" />

        {/* passward */}
          <label className="label">Password</label>
          <input type="password" {...register('password',{required:true,minLength:6})}
           className="input w-full" placeholder="Password" />
       
        {/* phone */}
          <label className="label">Phone</label>
          <input type="number" {...register('phone',{required:true})}
           className="input w-full" placeholder="Phone" />


         <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-primary w-full mt-4">Register</button>
          <p className='text-xs my-2 text-primary'>Already have an account? <Link to='/login' className='text-red-500'>Login</Link></p>
        
        </fieldset>
        </form>
  
  {/* google signin */}
  <SocialLogin></SocialLogin>
      </div>
    </div>
    );
};

export default Register;