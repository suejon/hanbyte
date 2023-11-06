import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Data saved successfully!');
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const getData = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};

export const getJSON = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key)
    if (data) return JSON.parse(data);
    throw Error(`No data found for key ${key}`);
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};

