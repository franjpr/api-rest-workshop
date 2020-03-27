import {
    addCarRows,
    retrieveCarId,
    populateEditCarForm,
    retrieveCarForm,
    cleanTable,
} from './uiHelpers';
import {
    getAllCars,
    getCarById,
    addCar
} from './API/carsApi.double';
import { getAllCarsWithAxios, getCarByIdWithAxios, addCarWithAxios } from './API/carsApi';

document.addEventListener('DOMContentLoaded', () => {

    ///////////////////////////
    // Load data by axios    //
    ///////////////////////////
    const buttonLoadCarsAxios = document.getElementById('loadcarsaxios');
    const buttonLoadCarAxios = document.getElementById('loadcaraxios');
    const buttonAddCarAxios = document.getElementById('addaxios');

    buttonLoadCarsAxios.addEventListener('click', (event) => {
        event.stopPropagation();
        cleanTable('cars-table');
        getAllCarsWithAxios().then(allCarsSuccessHandler).catch(errorHandler);
    });

    buttonLoadCarAxios.addEventListener('click', (event) => {
        event.stopPropagation();
        const carId = retrieveCarId();
        getCarByIdWithAxios(carId).then(singleCarSuccessHandler).catch(errorHandler);
    });

    buttonAddCarAxios.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        const car = retrieveCarForm();
        addCarWithAxios(car).then(_ => {
            buttonLoadCarsAxios.click();
        });
    });

    ///////////////////////////
    // Load data by default  //
    ///////////////////////////
    const buttonLoadCars = document.getElementById('loadcars');
    const buttonLoadCar = document.getElementById('loadcar');
    const buttonAddCar = document.getElementById('add');

    buttonLoadCars.addEventListener('click', (event) => {
        event.stopPropagation();
        cleanTable('cars-table');
        getAllCars().then((result) => {
            addCarRows(result, 'cars-table');
        });
    });

    buttonLoadCar.addEventListener('click', (event) => {
        event.stopPropagation();
        const carId = retrieveCarId();
        getCarById(carId)
            .then((r) => populateEditCarForm(r));
    });

    buttonAddCar.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        const car = retrieveCarForm();
        addCar(car)
            .then((_) => {
                cleanTable('cars-table');
                return getAllCars();
            })
            .then((result) => {
                addCarRows(result, 'cars-table');
            });
    });
});


const allCarsSuccessHandler = ({ data }) => {
    addCarRows(data, 'cars-table');
}

const singleCarSuccessHandler = ({ data }) => {
    populateEditCarForm(data);
}

const errorHandler = (err) => {
    console.warn("Error -> ", err);
    return [];
}