import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {emailChanged, passwordChanged, loginUser} from '../actions';
import {Card, CardSection, Input, Button, Spinner} from './common';

class LoginForm extends Component {
  _onEmailChanged(text) {
    this.props.emailChanged(text);
  }

  _onPasswordChanged(text) {
    this.props.passwordChanged(text);
  }

  _onButtonPress() {
    const {email, password} = this.props;

    this.props.loginUser({email, password});
  }

  _renderError() {
    if (this.props.error) {
      return (
        <View style={{backgroundColor: 'white'}}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  _renderButton() {
    if (this.props.loading) {
      return <Spinner size="large"/>;
    }

    return (
      <Button onPress={this._onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this._onEmailChanged.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this._onPasswordChanged.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        {this._renderError()}

        <CardSection>
          {this._renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({auth}) => {
  const {email, password, error, loading} = auth;
  return {email, password, error, loading};
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm);