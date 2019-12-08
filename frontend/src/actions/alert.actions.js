import {
    NOTIFICATION_TYPE_SUCCESS, 
    NOTIFICATION_TYPE_WARNING,
    NOTIFICATION_TYPE_INFO,
    NOTIFICATION_TYPE_ERROR
} from 'react-redux-notify';

export const alertActions = {
    success,
    warning,
    info,
    error
};

function success(message) {
    return { 
      type: NOTIFICATION_TYPE_SUCCESS,
      message: message,
      duration: 2000,
      canDismiss: true
    };
}

function warning(message) {
    return { 
      type: NOTIFICATION_TYPE_WARNING,
      message: message,      
      duration: 2000,
      canDismiss: true
    };
}

function info(message) {
    return { 
      type: NOTIFICATION_TYPE_INFO,
      message: message,      
      duration: 2000,
      canDismiss: true
    };
}

function error(message) {
    return { 
      type: NOTIFICATION_TYPE_ERROR,
      message: message,      
      duration: 2000,
      canDismiss: true
    };
}