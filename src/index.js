const chalk = require('chalk');

const {
  request,
  getFormatDate
} = require('../utils');

// 实时数据
const nowUrl = 'https://api.seniverse.com/v3/weather/now.json';

// 三日数据接口
const dailyUrl = 'https://api.seniverse.com/v3/weather/daily.json';

module.exports = {
  threeDaysWeather: (cityName) => {
    request(dailyUrl, cityName).then(data => {
      const current = data.results[0];
      
      console.log(chalk.green(`城市：${current.location.name}\n`))
      console.log(chalk.green(`三日天气：`))
      console.log(chalk.green(`    日期    | 白天 | 夜间 |  气温  |  风力  `));
      current.daily.forEach((item, index) => {
        if (index === 0) {
          console.log(chalk.yellow(`${item.date}  | ${item.text_day} | ${item.text_day} | ${item.high} ~ ${item.low} |   ${item.wind_scale}`))

        } else {
          console.log(chalk.green(`${item.date}  | ${item.text_day} | ${item.text_day} | ${item.high} ~ ${item.low} |   ${item.wind_scale}`))

        }
      });
      console.log(chalk.green(`\n更新时间：${getFormatDate('YYYY-MM-DD HH:MM:SS', current.last_update)}\n`));
    }).catch(err => {
      console.log(err);
      
    })
  },

  realTimeWeather: (cityName) => {
    request(nowUrl, cityName).then(data => {
      const current = data.results[0];
      console.log(current);
      
      console.log(chalk.green(`\n城市实时天气`));
      console.log(chalk.green(`城市：${current.location.name}`));
      console.log(chalk.green(`天气：${current.now.name}`));
      console.log(chalk.green(`气温：${current.now.temperature}`));
      console.log(chalk.green(`体感温度：${current.now.feels_like}`));
      console.log(chalk.green(`湿度：${current.now.humidity}`));
      console.log(chalk.green(`风向/风力：${current.now.wind_direction}风  ${current.now.wind_scale}级\n`));
      
    }).catch(err => {
      console.log(err);
      
    })
  }
}