import AsyncStorage from '@react-native-async-storage/async-storage';

const data = {
    storeData: async (key, value) => {
        try {
            const jsonValue = value;
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
        }
    },

    getData: async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value
            }
        } catch (e) {
        }
        return null
    },
    clear: async () => {
        try {
            await AsyncStorage.clear();
        } catch (error) {
        }
    },
    removeData: async (item) => {
        try {
            await AsyncStorage.removeItem(item);
        } catch (error) {
        }
    }
}
export default data