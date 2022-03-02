import React from 'react';

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '945751013048-i4bjh3d3q3u4c54vsj7f47215q7iqqdv.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return <div>Unsure if signed in</div>;
    } else if (this.state.isSignedIn === true) {
      return <div>SignedIn</div>;
    } else {
      return <div>NotSignedIn</div>;
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
