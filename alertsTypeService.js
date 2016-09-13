var fsp = require('fs-promise');
var fs = require('fs');

var AlertsTypeService = function () {};

AlertsTypeService.prototype.getAll = function () {
  return fsp.readFile( __dirname + '/model/alertsType.json', 'utf8');
};

// AlertsTypeService.prototype.create = function (text) {
//
//   fs.readFileSync( __dirname + '/model/alertsType.json', 'utf8', function (err, data) {
//     data = JSON.parse( data );
//
//     // New alerts type setup
//     var lastId = (data.length === 0 ? 0 : data[data.length - 1].id);
//     data.push({
//       "id": lastId + 1,
//       "text": req.body.text
//     });
//
//     fs.writeFileSync(__dirname + '/model/alertsType.json', JSON.stringify(data), 'utf8', function(err) {
//       if (err) throw err;
//       console.log('data is saved --- ' + JSON.stringify(data));
//     });
//
//     return JSON.stringify(data);
//   });
//
// };

module.exports = new AlertsTypeService();
