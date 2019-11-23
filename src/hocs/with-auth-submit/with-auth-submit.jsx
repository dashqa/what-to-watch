import React from "react";
import {compose} from "recompose";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";

import {getAuthStatus} from "@store/user-data/selectors";
import {authorizeUser} from "@store/user-data/actions";

const validateForm = (form, errors) => {
  const nonNullFields = Object.values(form).every((val) => val.length);
  const nonErrors = !Object.values(errors).some((val) => val.length);
  return nonErrors && nonNullFields;
};

const withAuthSubmit = (Component) => {
  class WithAuthSubmit extends React.PureComponent {
    constructor(props) {
      super(props);

      this._handleSubmit = this._handleSubmit.bind(this);
      this._handleChange = this._handleChange.bind(this);

      this.state = {
        formData: {
          email: ``,
          password: ``,
        },
        errors: {
          email: ``,
          password: ``,
        },
        isValid: false,
      };
    }

    render() {
      const {errors, isValid, formData} = this.state;

      return <Component
        {...this.props}
        formData={formData}
        errors={errors}
        isValid={isValid}
        onChange={this._handleChange}
        onSubmit={this._handleSubmit}
      />;
    }

    _handleChange(evt) {
      const {name, value} = evt.target;
      const errors = Object.assign({}, this.state.errors);
      const emailRegEx = RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

      switch (name) {
        case `email`:
          errors.email =
            emailRegEx.test(value)
              ? ``
              : `Please enter a valid email address.`;
          break;
        case `password`:
          errors.password =
            value.length <= 3
              ? `Please enter a valid password.`
              : ``;
          break;
        default:
          break;
      }

      this.setState((prevState) => {
        const formData = Object.assign({}, prevState.formData);
        formData[name] = value;

        return {
          formData,
          errors,
          isValid: validateForm(formData, errors)
        };
      });
    }

    _handleSubmit(evt) {
      evt.preventDefault();
      const {onAuthorizeUser, history} = this.props;
      const {formData, isValid} = this.state;
      if (!isValid) {
        return;
      }

      onAuthorizeUser({
        email: formData.email,
        password: formData.password
      })
        .then((data) => {
          if (data) {
            history.goBack();
          }
        });
    }
  }

  WithAuthSubmit.defaultProps = {
    onAuthorizeUser: () => {},
    authorized: false,
    history: {}
  };

  WithAuthSubmit.propTypes = {
    onAuthorizeUser: PropTypes.func.isRequired,
    authorized: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
  };

  return WithAuthSubmit;
};

const mapStateToProps = (state) => ({
  authorized: getAuthStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onAuthorizeUser: bindActionCreators(authorizeUser, dispatch)
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthSubmit
);

