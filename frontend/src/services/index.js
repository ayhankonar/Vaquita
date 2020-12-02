import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  ? (baseURL = 'here should be your production endpoint')
  : (baseURL = 'http://localhost:3000');

const service = axios.create({ withCredentials: true, baseURL });

const MY_SERVICE = {
  test: async () => {
    return await service.get('/');
  },
  signup: async (user) => {
    return await service.post('/signup', user);
  },
  login: async (user) => {
    return await service.post('/login', user);
  },
  logOut: async () => {
    return await service.get('/logout');
  }
};

export default MY_SERVICE;



// import axios from 'axios'

// const baseURL = process.env.NODE_ENV === 'development' ?
//   'http://localhost:3000/' :
//   '/'

// const authService = axios.create({
//   baseURL,
//   withCredentials: true
// })

// export const signupFn = userInfo =>
//   authService.post('/signup', userInfo)

// export const loginFn = userInfo =>
// authService.post('/login', userInfo)
