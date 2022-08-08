import React, { Component } from "react";
import PropTypes from "prop-types";

import { Alert, Card, CardBody, Col, Container, Row, Label } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

//Social Media Imports
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

//Import config
import { facebook, google } from "../../config";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// actions
import { apiError, loginUser, socialLogin } from "../../store/actions";

// import images
import profile from "../../assets/images/dashed-login-header.svg";
import logo from "../../assets/images/logo.svg";
import lightlogo from "../../assets/images/logo-light.svg";
import { supabase } from "supabaseClient";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.apiError("");
  }

  signIn = (res, type) => {
    const { socialLogin } = this.props;
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      };
      socialLogin(postData, this.props.history, type);
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      };
      socialLogin(postData, this.props.history, type);
    }
  };

  //handleGoogleLoginResponse
  googleResponse = response => {
    this.signIn(response, "google");
  };

  //handleTwitterLoginResponse
  twitterResponse = () => {};

  //handleFacebookLoginResponse
  facebookResponse = response => {
    this.signIn(response, "facebook");
  };

  signInWithGoogle = async () => {
    await supabase.auth.signIn(
      {
        provider: "google",
      },
      process.env.NODE_ENV == "development"
        ? { redirectTo: "http://localhost:3000" }
        : undefined
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="bx bx-home h2" />
          </Link>
        </div>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center mx-auto">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <div className="auth-header">
                    <Row className="px-4 align-items-center justify-content-between">
                      <Col className="col-4">
                        <img src={profile} alt="" className="img-fluid" />
                      </Col>
                      <Col className="col-8">
                        <div className="text-success">
                          <h5 className="text-success">Welcome Back !</h5>
                          <p className="mb-0">Sign in to continue to Dashed.</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div className="p-2">
                      {this.props.error && this.props.error ? (
                        <Alert color="danger">{this.props.error}</Alert>
                      ) : null}
                      <Formik
                        enableReinitialize={true}
                        initialValues={{
                          email:
                            (this.state && this.state.email) ||
                            "admin@themesbrand.com",
                          password:
                            (this.state && this.state.password) || "123456",
                        }}
                        validationSchema={Yup.object().shape({
                          email: Yup.string().required(
                            "Please Enter Your Email"
                          ),
                          password: Yup.string().required(
                            "Please Enter Valid Password"
                          ),
                        })}
                        onSubmit={values => {
                          this.props.loginUser(values, this.props.history);
                        }}
                      >
                        {({ errors, status, touched }) => (
                          <Form className="form-horizontal">
                            <div className="mb-3">
                              <Label for="email" className="form-label">
                                Email
                              </Label>
                              <Field
                                name="email"
                                type="text"
                                className={
                                  "form-control" +
                                  (errors.email && touched.email
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="mb-3">
                              <Label for="password" className="form-label">
                                Password
                              </Label>
                              <div className="input-group auth-pass-inputgroup">
                                <Field
                                  name="password"
                                  type="password"
                                  autoComplete="true"
                                  className={
                                    "form-control" +
                                    (errors.password && touched.password
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <button
                                  className="btn btn-light "
                                  type="button"
                                  id="password-addon"
                                >
                                  <i className="mdi mdi-eye-outline"></i>
                                </button>
                              </div>
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>

                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="customControlInline"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="customControlInline"
                              >
                                Remember me
                              </label>
                            </div>

                            <div className="mt-3 d-grid">
                              <button
                                className="btn btn-success btn-block"
                                type="submit"
                              >
                                Log In
                              </button>
                            </div>

                            <div className="mt-4 text-center">
                              <h5 className="font-size-14 mb-3">Sign in with</h5>

                              <ul className="list-inline">
                                {/* <li className="list-inline-item">
                                        <FacebookLogin
                                          appId={facebook.APP_ID}
                                          autoLoad={false}
                                          callback={this.facebookResponse}
                                          render={renderProps => (
                                            <Link
                                              to={""}
                                              className="social-list-item bg-primary text-white border-primary"
                                            >
                                              <i className="mdi mdi-facebook" />
                                            </Link>
                                          )}
                                        />
                                      </li> */}
                                <li className="list-inline-item">
                                  <button
                                    type="button"
                                    onClick={this.signInWithGoogle}
                                    className="social-list-item text-white"
                                  >
                                    <i className="mdi mdi-google" />
                                  </button>
                                </li>
                              </ul>
                            </div>

                            <div className="mt-4 text-center">
                              <Link to="/forgot-password" className="text-muted">
                                <i className="mdi mdi-lock me-1" /> Forgot your
                                password?
                              </Link>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </CardBody>
                </Card>
                {/* <div className="mt-5 text-center">
                  <p>
                    Don&apos;t have an account ?
                    <Link to="register" className="fw-medium text-primary">
                      Signup Now
                    </Link>
                  </p>
                  <p>
                    © {new Date().getFullYear()} Skote. Crafted with
                    <i className="mdi mdi-heart text-danger" /> by Themesbrand
                  </p>
                </div> */}
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  apiError: PropTypes.any,
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func,
};

const mapStateToProps = state => {
  const { error } = state.Login;
  return { error };
};

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError, socialLogin })(Login)
);
