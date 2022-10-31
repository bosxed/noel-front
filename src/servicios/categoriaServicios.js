const categorias = [
    {
        nombre :"Galletas",
        descripcion :"Todo lo realacionado con las galletas ",
        estado :"SI",
        imagen :"https://cdn.pixabay.com/photo/2017/07/28/14/29/macarons-2548827_960_720.jpg",
    },
    {
        nombre :"Chocolate",
        descripcion :"Todo lo realacionado con la chocolateria ",
        estado :"NO",
        imagen :"https://cdn.pixabay.com/photo/2017/02/11/14/19/valentines-day-2057745_960_720.jpg",
    },
    {
        nombre :"Paquetes",
        descripcion :"Todo lo realacionado con los paquetes (papas, platanos,etc...)",
        estado :"SI",
        imagen :"https://cdn.pixabay.com/photo/2020/10/15/18/18/chips-5657633_960_720.jpg",
    },
    {
        nombre :"Panaderia",
        descripcion :"Todo lo realacionado con panaderia",
        estado :"SI",
        imagen :"https://cdn.pixabay.com/photo/2013/04/07/21/30/bread-101636_960_720.jpg",
    },



]
const categoriaServicios  = {};


categoriaServicios.obtenerCategorias =  () => {
    return  categorias;
};

export default categoriaServicios;