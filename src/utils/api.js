import data from "../utils/localStorage";

const  token = ""
const domaine = "https://masurao.fr"
const api = {
    getLogin: (email, password) => {
      const url = domaine + '/api/employees/login';
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Group-Authorization': token,
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      };
      return fetch(url, options)
    },
  
    getEmployees: async () => {
      const access_token = await data.getData("token");
      return fetch(domaine + '/api/employees', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Group-Authorization': token,
          'Authorization': 'Bearer ' + access_token
        }
      })
    },
  
    getMe: async ()  => {
      const access_token = await data.getData("token");
      return fetch(domaine + '/api/employees/me', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Group-Authorization': token,
          'Authorization': 'Bearer ' + access_token
        }
      })
    },
  
    getLeaders: async () => {
      const access_token = await data.getData("token");
      return fetch(domaine + '/api/employees/leaders', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Group-Authorization': token,
          'Authorization': 'Bearer ' + access_token
        }
      })
    },
  
    getEmployeeId: async (number) => {
      const access_token = await data.getData("token");
      return fetch(domaine + '/api/employees/' + number, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Group-Authorization': token,
          'Authorization': 'Bearer ' + access_token
        }
      })
    },
  
    getEmployeeImage: async (number) => {
      const access_token = await data.getData("token");
      return fetch(domaine + '/api/employees/' + number + '/image', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Group-Authorization': token,
          'Authorization': 'Bearer ' + access_token
        }
      })
    }
}

export default api
  
