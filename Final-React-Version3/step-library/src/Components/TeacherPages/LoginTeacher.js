import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginTeacher = () => {
    const [data, setData] = useState({
        api_token: 'api_65855bfab232f',
        username: '',
        password: '',
    });

    const [whenFieldsNotInput, setWhenFieldsNotInput] = useState('');
    const [setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (data.username.length > 0 && data.password.length > 0) {
            try {
                const response = await fetch('http://172.104.166.110/api/FT_SD_A_3/login.php', {
                    method: 'POST',
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    if (responseData.status === 'SUCCESS') {
                        console.log(responseData);
                        Swal.fire({
                            title: 'Login Successful',
                            text: 'You have successfully logged in.',
                            icon: 'success',
                        });
                        navigate('/Homepage', {
                            state: {
                                username: data.username,
                                teacher_token: responseData.token, // You may need to adjust this based on your backend response
                            },
                        });
                    } else if (responseData.status === 'USER_NOT_FOUND') {
                        Swal.fire({
                            title: 'Login Failed',
                            text: 'User not found. Please check your username and try again.',
                            icon: 'error',
                        });
                    } else {
                        Swal.fire({
                            title: 'Login Failed',
                            text: 'Invalid username or password. Please check your login details again.',
                            icon: 'error',
                        });
                    }
                } else {
                    throw new Error(response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage('An error occurred.');
            }
        } else {
            setWhenFieldsNotInput('border border-danger');
            setErrorMessage('Invalid fields');
        }
    };

    return (
        <div className='App'>
            <style>
                {`
          body {
            background-color: #e3f2fd;
            font-family: 'Allerta Stencil', sans-serif;
          }
        `}
            </style>
            <section className="h-100">
                <div className="container h-100">
                    <div className="row justify-content-sm-center h-100">
                        <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                            <div className="text-center my-5">
                                <img src="https://fsx1.itstep.org/api/v1/files/-bRZCFuPESE9skZZlyP75n4dL9uFnEpm" alt="logo" width="100" />
                            </div>
                            <div className="card shadow-lg">
                                <div className="card-body p-5">
                                    <h1 className="fs-4 card-title fw-bold mb-4" style={{ textAlign: 'center' }}>
                                        Login As Teacher
                                    </h1>
                                    <form onSubmit={handleLogin} className="needs-validation" noValidate autoComplete="off">
                                        <div className="mb-3">
                                            <label className="mb-2 text-muted" htmlFor="username">
                                                Username
                                            </label>
                                            <input
                                                id="username"
                                                type="text"
                                                className={`form-control ${whenFieldsNotInput}`}
                                                name="username"
                                                value={data.username}
                                                onChange={(e) => setData({ ...data, username: e.target.value })}
                                                required
                                                autoFocus
                                            />
                                            <div className="invalid-feedback">Username is required</div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="mb-2 text-muted" htmlFor="password">
                                                Password
                                            </label>
                                            <input
                                                id="password"
                                                type="password"
                                                className={`form-control ${whenFieldsNotInput}`}
                                                name="password"
                                                value={data.password}
                                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                                required
                                            />
                                            <div className="invalid-feedback">Password is required</div>
                                        </div>

                                        <div className="d-flex justify-content-center">
                                            <button type="submit" className="btn btn-primary mx-auto">
                                                Login
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer py-3 border-0">
                                    {/* Removed sign-up related content */}
                                </div>
                            </div>
                            <div className="text-center mt-5 text-muted">Copyright &copy; 2023-2024 &mdash; IT STEP</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginTeacher;
