import { Notify, Loading, LoadingBar, LocalStorage, Dialog, exportFile } from 'quasar'

const snackbar = (type, message, position='bottom-right') => {

    if(type == 'warning'){
        if( Array.isArray(message)){
            for(var mes of message){
                Notify.create({
                    type: 'negative',
                    position: position,
                    message: mes,
                    timeout: 10000,
                    textColor: 'white',
                    color: 'red',
                    actions: [{  color: 'white' }]
        
                })
            }
        }else{
            Notify.create({
                type: 'negative',
                position: position,
                message: message,
                timeout: 10000,
                textColor: 'white',
                color: 'red',
                actions: [{  color: 'white' }]
    
            })

            if(message.includes('permission-denied')){
               window.history.back();
            }
        }
        
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


const fcmSnackbar = (title, description) => {
      Notify.create({
        // type: 'positive',
        message: title,
        caption: description,
        icon: 'tag_faces',
        position: 'top-right',
        // color: 'primary',
        //avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
        actions: [
          { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
        ]

    })

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
    return LocalStorage.getItem(key);
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


const  wrapCsvValue = (val, formatFn) =>{
    let formatted = formatFn !== void 0
      ? formatFn(val)
      : val
  
    formatted = formatted === void 0 || formatted === null
      ? ''
      : String(formatted)
  
    formatted = formatted.split('"').join('""')
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')
  
    return `"${formatted}"`
  }

 const  exportTable = (columns, data, name) => {
    // naive encoding to csv format
    const content = [ columns.map(col =>  wrapCsvValue(col.label)) ].concat(
      data.map(row => columns.map(col => wrapCsvValue(
        typeof col.field === 'function'
          ? col.field(row)
          : row[col.field === void 0 ? col.name : col.field],
        col.format
      )).join(','))
    ).join('\r\n')

    const status = exportFile(
        `${name}.csv`,
      content,
      'text/csv'
    )

    if (status !== true) {
        snackbar('warning','Browser denied file download...' )
    }
  }
  



export {
    snackbar,
    fcmSnackbar,
    showLoading,
    hideLoading,
    showLoadingBar,
    hideLoadingBar,
    setData,
    getData,
    confirm,
    exportTable
}