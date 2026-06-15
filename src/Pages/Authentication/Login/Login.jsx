import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { AuthContext } from '../../../Context/AuthContext';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn } = useContext(AuthContext);

  const onSubmit = data => {
    signIn(data.email, data.password)
      .then((res) => {
        console.log(res);
      })
      .then((error) => {
        console.log(error)
      })
  }

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <h2 className='text-3xl mt-4 text-secondary text-center font-bold'>Login Now</h2>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input type="email" {...register('email', { required: true })}
              className="input w-full" placeholder="Email" />

            {/* passward */}
            <label className="label">Password</label>
            <input type="password" {...register('password', { required: true, minLength: 6 })}
              className="input w-full" placeholder="Password" />

            {errors.password?.type === 'required' && <p className='text-red-500'>password is required</p>}
            {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be at least 6 caracters</p>}

            <div><a className="link link-hover">Forgot password?</a></div>
            <button className="btn btn-primary w-full mt-4">Login</button>
            <p className='text-xs my-2 text-primary'>New to this website? <Link to='/register' className='text-red-500'>register</Link></p>


          </fieldset>
        </form>

        {/* Google */}
        <SocialLogin></SocialLogin>
      </div>
    </div>

  );
};

export default Login;