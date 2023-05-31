import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LandingPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [createAccountMode, setCreateAccountMode] = useState(false);

  const handleLogin = () => {
    // Handle login logic here
    console.log('Logging in with:', username, password);
  };

  const handleCreateAccount = () => {
    // Handle create account logic here
    console.log('Creating account with:', firstName, lastName, phoneNumber, email, username, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to the App</Text>
      {createAccountMode ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            onChangeText={setFirstName}
            value={firstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={setLastName}
            value={lastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
          />
        </>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title={createAccountMode ? 'Create Account' : 'Login'} onPress={createAccountMode ? handleCreateAccount : handleLogin} />
      <Button
        title={createAccountMode ? 'Back to Login' : 'Create Account'}
        onPress={() => setCreateAccountMode(!createAccountMode)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default LandingPage;
