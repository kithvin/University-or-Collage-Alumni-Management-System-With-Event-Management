import React from 'react';
import { ValidatedField } from 'react-jhipster';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Row, Col, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import { type FieldError, useForm } from 'react-hook-form';
// import ChangeThemes from '../components/ChangeThemes';
// import { DiReact } from 'react-icons/di';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa'; // Added FaUser for username icon
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/register');
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

        {/* Login Form */}
        <form
          onSubmit={handleLoginSubmit}
          className="relative w-full h-auto xl:w-[80%] 2xl:w-[70%] 3xl:w-[60%] bg-base-100 rounded-lg shadow-md flex flex-col items-center p-5 pb-7 gap-8 pt-20 xl:pt-7 bg-white"
        >
          {/* Logo and Title */}
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-black p-2 rounded-md">Alumni Management Login</span>
          </div>

          {/* Welcome Message */}
          <span className="mb-4 text-xl font-semibold">Hello, 👋 Welcome AMSEM!</span>

          {/* Login Form Inputs */}
          <div className="flex flex-col items-stretch w-full gap-3 bg">
            <Col md="12">
              {loginError ? (
                <Alert color="danger" data-cy="loginError">
                  <strong>Failed to sign in!</strong> Please check your credentials and try again.
                </Alert>
              ) : null}
            </Col>

            <ValidatedField
              name="username"
              label="Username"
              placeholder="Your username"
              required
              autoFocus
              data-cy="username"
              validate={{ required: 'Username cannot be empty!' }}
              register={register}
              error={errors.username as FieldError}
              isTouched={touchedFields.username}
            />
            <ValidatedField
              name="password"
              type="password"
              label="Password"
              placeholder="Your password"
              required
              data-cy="password"
              validate={{ required: 'Password cannot be empty!' }}
              register={register}
              error={errors.password as FieldError}
              isTouched={touchedFields.password}
            />

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-center mt-4">
              <div className="flex items-center gap-2 form-control">
                <label className="flex items-center gap-2 cursor-pointer label">
                  <input type="checkbox" className="w-4 h-4 rounded-md checkbox checkbox-primary" />
                  <span className="text-xs label-text">Remember me</span>
                </label>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="mt-4 btn btn-block btn-primary bg-indigo-600 text-white font-semibold py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Login
            </button>

            {/* Redirect to Registration */}
            <div className="flex justify-center mt-4 text-blue-700 text-md">
              Don't you have an account?{' '}
              <span className="ml-2">
                <Link
                  to="/account/register"
                  className="flex justify-center text-purple-600 cursor-pointer hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-100 hover:underline"
                >
                  Register a new account
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
