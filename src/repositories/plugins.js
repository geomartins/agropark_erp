import { Notify, Loading, LoadingBar, LocalStorage, Dialog } from 'quasar'

const snackbar = (type, message, position='bottom-right') => {

    if(type == 'warning'){
        Notify.create({
            type: 'negative',
            position: position,
            message: message,
            timeout: 10000,
            textColor: 'white',
            color: 'red',
            actions: [{  color: 'white' }]

        })
    }

    if(type == 'success'){
        Notify.create({
            type: 'positive',
            position: position,
            message: message,
            timeout: 10000,
            textColor: 'white',
            color: 'green',
            actions: [{  color: 'white' }]

        })
    }   

}

const showLoading = (message) => {
    Loading.show({
        message: message
    });
}

const hideLoading = () => {
    Loading.hide();
}


const showLoadingBar = () => {
    LoadingBar.start();
}
const hideLoadingBar = () => {
    LoadingBar.stop()
}
const setData = (key, value) => {
    LocalStorage.set(key, value);
}

const getData = (key) => {
    LocalStorage.getItem(key);
}

const confirm = async (title, message) => {
    return Dialog.create({
        title: title,
        message: message,
        cancel: true,
        persistent: true
      }).onOk(() => {
        return true
      }).onOk(() => {
        return true;
      }).onCancel(() => {
        return false;
      }).onDismiss(() => {
        return false;
    });

}



export {
    snackbar,
    showLoading,
    hideLoading,
    showLoadingBar,
    hideLoadingBar,
    setData,
    getData,
    confirm,
}