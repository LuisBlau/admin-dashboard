import {
  LOGIN_URL,
  ME_URL,
  REGISTER_URL,
  REQUEST_PASSWORD_URL
} from "../_redux/authCrud";
import userTableMock from "./userTableMock";

export default function mockAuth(mock) {
  mock.onPost(LOGIN_URL).reply(({ data }) => {
    const { email, password } = JSON.parse(data);

    if (email && password) {
      const user = userTableMock.find(
        x =>
          x.email.toLowerCase() === email.toLowerCase() &&
          x.password === password
      );

      if (user) {
        return [200, {
          "user": {
              "steam": "76561199404390245",
              "role": "admin",
              "isEmailVerified": false,
              "provider": "email",
              "name": "Admin",
              "email": "mailto:admin@playestates.com",
              "id": "63578ce0f0d07a26ccada392"
          },
          "tokens": {
              "access": {
                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzU3OGNlMGYwZDA3YTI2Y2NhZGEzOTIiLCJpYXQiOjE2Njc0Mzg4OTIsImV4cCI6MTY3MDAzMDg5MiwidHlwZSI6ImFjY2VzcyJ9.lhUU8uO7tyn248Ef_v_FCUKTyP7hO00-MmIbyez8B5g",
                  "expires": "2022-12-03T01:28:12.818Z"
              },
              "refresh": {
                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzU3OGNlMGYwZDA3YTI2Y2NhZGEzOTIiLCJpYXQiOjE2Njc0Mzg4OTIsImV4cCI6NTM5OTkxODg5MiwidHlwZSI6InJlZnJlc2gifQ.U9n2cCDVH3spk5OagOwJ2q-ckiNKDO7SJKGCJHZbjE4",
                  "expires": "2141-02-12T01:28:12.820Z"
              }
          }
      }];
      }
    }

    return [400];
  });

  mock.onPost(REGISTER_URL).reply(({ data }) => {
    const { email, fullname, username, password } = JSON.parse(data);

    if (email && fullname && username && password) {
      const user = {
        id: generateUserId(),
        email,
        fullname,
        username,
        password,
        roles: [2], // Manager
        accessToken: "access-token-" + Math.random(),
        refreshToken: "access-token-" + Math.random(),
        pic: process.env.PUBLIC_URL + "/media/users/default.jpg"
      };

      userTableMock.push(user);

      return [200, { ...user, password: undefined }];
    }

    return [400];
  });

  mock.onPost(REQUEST_PASSWORD_URL).reply(({ data }) => {
    const { email } = JSON.parse(data);

    if (email) {
      const user = userTableMock.find(
        x => x.email.toLowerCase() === email.toLowerCase()
      );

      if (user) {
        user.password = undefined;

        return [200, { ...user, password: undefined }];
      }
    }

    return [400];
  });

  mock.onGet(ME_URL).reply(({ headers: { Authorization } }) => {
    const accessToken =
      Authorization &&
      Authorization.startsWith("Bearer ") &&
      Authorization.slice("Bearer ".length);

    if (accessToken) {
      const user = userTableMock.find(x => x.accessToken === accessToken);

      if (user) {
        return [200, { ...user, password: undefined }];
      }
    }

    return [401];
  });

  function generateUserId() {
    const ids = userTableMock.map(el => el.id);
    const maxId = Math.max(...ids);
    return maxId + 1;
  }
  
}
