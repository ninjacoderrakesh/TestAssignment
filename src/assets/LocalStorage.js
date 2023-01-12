import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_URL = 'https://43.231.127.169:9000/api/';

export const getAsyncValue = async key => {
  const value = await AsyncStorage.getItem(key);
  return value;
};

export const StoreData = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};

export const RemoveStoreData = async key => {
  await AsyncStorage.removeItem(key);
};
