import store from './redux/store';

// obtengo los elementos del html, a travez del DOM
const itemListDom = $('#itemList');
const itemDom = $('#item');
const notaDom = $('#txtNuevaNota');

// se ejecuta por cada letra que pulsas en el teclado
notaDom.keyup((e)=>{

    // si la tecla que pulsas es igual a enter retorna la data del textbox
    if(e.keyCode === 13){
        const text = notaDom.val();
        // limpia el textbox despues de agregarlo a la lista de tareas
        notaDom.val('');

        store.dispatch({
            type: 'Agregar',
            payload:{
                text
            },
        });

    }
});


function actualizarLista(items){
    //cuando cambia el estado borro el contenido de la lista para listar la actualizada
    itemListDom.html('');

    for(const item of items){
        // clono itemDom cada vez que necesito crear una nueva tarea y busco las etiquetas que deceo procesar en cada clone
        const cloneItemDom = itemDom.clone();
        const chkHabilitadoDom = cloneItemDom.find('input');
        const btnBorrarDom = cloneItemDom.find('button');
        const lblNombreDom = cloneItemDom.find('span');

        //removeClass es de jquery
        cloneItemDom.removeClass('d-none');
        
        //agregando contenido al item template
        lblNombreDom.html(item.text);
        if(item.completado){
            lblNombreDom.css('text-decoration','line-through')
        }

        //evento que borra una tarea
        btnBorrarDom.on('click', ()=>{
            store.dispatch({
                type: 'Borrar',
                payload:{
                    id: item.id,
                },
            });
        });

        // si item.completado es true, la propiedad del input sera checked
        chkHabilitadoDom.prop('checked', item.completado);

        //evento que alterna si la tarea esta completada o no
        chkHabilitadoDom.on('click', ()=>{
            store.dispatch({
                type: 'Alternar',
                payload:{
                    id: item.id,
                },
            });
        })

        itemListDom.append(cloneItemDom);
    }

}

// se ejecuta cada que el estado sufre un cambio
store.subscribe(()=>{
    const state = store.getState();
    actualizarLista(state);
});

//extraer actiones desde el localStore
const actions = JSON.parse(localStorage.getItem('actions') || '')

//ejecuta las acciones guardadas dentro del localStore en un tiempo definido
//se ejecuta al reiniciar la pagina
actions.map((action, i)=>{
    setTimeout(()=>{
        store.dispatch(action);
    }, i * 1000);
});