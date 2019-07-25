# Logger for NodeJs
Provides simple wrapper above console.log with abolity to pretty log strings with dates into file

# Usage
## Init
```
let Logger = require('istorm_logger').init('i18z_backend.log','debug');
```
First parameter - log file name (folder _logs_ will be created in app directory)
Second parameter - if set to _'debug'_ Logger.debug() will be logged

## Calls
```
Logger.success(...messages)
Logger.err(...messages)
Logger.warn(...messages)
Logger.dbg(...messages)
Logger.log(...messages)
```

## Examples

[![console](https://c.imge.to/2019/07/25/ZoWbk.png)](https://imge.to/i/ZoWbk)

[![logfile](https://a.imge.to/2019/07/25/Zoeis.png)](https://imge.to/i/Zoeis)

