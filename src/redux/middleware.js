/*
    el actions array guardara las acciones creadas cada vez que se
    invoque

*/
const actions = [];

const middleware = store => next => action =>{
    // const state = store.getState();
    console.log(action);
    //guardo cada nueva accion
    actions.push(action);

    //agrego y actualizo las acciones en el localstore cada vez que obtengo una nueva opcion
    localStorage.setItem('actions', JSON.stringify(actions));

    //permite que siga el flujo
    next(action);
    
}

export default middleware;