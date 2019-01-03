#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const {threeDaysWeather, realTimeWeather} = require('../src');

/**
 * 查询逻辑
 * 1.城市实时
 * 2.城市3日
 */

program
  .version(pkg.version, '-v, --version')
  .usage('[command][options]')
  .option('-u, --update', 'update weather-cli')
  .description(pkg.description);


// program.on('--help', function () {
//   console.log('test')
// })

// 任何城市某日天气
program
  .command('find [cityName]')
  .alias('f')
  .description('查询任何城市天气\n 选项:\n -n, --now   城市实时数据\n -m, --muitl 城市三日数据\n 例如: weather 上海\n')
  .option('-n, --now', '城市实时天气数据')
  .option('-m, --muitl', '城市实时天气数据')
  .action((cityName, options) => {
    
    if (cityName && (options.now || options.muitl)) {
      if (options.now) {
        realTimeWeather(cityName)
      }
      if (options.muitl) {
        threeDaysWeather(cityName);
      }
    }
    
  });



// 当前年城市 昨天 今天 明天
program
  .command('local [date]')
  .alias('l')
  .description('查询当前城市的三日内天气\n 例如: weather local today')
  .action(date => {
    console.log(date);
    localThreeDays(date)
    
  })

// 解析命令行参数，否则无法读取参数
program.parse(process.argv);