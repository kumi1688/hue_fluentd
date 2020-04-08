const axios = require('axios');
var express = require('express');
var router = express.Router();

const log4js = require('log4js');

log4js.configure({
  appenders:{
    fluent: {
      type: 'log4js-fluent-appender',
      tag_prefix: 'hue',
      options: {
        levelTag: true,
        host: 'localhost',
        port: 24224
      }
    }
  },
  categories: {
    default: {
      appenders: ['fluent'],
      level: 'info'
    }
  }
})


const hueBaseUrl = 'http://210.107.205.200:8080/api/wkcBD-lTULsGrCJ2hqZZqgeQsfathjs6zc3Rul1O/lights/10';

router.get('/:value', (req, res) => {
  console.log(req.params);
  const value = req.params.value;
    axios.put(`${hueBaseUrl}/state`, {
      on: value === 'true' ? true: false
    });
    const logger = log4js.getLogger();
    logger.info(`get ${value} from frontend`);
    res.send(`current state = ${value}`);
});


module.exports = router;
