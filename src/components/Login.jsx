import React from 'react';
import { Link } from 'react-router';

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      error: null
    };
  }

  static loadProps(params, cb) {
    cb(null, { sample: 'sample value' });
  }

  handleFormErrors(err) {
    this.setState({
      error: err
    });
  }

  handleSubmit(event) {
    var _this = this;
    var form = this.refs.form.getDOMNode();
    var formData = getFormData(form);

    e.preventDefault();
  }

  render() {
    return (
      <div className="login-wrapper ">
        <div className="bg-pic">
          <img src="/images/new-york-city-buildings-sunrise-morning-hd-wallpaper.jpg" data-src="/images/new-york-city-buildings-sunrise-morning-hd-wallpaper.jpg" data-src-retina="/images/new-york-city-buildings-sunrise-morning-hd-wallpaper.jpg" alt="" className="lazy" />
        </div>
        <div className="login-container bg-white">
          <div className="p-l-50 m-l-20 p-r-50 m-r-20 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40">
            <h1>Goodfoot</h1>
            <p className="p-t-35">Sign into your account</p>

            <If condition={this.state.error}>
              <div className="alert alert-danger" role="alert">
                <strong>{this.state.error}</strong>
              </div>
            </If>

            {/* TODO: isomorphisize. Right now, this only works client-side */}
            <form onSubmit={this.handleSubmit} id="form-login" ref="form" role="form">
              <div className="form-group form-group-default">
                <label>Login</label>
                <div className="controls">
                  <input id="test-field-email" type="email" name="email" ref="email" placeholder="Email" className="form-control" />
                </div>
              </div>
              <div className="form-group form-group-default">
                <label>Password</label>
              <div className="controls">
                  <input id="test-field-password" type="password" className="form-control" name="password" ref="password" placeholder="Credentials" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 text-left">
                  <button id="test-btn-submit" className="btn btn-primary btn-cons m-t-10" type="submit">Sign in</button>
                </div>
                <div className="col-md-6 text-right">
                  <Link className="text-info" to="forgotPassword">Forgot Your Password?</Link>
                </div>
              </div>
            </form>
            <div className="pull-bottom sm-pull-bottom">
              <div className="m-b-30 p-r-80 sm-m-t-20 sm-p-r-15 sm-p-b-20 clearfix">
                <div className="col-sm-12 no-padding m-t-10">
                  <p>
                    <small>
                      <Link className="text-info" to="register">Register a new account</Link>
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

};