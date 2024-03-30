import React from 'react';

export default function LoginPage() {

    return (
        <div className='LoginPage'>
            <form>
                <input type='text' placeholder="User"/>
                <input type='password' placeholder="password"/>
                <button>Login</button>
            </form>
        </div>
    );
}