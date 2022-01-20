import React from 'react';

function Login() {
  return <div className='login'>
<form className='login__form'>
<label htmlFor="loginId">login ID:</label>
<input type="text" name="loginId" id="loginId" />
<label htmlFor="loginPassword">Password:</label>
<input type="text" name='loginPassword' id='loginPassword'/>

</form>
  </div>;
}

export default Login;
