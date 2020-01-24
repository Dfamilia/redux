// const state = {}
let id = 0;

// se encarga de generar el estado de las tareas
function reducer(state=[], {type, payload}){
    
    switch (type) {

        // agrega un nuevo elemento a la lista de tareas
        case 'Agregar': {
            id++;
            // retorna un nuevo arreglo con las tareas del estado, ya que el estado es un arreglo y agrega una nueva tarea
            return [
                ...state,
                {
                    id,
                    text: payload.text,
                },
            ];

        }

        // borra una tarea de la lista de tareas
        case 'Borrar': {

            return state.filter(tarea => tarea.id !== payload.id )

        }

        // completa o no una tarea de la lista
        case 'Alternar': {
            
            const newState = state.map(tarea => {

                if(tarea.id === payload.id){
                    tarea.completado = !tarea.completado;
                }
                
                return tarea;
            });

            return newState;
        }
        
        // de no ser compatible ningun type de la action se retorna el estado y se cambia de function generadora
        default:
            return state;
    }

}

export default reducer;