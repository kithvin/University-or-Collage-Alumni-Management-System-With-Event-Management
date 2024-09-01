import React from 'react';
import { ValidatedField } from 'react-jhipster';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Row, Col, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import { type FieldError, useForm } from 'react-hook-form';
// import ChangeThemes from '../components/ChangeThemes';
// import { DiReact } from 'react-icons/di';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: (username: string, password: string, rememberMe: boolean) => void;
  handleClose: () => void;
}

const LoginModal = (props: ILoginModalProps) => {
  const login = ({ username, password, rememberMe }) => {
    props.handleLogin(username, password, rememberMe);
  };

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({ mode: 'onTouched' });

  const { loginError, handleClose } = props;

  const handleLoginSubmit = e => {
    handleSubmit(login)(e);
  };

  return (
    //     <Modal isOpen={props.showModal} toggle={handleClose} backdrop="static" id="login-page" autoFocus={false}>
    //       <Form onSubmit={handleLoginSubmit}>
    //         <ModalHeader id="login-title" data-cy="loginTitle" toggle={handleClose}>
    //           Sign in
    //         </ModalHeader>
    //         <ModalBody>
    //           <Row>
    //             <Col md="12">
    //               {loginError ? (
    //                 <Alert color="danger" data-cy="loginError">
    //                   <strong>Failed to sign in!</strong> Please check your credentials and try again.
    //                 </Alert>
    //               ) : null}
    //             </Col>
    //             <Col md="12">
    //               <ValidatedField
    //                 name="username"
    //                 label="Username"
    //                 placeholder="Your username"
    //                 required
    //                 autoFocus
    //                 data-cy="username"
    //                 validate={{ required: 'Username cannot be empty!' }}
    //                 register={register}
    //                 error={errors.username as FieldError}
    //                 isTouched={touchedFields.username}
    //               />
    //               <ValidatedField
    //                 name="password"
    //                 type="password"
    //                 label="Password"
    //                 placeholder="Your password"
    //                 required
    //                 data-cy="password"
    //                 validate={{ required: 'Password cannot be empty!' }}
    //                 register={register}
    //                 error={errors.password as FieldError}
    //                 isTouched={touchedFields.password}
    //               />
    //               <ValidatedField name="rememberMe" type="checkbox" check label="Remember me" value={true} register={register} />
    //             </Col>
    //           </Row>
    //           <div className="mt-1">&nbsp;</div>
    //           <Alert color="warning">
    //             <Link to="/account/reset/request" data-cy="forgetYourPasswordSelector">
    //               Did you forget your password?
    //             </Link>
    //           </Alert>
    //           <Alert color="warning">
    //             <span>You don&apos;t have an account yet?</span> <Link to="/account/register">Register a new account</Link>
    //           </Alert>
    //         </ModalBody>
    //         <ModalFooter>
    //           <Button color="secondary" onClick={handleClose} tabIndex={1}>
    //             Cancel
    //           </Button>{' '}
    //           <Button color="primary" type="submit" data-cy="submit">
    //             Sign in
    //           </Button>
    //         </ModalFooter>
    //       </Form>
    //     </Modal>

    <div className="flex w-full min-h-screen p-0 m-0">
      {/* Left Side: Background Image */}
      <div
        className="hidden w-1/2 bg-center bg-no-repeat bg-cover lg:flex"
        style={{ backgroundImage: 'url(/content/images/alu1.jpg)' }}
      ></div>

      {/* Right Side: Login Form */}
      <div className="flex flex-col items-center justify-start w-full bg-amber-100 lg:w-1/2">
        <div className="mt-24 mb-20">
          <h1 className="text-5xl font-bold text-center text-black">Alumni Management with Event Management</h1>
        </div>

        <div className="relative w-full h-auto xl:w-[80%] 2xl:w-[70%] 3xl:w-[60%] bg-base-100 rounded-lg shadow-md flex flex-col items-center p-5 pb-7 gap-8 pt-20 xl:pt-7">
          {/* Theme Toggle */}
          <div className="absolute top-5 right-5 z-[99]"></div>

          {/* Logo and Title */}
          <div className="flex items-center gap-2">
            <span className="text-3xl font-semibold text-base-content dark:text-neutral-200">Alumni Management Login</span>
          </div>

          {/* Welcome Message */}
          <span className="mb-4 text-xl font-semibold">Hello, 👋 Welcome AMSEM!</span>

          {/* Registration Form */}
          <div className="flex flex-col items-stretch w-full gap-3">
            <label className="flex items-center min-w-full gap-2 input input-bordered">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                placeholder="Email"
              />
            </label>
            <label className="flex items-center gap-2 input input-bordered">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                placeholder="Password"
              />
            </label>
            <div className="flex items-center justify-center mt-4">
              <div className="flex items-center gap-2 form-control">
                <label className="flex items-center gap-2 cursor-pointer label">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded-md checkbox checkbox-primary" />
                  <span className="text-xs label-text">Remember me</span>
                </label>
              </div>
            </div>
            <div className="mt-4 btn btn-block btn-primary">Login</div>
            <div className="flex justify-center mt-4 text-blue-700 text-md">
              Don't you have an account?{' '}
              <span className="ml-2">
                <Link to="/account/register">Register a new account</Link>
                <a
                  //                   onClick={handleLoginRedirect}
                  className="flex justify-center text-purple-600 cursor-pointer hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-100 hover:underline"
                >
                  Register Here !
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
