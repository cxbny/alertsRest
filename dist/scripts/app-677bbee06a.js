!function(){"use strict";angular.module("app",["ngAnimate","ngTouch","ui.router","ui.bootstrap"])}(),function(){"use strict";function t(t){function e(){return t.get(s).then(function(t){return r=t.data})}function n(e){var n={text:e};return t.post(s,n).then(function(t){return r=t.data})}function l(e){return t["delete"](s+"/"+e).then(function(t){return r=t.data})}function a(e){var n={id:e.id,text:e.text};return t.put(s+"/"+e.id,n).then(function(t){return r=t.data})}var r=[],s="https://guarded-beach-57622.herokuapp.com/api/v1/alertsType",i={getAlertsType:e,addAlertsType:n,deleteAlertsType:l,editAlertsType:a};return i}t.$inject=["$http"],angular.module("app").factory("AlertsTypeService",t)}(),function(){"use strict";function t(t){function e(){return t.get(a).then(function(t){return l=t.data})}function n(e){var n={alertType:e};return t.post(a,n).then(function(t){return l=t.data})}var l=[],a="https://guarded-beach-57622.herokuapp.com/api/v1/alerts",r={getAlerts:e,addAlerts:n};return r}t.$inject=["$http"],angular.module("app").factory("AlertsService",t)}(),function(){function t(t,e){this.$timeout=e,this.$document=t,this.editing=this.editing||!1,this.text=this.text||"",this.text.length&&this.focus()}t.$inject=["$document","$timeout"],angular.module("app").component("alertsTypeTextInput",{templateUrl:"app/components/AlertsTypeTextInput.html",controller:t,bindings:{onSave:"&",placeholder:"@",newAlertsType:"@",editing:"@",text:"<"}}),t.prototype={handleBlur:function(){this.newAlertsType||this.onSave({text:this.text})},handleSubmit:function(t){13===t.keyCode&&(this.onSave({text:this.text}),this.newAlertsType&&(this.text=""))},focus:function(){this.$timeout(function(){var t=angular.element(".editing .textInput");t&&t.focus()},0)}}}(),function(){function t(){this.editing=!1}angular.module("app").component("alertsTypeItem",{templateUrl:"app/components/AlertsTypeItem.html",controller:t,bindings:{alertsType:"<",onDestroy:"&",onSave:"&"}}),t.prototype={handleDoubleClick:function(){this.editing=!0},handleSave:function(t){this.onSave({type:{text:t,id:this.alertsType.id}}),this.editing=!1},handleDestroy:function(t){this.onDestroy({id:t})}}}(),function(){"use strict";angular.module("app").component("main",{templateUrl:"app/main.html"})}(),function(){"use strict";function t(t){var e=this;t.getAlertsType().then(function(t){e.lstAlertsType=t}),this.handleSave=function(n){t.addAlertsType(n).then(function(t){e.lstAlertsType=t})},this.handleUpdate=function(n){t.editAlertsType(n).then(function(t){e.lstAlertsType=t})},this.handleDestroy=function(n){t.deleteAlertsType(n).then(function(t){e.lstAlertsType=t})}}t.$inject=["AlertsTypeService"],angular.module("app").component("alertsType",{templateUrl:"app/alertsType.html",controller:t})}(),function(){"use strict";function t(t,e,n){function l(e,n){this.items=n,this.ok=function(n){t.addAlerts(n.text).then(function(t){a.lstAlerts=t}),e.close()},this.cancel=function(){e.dismiss("cancel")}}l.$inject=["$uibModalInstance","items"];var a=this;t.getAlerts().then(function(t){a.lstAlerts=t}),e.getAlertsType().then(function(t){a.lstAlertsType=t}),this.createNew=function(){var t=n.open({templateUrl:"app/components/createAlertsModal.html",controller:l,controllerAs:"$ctrl",resolve:{items:function(){return a.lstAlertsType}}});t.result.then(function(t){},function(){})}}t.$inject=["AlertsService","AlertsTypeService","$uibModal"],angular.module("app").component("alerts",{templateUrl:"app/alerts.html",controller:t})}(),angular.module("app").run(["$templateCache",function(t){t.put("app/alerts.html",'<div class="container">\n  <h4>All alerts in the system</h4>\n\n  <button type="button" class="btn btn-primary pull-right" ng-click="$ctrl.createNew()">\n    Create New\n  </button>\n\n  <table class="table">\n    <thead class="thead-default">\n      <tr>\n        <th>#</th>\n        <th>Alert Type</th>\n        <th>Created</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr ng-repeat="alert in $ctrl.lstAlerts">\n        <th scope="row">{{ alert.id }}</th>\n        <td>{{ alert.alertType }}</td>\n        <td>{{ alert.created }}</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n'),t.put("app/alertsType.html",'<div class="container">\n  <div class="row">\n    <alerts-type-text-input new-alerts-type="true" on-save="$ctrl.handleSave(text)" placeholder="Add new alerts type">\n    </alerts-type-text-input>\n  </div>\n  <div class="row">\n    <div class="col-md-12">\n      <ul class="alerts-type-list">\n        <alerts-type-item ng-repeat="alertsType in $ctrl.lstAlertsType" alerts-type="alertsType" on-destroy="$ctrl.handleDestroy(id)" on-save="$ctrl.handleUpdate(type)">\n        </alerts-type-item>\n      </ul>\n    </div>\n  </div>\n</div>\n'),t.put("app/main.html",'<nav class="navbar navbar-default" role="navigator">\n  <div class="container">\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class="navbar-header">\n      <button type="button" class="navbar-toggle">\n        <span class="sr-only">Toggle navigation</span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n      <a class="navbar-brand" href="#">Alerts Management System</a>\n    </div>\n\n    <ul class="nav navbar-nav">\n      <li ui-sref-active="active"><a ui-sref="main.alertsType">Alerts Type</a></li>\n      <li ui-sref-active="active"><a ui-sref="main.alerts">Alerts</a></li>\n    </ul>\n  </div>\n</nav>\n\n<div ui-view></div>\n'),t.put("app/components/AlertsTypeItem.html",'<li ng-class="{ \'editing\': $ctrl.editing }">\n  <alerts-type-text-input ng-if="$ctrl.editing" new-alerts-type="false" text="$ctrl.alertsType.text" editing="$ctrl.editing" on-save="$ctrl.handleSave(text)">\n  </alerts-type-text-input>\n  <div class="view" ng-if="!$ctrl.editing">\n    <label ng-dblclick="$ctrl.handleDoubleClick()">{{$ctrl.alertsType.text}}</label>\n    <button class="destroy" ng-click="$ctrl.handleDestroy($ctrl.alertsType.id)"></button>\n  </div>\n</li>\n'),t.put("app/components/AlertsTypeTextInput.html",'<input class="textInput" ng-class="{\'edit\': $ctrl.editing, \'new-alerts-type\': $ctrl.newAlertsType}" ng-model="$ctrl.text" ng-keypress="$ctrl.handleSubmit($event)" ng-blur="$ctrl.handleBlur()" placeholder="{{$ctrl.placeholder}}" type="text">\n'),t.put("app/components/createAlertsModal.html",'<div class="modal-header">\n  <h3 class="modal-title" id="modal-title">Create a new alerts</h3>\n</div>\n<div class="modal-body" id="modal-body">\n  <form>\n    <div class="form-group">\n      <label for="exampleInputEmail1">Alerts Type</label>\n      <select class="form-control" ng-model="selectedAlert" ng-options="choice.text for choice in $ctrl.items">\n      </select>\n    </div>\n  </form>\n</div>\n<div class="modal-footer">\n  <button class="btn btn-primary" type="button" ng-click="$ctrl.ok(selectedAlert)">Create Alert</button>\n  <button class="btn btn-warning" type="button" ng-click="$ctrl.cancel()">Cancel</button>\n</div>\n')}]),function(){"use strict";function t(t,e,n){n.html5Mode(!0).hashPrefix("!"),e.otherwise("/"),t.state("main",{url:"/",component:"main"}).state("main.alertsType",{url:"alertsType",component:"alertsType"}).state("main.alerts",{url:"alerts",component:"alerts"})}t.$inject=["$stateProvider","$urlRouterProvider","$locationProvider"],angular.module("app").config(t)}();
//# sourceMappingURL=../maps/scripts/app-677bbee06a.js.map