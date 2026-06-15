import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { AuthContext } from '../../../Context/AuthContext';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
  const {register,handleSubmit}=useForm();
  const {createUser}=useContext(AuthContext);

const onSubmit = data =>{
  createUser(data.email,data.password)
  .then((result)=>{
    console.log('user registered successfully');
    console.log(result.user)
  })
}

    return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h2 className='text-3xl mt-4 text-secondary text-center font-bold'>Register Now</h2>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
           
            {/* name */}
          <label className="label">Name</label>
          <input type="name" {...register('name')}
           className="input w-full" placeholder="Name" />
          
            {/* photo URL */}
          <label className="label">Photo</label>
          <input type="photo" {...register('photo')}
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
          <input type="phone" {...register('phone')}
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