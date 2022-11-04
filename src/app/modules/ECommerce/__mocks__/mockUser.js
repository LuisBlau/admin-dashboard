import userTableMock from "./userTableMock";
import MockUtils from "./mock.utils";

export default function mockUsers(mock) {
  mock.onPost("api/users").reply(({ data }) => {
    const { user } = JSON.parse(data);
    const {
      firstName = "",
      lastName = "",
      email = "",
      userName = "",
      gender = "Female",
      status = 0,
      dateOfBbirth = "01/01/2019",
      ipAddress = "127.0.0.1",
      type = 1
    } = user;

    const id = generateUserId();
    const newUser = {
      id,
      firstName,
      lastName,
      email,
      userName,
      gender,
      status,
      dateOfBbirth,
      ipAddress,
      type
    };
    userTableMock.push(newUser);
    return [200, { user: newUser }];
  });

  mock.onGet("https://game-engine-backend-api.herokuapp.com/v1/users?role=admin&limit=100").reply(config => {
    // const mockUtils = new MockUtils();
    // const { queryParams } = JSON.parse(config.data);
    // const filterdUsers = mockUtils.baseFilter(
    //   userTableMock,
    //   queryParams
    // );
    return [200, {
      "results": [
          {
              "steam": "",
              "role": "user",
              "isEmailVerified": false,
              "provider": "email",
              "name": "Steam User",
              "email": "steam@gmail.com",
              "id": "6351cab45e765910d0c9adb9"
          },
          {
              "steam": "76561199419288972",
              "role": "user",
              "isEmailVerified": false,
              "provider": "google",
              "email": "bluesilver0702@gmail.com",
              "name": "Raveewit Anan",
              "id": "635991442bac450021772fda"
          },
          {
              "steam": "76561199419435129",
              "role": "user",
              "isEmailVerified": false,
              "provider": "google",
              "email": "nguyenbiz921@gmail.com",
              "name": "Galaxy undefined",
              "stripeCustomer": {
                  "id": "cus_MgkQEeiN0RUsQa",
                  "object": "customer",
                  "address": null,
                  "balance": 0,
                  "created": 1666841944,
                  "currency": null,
                  "default_source": null,
                  "delinquent": false,
                  "description": null,
                  "discount": null,
                  "email": "nguyenbiz921@gmail.com",
                  "invoice_prefix": "16392C96",
                  "invoice_settings": {
                      "custom_fields": null,
                      "default_payment_method": null,
                      "footer": null,
                      "rendering_options": null
                  },
                  "livemode": false,
                  "name": "undefined undefined",
                  "next_invoice_sequence": 1,
                  "phone": null,
                  "preferred_locales": [],
                  "shipping": null,
                  "tax_exempt": "none",
                  "test_clock": null
              },
              "id": "6359fc246eb8bf0021a292bf"
          },
          {
              "steam": "76561199386872764",
              "role": "user",
              "isEmailVerified": false,
              "provider": "google",
              "email": "daogods@gmail.com",
              "name": "AA A",
              "stripeCustomer": {
                  "id": "cus_Mj4yLtpbN5Pjv9",
                  "object": "customer",
                  "address": null,
                  "balance": 0,
                  "created": 1667379666,
                  "currency": null,
                  "default_source": null,
                  "delinquent": false,
                  "description": null,
                  "discount": null,
                  "email": "daogods@gmail.com",
                  "invoice_prefix": "56FB06AA",
                  "invoice_settings": {
                      "custom_fields": null,
                      "default_payment_method": null,
                      "footer": null,
                      "rendering_options": null
                  },
                  "livemode": false,
                  "name": "undefined undefined",
                  "next_invoice_sequence": 1,
                  "phone": null,
                  "preferred_locales": [],
                  "shipping": null,
                  "tax_exempt": "none",
                  "test_clock": null
              },
              "id": "635a2385d772cd0021d393bb"
          },
          {
              "steam": "76561199386872764",
              "role": "user",
              "isEmailVerified": false,
              "provider": "google",
              "email": "mohsentbusiness@gmail.com",
              "name": "Mohsen T",
              "stripeCustomer": {
                  "id": "cus_MgpzGYH4yBphFB",
                  "object": "customer",
                  "address": null,
                  "balance": 0,
                  "created": 1666862609,
                  "currency": null,
                  "default_source": null,
                  "delinquent": false,
                  "description": null,
                  "discount": null,
                  "email": "mohsentbusiness@gmail.com",
                  "invoice_prefix": "67FC88DD",
                  "invoice_settings": {
                      "custom_fields": null,
                      "default_payment_method": null,
                      "footer": null,
                      "rendering_options": null
                  },
                  "livemode": false,
                  "name": "undefined undefined",
                  "next_invoice_sequence": 1,
                  "phone": null,
                  "preferred_locales": [],
                  "shipping": null,
                  "tax_exempt": "none",
                  "test_clock": null
              },
              "id": "635a27c0d772cd0021d393d5"
          },
          {
              "steam": "",
              "role": "user",
              "isEmailVerified": false,
              "provider": "email",
              "name": "daren",
              "email": "securemasterbusiness@gmail.com",
              "id": "635ab119d772cd0021d39646"
          },
          {
              "steam": "",
              "role": "user",
              "isEmailVerified": false,
              "provider": "email",
              "name": "super",
              "email": "super@playestates.com",
              "id": "635ac356d772cd0021d3969c"
          },
          {
              "steam": "",
              "role": "user",
              "isEmailVerified": false,
              "provider": "email",
              "email": "fullcoder525@gmail.com",
              "name": "Supercrytoking",
              "id": "635af1f0d772cd0021d396da"
          },
          {
              "steam": "",
              "role": "user",
              "isEmailVerified": false,
              "provider": "email",
              "email": "superadmin@playestates.com",
              "name": "Admin",
              "id": "635af835d772cd0021d396fe"
          },
          {
              "steam": "76561199423476230",
              "role": "user",
              "isEmailVerified": false,
              "provider": "google",
              "email": "playestates2022@gmail.com",
              "name": "play estates",
              "id": "635f14215d1faa002190859a"
          },
          {
            "steam": "96561199423476230",
            "role": "user",
            "isEmailVerified": false,
            "provider": "google",
            "email": "qplayestates2022@gmail.com",
            "name": "qplay estates",
            "id": "635f14215d1faa002190859b"
        }
      ],
      "page": 1,
      "limit": 10,
      "totalPages": 2,
      "totalResults": 11
  }];
  });

  mock.onGet("https://game-engine-backend-api.herokuapp.com/v1/users?role=user&limit=100").reply(config => {
    // const mockUtils = new MockUtils();
    // const { queryParams } = JSON.parse(config.data);
    // const filterdUsers = mockUtils.baseFilter(
    //   userTableMock,
    //   queryParams
    // );
    return [200, {
      "results": [
          {
              "steam": "",
              "role": "user",
              "isEmailVerified": false,
              "provider": "email",
              "name": "Steam User",
              "email": "steam@gmail.com",
              "id": "6351cab45e765910d0c9adb9"
          },
          {
              "steam": "76561199419288972",
              "role": "user",
              "isEmailVerified": false,
              "provider": "google",
              "email": "bluesilver0702@gmail.com",
              "name": "Raveewit Anan",
              "id": "635991442bac450021772fda"
          },
          {
              "steam": "76561199419435129",
              "role": "user",
              "isEmailVerified": false,
              "provider": "google",
              "email": "nguyenbiz921@gmail.com",
              "name": "Galaxy undefined",
              "stripeCustomer": {
                  "id": "cus_MgkQEeiN0RUsQa",
                  "object": "customer",
                  "address": null,
                  "balance": 0,
                  "created": 1666841944,
                  "currency": null,
                  "default_source": null,
                  "delinquent": false,
                  "description": null,
                  "discount": null,
                  "email": "nguyenbiz921@gmail.com",
                  "invoice_prefix": "16392C96",
                  "invoice_settings": {
                      "custom_fields": null,
                      "default_payment_method": null,
                      "footer": null,
                      "rendering_options": null
                  },
                  "livemode": false,
                  "name": "undefined undefined",
                  "next_invoice_sequence": 1,
                  "phone": null,
                  "preferred_locales": [],
                  "shipping": null,
                  "tax_exempt": "none",
                  "test_clock": null
              },
              "id": "6359fc246eb8bf0021a292bf"
          },
          {
              "steam": "76561199386872764",
              "role": "user",
              "isEmailVerified": false,
              "provider": "google",
              "email": "daogods@gmail.com",
              "name": "AA A",
              "stripeCustomer": {
                  "id": "cus_Mj4yLtpbN5Pjv9",
                  "object": "customer",
                  "address": null,
                  "balance": 0,
                  "created": 1667379666,
                  "currency": null,
                  "default_source": null,
                  "delinquent": false,
                  "description": null,
                  "discount": null,
                  "email": "daogods@gmail.com",
                  "invoice_prefix": "56FB06AA",
                  "invoice_settings": {
                      "custom_fields": null,
                      "default_payment_method": null,
                      "footer": null,
                      "rendering_options": null
                  },
                  "livemode": false,
                  "name": "undefined undefined",
                  "next_invoice_sequence": 1,
                  "phone": null,
                  "preferred_locales": [],
                  "shipping": null,
                  "tax_exempt": "none",
                  "test_clock": null
              },
              "id": "635a2385d772cd0021d393bb"
          },
          {
              "steam": "76561199386872764",
              "role": "user",
              "isEmailVerified": false,
              "provider": "google",
              "email": "mohsentbusiness@gmail.com",
              "name": "Mohsen T",
              "stripeCustomer": {
                  "id": "cus_MgpzGYH4yBphFB",
                  "object": "customer",
                  "address": null,
                  "balance": 0,
                  "created": 1666862609,
                  "currency": null,
                  "default_source": null,
                  "delinquent": false,
                  "description": null,
                  "discount": null,
                  "email": "mohsentbusiness@gmail.com",
                  "invoice_prefix": "67FC88DD",
                  "invoice_settings": {
                      "custom_fields": null,
                      "default_payment_method": null,
                      "footer": null,
                      "rendering_options": null
                  },
                  "livemode": false,
                  "name": "undefined undefined",
                  "next_invoice_sequence": 1,
                  "phone": null,
                  "preferred_locales": [],
                  "shipping": null,
                  "tax_exempt": "none",
                  "test_clock": null
              },
              "id": "635a27c0d772cd0021d393d5"
          },
          {
              "steam": "",
              "role": "user",
              "isEmailVerified": false,
              "provider": "email",
              "name": "daren",
              "email": "securemasterbusiness@gmail.com",
              "id": "635ab119d772cd0021d39646"
          },
          {
              "steam": "",
              "role": "user",
              "isEmailVerified": false,
              "provider": "email",
              "name": "super",
              "email": "super@playestates.com",
              "id": "635ac356d772cd0021d3969c"
          },
          {
              "steam": "",
              "role": "user",
              "isEmailVerified": false,
              "provider": "email",
              "email": "fullcoder525@gmail.com",
              "name": "Supercrytoking",
              "id": "635af1f0d772cd0021d396da"
          },
          {
              "steam": "",
              "role": "user",
              "isEmailVerified": false,
              "provider": "email",
              "email": "superadmin@playestates.com",
              "name": "Admin",
              "id": "635af835d772cd0021d396fe"
          },
          {
              "steam": "76561199423476230",
              "role": "user",
              "isEmailVerified": false,
              "provider": "google",
              "email": "playestates2022@gmail.com",
              "name": "play estates",
              "id": "635f14215d1faa002190859a"
          },
          {
            "steam": "96561199423476230",
            "role": "user",
            "isEmailVerified": false,
            "provider": "google",
            "email": "qplayestates2022@gmail.com",
            "name": "qplay estates",
            "id": "635f14215d1faa002190859b"
        }
      ],
      "page": 1,
      "limit": 10,
      "totalPages": 2,
      "totalResults": 11
  }];
  });

  mock.onPost("api/users/deleteUsers").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = userTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        userTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/users/updateStatusForUsers").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    userTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/v1\/users\/\d+/).reply(config => {
    // const id = config.url.match(/https:\/\/game-engine-backend-api.herokuapp.com\/v1\/users\/(\d+)/)[1];
    // const user = userTableMock.find(el => el.id === +id);
    // if (!user) {
    //   return [400];
    // }

    return [200, {
      "steam": "76561199404390245",
      "role": "admin",
      "isEmailVerified": false,
      "provider": "email",
      "name": "AdminTest",
      "email": "admintest@playestates.com",
      "id": "63578ce0f0d07a26ccada392"
  }];
  });

  mock.onPut(/api\/users\/\d+/).reply(config => {
    const id = config.url.match(/api\/users\/(\d+)/)[1];
    const { user } = JSON.parse(config.data);
    const index = userTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    userTableMock[index] = { ...user };
    return [200];
  });

  mock.onDelete(/api\/users\/\d+/).reply(config => {
    const id = config.url.match(/api\/users\/(\d+)/)[1];
    const index = userTableMock.findIndex(el => el.id === +id);
    userTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateUserId() {
  const ids = userTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
