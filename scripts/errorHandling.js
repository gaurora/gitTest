// register the interceptor as a service
var SKILL=SKILL || {};


SKILL.errorResponse= function(statusCode) {
    'use strict';  
                switch (statusCode) {
                    case 404:
                    case 500:
                        alert(statusCode);
                        break;
                }
    };
