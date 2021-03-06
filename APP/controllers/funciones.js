let funciones = {
    GetDataNit: async (idNit,idCliente,idDireccion)=>{
      let nit = document.getElementById(idNit).value;
      var data =JSON.stringify({
        nit: nit
      });
      var peticion = new Request('https://free.feel.com.gt/api/v1/obtener_contribuyente', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: data
      });
      const response = await fetch(peticion)
      const json = await response.json();
      document.getElementById(idCliente).value = json.descripcion;
      document.getElementById(idDireccion).value = json.direcciones.direccion;
    },
    fcnInicializarSmartPanels: (container)=>{
  
      /* Activate smart panels */
      /* These are the default settings, you can customize it per page as you need 
         Notice how we do not insert the init function inside DOM ready. Making it faster executed.
      */
      
      $(container).smartPanel(
      {
          localStorage: true,
          onChange: function() {},
          onSave: function() {},
          opacity: 1,
          deleteSettingsKey: '#deletesettingskey-options',
          settingsKeyLabel: 'Reset settings?',
          deletePositionKey: '#deletepositionkey-options',
          positionKeyLabel: 'Reset position?',
          sortable: true,
          buttonOrder: '%collapse% %fullscreen% %close%',
          buttonOrderDropdown: '%refresh% %locked% %color% %custom% %reset%',
          customButton: false,
          customButtonLabel: "Custom Button",
          onCustom: function() {},
          closeButton: true,
          onClosepanel: function()
          {
              if (myapp_config.debugState)
                  console.log($(this).closest(".panel").attr('id') + " onClosepanel")
          },
          fullscreenButton: true,
          onFullscreen: function()
          {
              if (myapp_config.debugState)
                  console.log($(this).closest(".panel").attr('id') + " onFullscreen")
          },
          collapseButton: true,
          onCollapse: function()
          {
              if (myapp_config.debugState)
                  console.log($(this).closest(".panel").attr('id') + " onCollapse")
          },
          lockedButton: true,
          lockedButtonLabel: "Lock Position",
          onLocked: function()
          {
              if (myapp_config.debugState)
                  console.log($(this).closest(".panel").attr('id') + " onLocked")
          },
          refreshButton: true,
          refreshButtonLabel: "Refresh Content",
          onRefresh: function()
          {
              if (myapp_config.debugState)
                  console.log($(this).closest(".panel").attr('id') + " onRefresh")
          },
          colorButton: true,
          colorButtonLabel: "Panel Style",
          onColor: function()
          {
              if (myapp_config.debugState)
                  console.log($(this).closest(".panel").attr('id') + " onColor")
          },
          panelColors: ['bg-primary-700 bg-success-gradient',
              'bg-primary-500 bg-info-gradient',
              'bg-primary-600 bg-primary-gradient',
              'bg-info-600 bg-primray-gradient',
              'bg-info-600 bg-info-gradient',
              'bg-info-700 bg-success-gradient',
              'bg-success-900 bg-info-gradient',
              'bg-success-700 bg-primary-gradient',
              'bg-success-600 bg-success-gradient',
              'bg-danger-900 bg-info-gradient',
              'bg-fusion-400 bg-fusion-gradient',
              'bg-faded'
          ],
          resetButton: true,
          resetButtonLabel: "Reset Panel",
          onReset: function()
          {
              if (myapp_config.debugState)
                  console.log($(this).closest(".panel").attr('id') + " onReset callback")
          }
      });
    },
    Confirmacion: function(msn){
        return swal({
            title: 'Confirme',
            text: msn,
            icon: 'warning',
            buttons: {
                cancel: true,
                confirm: true,
              }})
    },
    Aviso: function(msn){
        swal(msn, {
            timer: 1500,
            icon: "success",
            buttons: false
            });

        try {
            navigator.vibrate(500);
        } catch (error) {
            
        }
    },
    AvisoError: function(msn){
        swal(msn, {
            timer: 1500,
            icon: "error",
            buttons: false
            });
        try {
            navigator.vibrate([100,200,500]);
        } catch (error) {
            
        }
    },
    FiltrarListaProductos: function(idTabla){
        swal({
          text: 'Escriba para buscar...',
          content: "input",
          button: {
            text: "Buscar",
            closeModal: true,
          },
        })
        .then(name => {
          if (!name) throw null;
            funciones.FiltrarTabla(idTabla,name);

            //'tblProductosVentas'
        })
      },
    setMoneda: function(num,signo) {
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num)) num = "0";
        let sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        let cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10) cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
        return (((sign) ? '' : '-') + signo + ' ' + num + ((cents == "00") ? '' : '.' + cents)).toString();
    },
    loadScript: function(url, idContainer) {
        return new Promise((resolve, reject) => {
          var script = document.createElement('script');
          //script.async = true;
          script.src = url;
    
          script.onload = resolve;
          script.onerror = reject;
             
          document.getElementById(idContainer).appendChild(script)
        });
    },
    loadCss: function(url, idContainer) {
        return new Promise((resolve, reject) => {
          var link = document.createElement('link');
          //script.async = true;
          link.href = url;
          link.rel = "stylesheet"
    
          link.onload = resolve;
          link.onerror = reject;
             
          document.getElementById(idContainer).appendChild(link)
        });
    },

    fetchData: (url)=>{
        fetch(url)
            .then(function(response) {
                return response.json();
                                    })
            .catch();
    },

    loadView: (url, idContainer)=> {
        return new Promise((resolve, reject) => {
            
            let contenedor = document.getElementById(idContainer);

            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'text';
            xhr.onload = function(e) {
      
              if (this.status == 200) {
                               
                var view = xhr.response;
                contenedor.innerHTML ='';
                contenedor.innerHTML = view;
                
                resolve();
      
              } else {
      
                reject();
      
              }
            }
      
            xhr.send();
      
          });
    },
    hablar: function(msn){
        var utterance = new SpeechSynthesisUtterance(msn);
        return window.speechSynthesis.speak(utterance); 
    },

    CompaniaTelefono: function(numero,hablado){
        var rangos = [[30000000,32289999,"TIGO"],
        [32290000,32299999,"CLARO"],
        [32300000,33099999,"TIGO"],
        [34000000,34499999,"MOVISTAR"],
        [40000000,40999999,"TIGO"],
        [41000000,42999999,"CLARO"],
        [43000000,44759999,"MOVISTAR"],
        [44760000,46999999,"TIGO"],
        [47000000,47729999,"CLARO"],
        [47730000,48199999,"TIGO"],
        [48200000,48219999,"UNITEL"],
        [48220000,50099999,"TIGO"],
        [50100000,50199999,"CLARO"],
        [50200000,50299999,"MOVISTAR"],
        [50300000,50699999,"TIGO"],
        [50700000,51099999,"MOVISTAR"],
        [51100000,51399999,"CLARO"],
        [51400000,51499999,"MOVISTAR"],
        [51500000,51999999,"TIGO"],
        [52000000,52099999,"TIGO"],
        [52100000,52999999,"MOVISTAR"],
        [53000000,53099999,"TIGO"],
        [53100000,53119999,"CLARO"],
        [53120000,53139999,"MOVISTAR"],
        [53140000,53899999,"TIGO"],
        [53900000,54099999,"MOVISTAR"],
        [54100000,54999999,"CLARO"],
        [55000000,55099999,"MOVISTAR"],
        [55100000,55179999,"CLARO"],
        [55180000,55199999,"MOVISTAR"],
        [55210000,55299999,"TIGO"],
        [55310000,55399999,"CLARO"],
        [55400000,55429999,"MOVISTAR"],
        [55430000,55449999,"CLARO"],
        [55450000,55499999,"MOVISTAR"],
        [55500000,55539999,"TIGO"],
        [55540000,55799999,"CLARO"],
        [55800000,55819999,"TIGO"],
        [55820000,55999999,"CLARO"],
        [56000000,56089999,"MOVISTAR"],
        [56100000,56399999,"CLARO"],
        [56400000,56899999,"MOVISTAR"],
        [56900000,56999999,"CLARO"],
        [57000000,57099999,"TIGO"],
        [57100000,57189999,"CLARO"],
        [57190000,57899999,"TIGO"],
        [57900000,57999999,"MOVISTAR"],
        [58000000,58099999,"TIGO"],
        [58100000,58189999,"CLARO"],
        [58190000,58199999,"TIGO"],
        [58200000,58799999,"CLARO"],
        [58800000,59099999,"TIGO"],
        [59100000,59149999,"CLARO"],
        [59150000,59179999,"MOVISTAR"],
        [59180000,59199999,"TIGO"],
        [59200000,59899999,"CLARO"],
        [59900000,59999999,"TIGO"]],

    lengthRangos = rangos.length;

    var num = numero;
    let len = num.length; 
    let nnum = parseInt(num,10);
    let found;

    if (len == 8 ) {
    for (var i = lengthRangos - 1; i >= 0; i--) {
    if (rangos[i][0] <= nnum && nnum <= rangos[i][1]) {
        if (hablado=='SI'){     
            funciones.hablar("Su línea telefónica es " + rangos[i][2]);
        }else{
            return rangos[i][2];
        }
        found = true;
    }
    };

    if (!found) {
    if (hablado=='SI'){ 
        funciones.hablar("El número indicado no aparece en la lista");
    }else{
        return "No Disponible";
    }
    }

    } else {
    return "Ingrese 8 dígitos";
    }
 },

 crearBusquedaTabla: function(idTabla,idBusqueda){
    var tableReg = document.getElementById(idTabla);
    var searchText = document.getElementById(idBusqueda).value.toLowerCase();
      var cellsOfRow="";
      var found=false;
      var compareWith="";
   
      // Recorremos todas las filas con contenido de la tabla
        for (var i = 1; i < tableReg.rows.length; i++)
                {
                  cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
                    found = false;
                    // Recorremos todas las celdas
                    for (var j = 0; j < cellsOfRow.length && !found; j++)
                    {
                      compareWith = cellsOfRow[j].innerHTML.toLowerCase();
                      // Buscamos el texto en el contenido de la celda
                      if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1))
                      {
                          found = true;
                      }
                  }
                  if(found)
                  {
                      tableReg.rows[i].style.display = '';
                  } else {
                      // si no ha encontrado ninguna coincidencia, esconde la
                      // fila de la tabla
                      tableReg.rows[i].style.display = 'none';
                  }
              }
  },

  FiltrarTabla: function(idTabla,idfiltro){
    var tableReg = document.getElementById(idTabla);
    let filtro = document.getElementById(idfiltro).value;

    var searchText = filtro.toLowerCase();
      var cellsOfRow="";
      var found=false;
      var compareWith="";
   
      // Recorremos todas las filas con contenido de la tabla
        for (var i = 1; i < tableReg.rows.length; i++)
                {
                  cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
                    found = false;
                    // Recorremos todas las celdas
                    for (var j = 0; j < cellsOfRow.length && !found; j++)
                    {
                      compareWith = cellsOfRow[j].innerHTML.toLowerCase();
                      // Buscamos el texto en el contenido de la celda
                      if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1))
                      {
                          found = true;
                      }
                  }
                  if(found)
                  {
                      tableReg.rows[i].style.display = '';
                  } else {
                      // si no ha encontrado ninguna coincidencia, esconde la
                      // fila de la tabla
                      tableReg.rows[i].style.display = 'none';
                  }
              }
        //funciones.scrollUp(1000, 'easing');
  },

  OcultarRows: function(idTabla){
    var tableReg = document.getElementById(idTabla);
        // Recorremos todas las filas con contenido de la tabla
        for (var i = 1; i < tableReg.rows.length; i++)
        {
            if(i>15){
                tableReg.rows[i].style.display = 'none';
            }
        }
  },

  PingInternet: async (url)=>{
    var peticion = new Request(url, {
        method: 'POST',
        headers: new Headers({
            // Encabezados
           'Content-Type': 'application/json'
        })
      });

      await fetch(peticion)
         .then(function(res) {
           if (res.status==200)
               {
                   funciones.hablar('parece que ya hay internet');
                }
      })
      .catch(
          ()=>{
            funciones.hablar('por lo visto no hay señal');
          }
      )
  },

  NotificacionPersistent : (titulo,msn)=>{

    function InicializarServiceWorkerNotif(){
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () =>
       navigator.serviceWorker.register('sw.js')
        .then(registration => console.log('Service Worker registered'))
        .catch(err => 'SW registration failed'));
      };
      
      requestPermission();
    }
    
    if ('Notification' in window) {};
    
    function requestPermission() {
      if (!('Notification' in window)) {
        alert('Notification API not supported!');
        return;
      }
      
      Notification.requestPermission(function (result) {
        //$status.innerText = result;
      });
    }

    InicializarServiceWorkerNotif();
    
    const options = {
        body : titulo,
        icon: "../favicon.png",
        vibrate: [1,2,3],
      }
      //image: "../favicon.png",
         if (!('Notification' in window) || !('ServiceWorkerRegistration' in window)) {
          console.log('Persistent Notification API not supported!');
          return;
        }
        
        try {
          navigator.serviceWorker.getRegistration()
            .then(reg => 
                    reg.showNotification(msn, options)
                )
            .catch(err => console.log('Service Worker registration error: ' + err));
        } catch (err) {
          console.log('Notification API error: ' + err);
        }
      
  },
  ObtenerUbicacion: async(idlat,idlong)=>{
    let lat = document.getElementById(idlat);
    let long = document.getElementById(idlong);
    
    try {
        navigator.geolocation.getCurrentPosition(function (location) {
            lat.innerText = location.coords.latitude.toString();
            long.innerText = location.coords.longitude.toString();
        })
    } catch (error) {
        funciones.AvisoError(error.toString());
    }
  }
};