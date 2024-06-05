const Mock = require('mockjs');

Mock.setup({
  timeout: 0 - 300
});

Mock.mock('/api/hello', 'get', {
  'status': 200,
  'body': {
    name: 'hello word',
  }
});

Mock.mock('/api/login', 'post', {
  'status': 200,
  'body': {
    'token': '1234567890'
  }
});
