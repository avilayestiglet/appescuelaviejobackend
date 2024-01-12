const winston = require('winston');
const chalk = require('chalk');
const path = require('path');
const { json } = require('express');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label', 'line'] }),
    winston.format.printf(info => {
      const { timestamp, level, message, label, line } = info;
      const labelColor = getColor(label);
      const levelColor = getLevelColor(level);
      const time = formattedDate(timestamp);

      return `${chalk.gray(`[${time}]`)} ${levelColor(`[${level.toUpperCase()}]`)} ${chalk.yellowBright(message.message)} ${chalk.greenBright(`(${line})`)}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

function getLogger (callingModule) {
  const { label } = callingModule;
  return {
    info: (message) => {
      logger.info(message, { label, line: getLineNumber() });
    },
    warn: (message) => {
      logger.warn(message, { label, line: getLineNumber() });
    },
    error: (message) => {
      logger.error(message, { label, line: getLineNumber() });
    },
  };
}

function getLineNumber () {
  const stackTrace = new Error().stack;
  const firstLine = stackTrace.split('\n')[3];
  return firstLine.substring(firstLine.lastIndexOf(path.sep) + 1, firstLine.length - 1);
}

function getColor (label) {
  switch (label) {
    case 'server':
      return chalk.green;
    case 'database':
      return chalk.magenta;
    default:
      return chalk.yellow;
  }
}

function getLevelColor (level) {
  switch (level) {
    case 'error':
      return chalk.red.bold;
    case 'warn':
      return chalk.yellow.bold;
    case 'info':
      return chalk.green.bold;
    case 'debug':
      return chalk.blue.bold;
    default:
      return chalk.white.bold;
  }
}

function formattedDate(date){
    const fecha = new Date(date);
    const opciones = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
    const fechaFormateada = fecha.toLocaleString('es-VE', opciones);
    return fechaFormateada;
}

module.exports = getLogger;