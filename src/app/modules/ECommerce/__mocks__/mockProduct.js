import carTableMock from "./carTableMock";
import MockUtils from "./mock.utils";

export default function mockProducts(mock) {
  mock.onPost("api/products").reply(({ data }) => {
    const { product } = JSON.parse(data);
    const {
      model = "",
      manufacture = "",
      modelYear = 2000,
      mileage = 0,
      description = "",
      color = "Black",
      price = 1000,
      condition = 0,
      status = 0,
      VINCode = ""
    } = product;

    const id = generateProductId();
    const newProduct = {
      id,
      model,
      manufacture,
      modelYear,
      mileage,
      description,
      color,
      price,
      condition,
      status,
      VINCode
    };
    carTableMock.push(newProduct);
    return [200, { product: newProduct }];
  });

  mock.onPost("api/products/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filteredProducts = mockUtils.baseFilter(carTableMock, queryParams);
    return [200, filteredProducts];
  });

  mock.onPost("api/products/deleteProducts").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = carTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        carTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/products/updateStatusForProducts").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    carTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/v1\/rounds\/\d+/).reply(config => {
    return [200, {
      "minPlayers": 1,
      "maxPlayers": 20,
      "finalPeriod": 864000,
      "distributed": true,
      "locked": false,
      "roundId": 2,
      "startTime": 1666828800,
      "entryPeriod": 259200,
      "playPeriod": 864000,
      "entryAmount": 40,
      "adminFeeRate": 20,
      "roundFeeRate": 0,
      "gameId": "635792e04c66d1478c1a2eb4",
      "id": "6363ce40678985002151fd12"
  }];
  });

  mock.onGet(/v1\/rounds/).reply(config => {
    return [200, {
      "results": [
          {
              "minPlayers": 1,
              "maxPlayers": 10,
              "finalPeriod": 36000,
              "distributed": false,
              "locked": false,
              "roundId": 6,
              "startTime": 1667379300,
              "entryPeriod": 900,
              "playPeriod": 900,
              "entryAmount": 10,
              "adminFeeRate": 20,
              "roundFeeRate": 0,
              "gameId": "635792e04c66d1478c1a2eb4",
              "id": "6357a7e8e541872840726085"
          },
          {
              "minPlayers": 1,
              "maxPlayers": 20,
              "finalPeriod": 864000,
              "distributed": false,
              "locked": false,
              "roundId": 2,
              "startTime": 1666828800,
              "entryPeriod": 259200,
              "playPeriod": 864000,
              "entryAmount": 40,
              "adminFeeRate": 20,
              "roundFeeRate": 0,
              "gameId": "635792e04c66d1478c1a2eb4",
              "id": "6363ce40678985002151fd12"
          }
      ],
      "page": 1,
      "limit": 10,
      "totalPages": 1,
      "totalResults": 2
  }];
  });

  mock.onPost(/v1\/rounds/).reply(config => {
    return [201, {
      "minPlayers": 1,
      "maxPlayers": 20,
      "finalPeriod": 864000,
      "distributed": true,
      "locked": false,
      "roundId": 2,
      "startTime": 1666828800,
      "entryPeriod": 259200,
      "playPeriod": 864000,
      "entryAmount": 40,
      "adminFeeRate": 20,
      "roundFeeRate": 0,
      "gameId": "635792e04c66d1478c1a2eb4",
      "id": "6363ce40678985002151fd12"
  }];
  });

  mock.onPut(/api\/products\/\d+/).reply(config => {
    const id = config.url.match(/api\/products\/(\d+)/)[1];
    const { product } = JSON.parse(config.data);
    const index = carTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    carTableMock[index] = { ...product };
    return [200];
  });

  mock.onDelete(/api\/products\/\d+/).reply(config => {
    const id = config.url.match(/api\/products\/(\d+)/)[1];
    const index = carTableMock.findIndex(el => el.id === +id);
    carTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateProductId() {
  const ids = carTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}