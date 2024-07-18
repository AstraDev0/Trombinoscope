import { ref, set, get, remove, onValue } from 'firebase/database'
import { db } from '../../config'

const fireApi = {
    setData: (firstTitle, body) => {
        set(ref(db, firstTitle),
            body
        )
    },
    getData: (title) => {
        const dataRef = ref(db, title);

        return get(dataRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    return snapshot.val();
                } else {
                    return null;
                }
            })
            .catch((error) => {
                return null;
            });
    },
    removeData: (title) => {
        const dataRef = ref(db, title);

        return remove(dataRef)
            .then(() => {
                return true
            })
            .catch((error) => {
                return false
            });
    },

    listenToRealTimeData: (title, callback) => {
        const dataRef = ref(db, title);
        let first = true;
        
        onValue(dataRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const keys = Object.keys(data);
                keys.sort((a, b) => data[a].timestamp - data[b].timestamp);
                const sortedData = keys.map((key) => data[key]);
                callback(sortedData, first);
            } else {
                callback(null, first);
            }
            first = false;
        });
    }
}

export default fireApi