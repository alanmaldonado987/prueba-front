import React from 'react'
import "../css/Login.css"
import { LoginService } from '../services/LoginService';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Login = () => {

    const {
        register,
        handleSubmit,
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await LoginService(data);
            const { token } = response.data;
            localStorage.setItem('token', token);
            navigate('/home');
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Credenciales Invalidas!",
            });
            console.error(error)
        }
    }

    return (
        <section className='form-section'>
            <div class="form-box">
                <div class="form-value">
                    <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                        <h2>Login</h2>
                        <div class="inputbox">
                            <ion-icon name="mail-outline"></ion-icon>
                            <input type="input" required name='username' {...register("username")} />
                            <label for="">Username</label>
                        </div>
                        <div class="inputbox">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input type="password" required name='password' {...register("password")} />
                            <label for="">Password</label>
                        </div>
                        <div class="forget">
                            <label for=""><input type="checkbox" />Recuerdame</label>
                        </div>
                        <button>Entrar</button>
                        <div class="register">
                            <p>ISES</p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login