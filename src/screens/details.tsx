import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';

export const Details = () => {
  const GET_USERS = 'https://jsonplaceholder.typicode.com/users';

  const [users, setUsers] = useState<{id: string; name: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(GET_USERS);
      const jsonData = await data.json();
      setUsers(jsonData);
    } catch (err) {
      console.log('error', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <>
          {users.map(user => (
            <Text key={user.id}>{user.name}</Text>
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 30,
  },
});
