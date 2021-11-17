import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { login, clearSessionErrors } from '../../actions/session_actions';

const mapStateToProps = (state) => ({
  errors: state.errors.session,
});

const mapDispatchToProps = {
  login,
  clearSessionErrors,
};

export const LoginForm = ({ postLogin, errors, login, clearSessionErrors }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    return () => clearSessionErrors();
  }, [clearSessionErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    login(user).then((action) => {
      if (action.type === 'RECEIVE_CURRENT_USER' && postLogin) postLogin();
    });
  };

  return (
    <div className='main-login-form-container'>
      <form onSubmit={handleSubmit}>
        <h3>Welcome back to Koko</h3>
        <div className='login-content'>
          <div>
            <label htmlFor='email'>Email {errors.email}</label>
            <div className='input-box-container'>
              <input
                type='text'
                id='email'
                spellCheck='false'
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder='Email'
              />
            </div>
          </div>

          <div>
            <label htmlFor='password'>Password {errors.password}</label>
            <div className='input-box-container'>
              <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                placeholder='Password'
              />
            </div>
          </div>
        </div>

        <button>Login</button>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
