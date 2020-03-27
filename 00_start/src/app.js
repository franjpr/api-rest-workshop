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
import { getAllCarsWithAxios, getCarByIdWithAxios, addCarWithAxios, getAllCarsWithFetch, getCarByIdWithFetch, addCarWithFetch } from './API/carsApi';

document.addEventListener('DOMContentLoaded', () => {

    ///////////////////////////
    // Load data by fetch    //
    ///////////////////////////
    const buttonLoadCarsFetch = document.getElementById('loadcarsfetch');
    const buttonLoadCarFetch = document.getElementById('loadcarfetch');
    const buttonAddCarFetch = document.getElementById('addfetch');

    buttonLoadCarsFetch.addEventListener('click', (event) => {
        event.stopPropagation();
        cleanTable('cars-table');
        getAllCarsWithFetch().then(readBodyAsJson).then(allCarsSuccessHandlerFetch).catch(errorHandler);
    });

    buttonLoadCarFetch.addEventListener('click', (event) => {
        event.stopPropagation();
        const carId = retrieveCarId();
        getCarByIdWithFetch(carId).then(readBodyAsJson).then(singleCarSuccessHandlerFetch).catch(errorHandler);
    });

    buttonAddCarFetch.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        const car = retrieveCarForm();
        addCarWithFetch(car).then(_ => {
            buttonLoadCarsAxios.click();
        });
    });

    ///////////////////////////
    // Load data by axios    //
    ///////////////////////////
    const buttonLoadCarsAxios = document.getElementById('loadcarsaxios');
    const buttonLoadCarAxios = document.getElementById('loadcaraxios');
    const buttonAddCarAxios = document.getElementById('addaxios');

    buttonLoadCarsAxios.addEventListener('click', (event) => {
        event.stopPropagation();
        cleanTable('cars-table');
        getAllCarsWithAxios().then(allCarsSuccessHandlerAxios).catch(errorHandler);
    });

    buttonLoadCarAxios.addEventListener('click', (event) => {
        event.stopPropagation();
        const carId = retrieveCarId();
        getCarByIdWithAxios(carId).then(singleCarSuccessHandlerAxios).catch(errorHandler);
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


const allCarsSuccessHandlerAxios = ({ data }) => {
    addCarRows(data, 'cars-table');
}

const singleCarSuccessHandlerAxios = ({ data }) => {
    populateEditCarForm(data);
}


const allCarsSuccessHandlerFetch = (data) => {
    addCarRows(data, 'cars-table');
}

const singleCarSuccessHandlerFetch = (data) => {
    populateEditCarForm(data);
}

const readBodyAsJson = (response) => response.json();

const errorHandler = (err) => {
    console.warn("Error -> ", err);
    return [];
}