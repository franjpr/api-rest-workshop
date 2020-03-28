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
import { getAllCarsWithAxios, getCarByIdWithAxios, addCarWithAxios, } from './API/carsApiWithAxios';
import { getAllCarsWithFetch, getCarByIdWithFetch, addCarWithFetch } from './API/carsApiWithFetch'
import { authenticate } from './API/authApi';


document.addEventListener('DOMContentLoaded', () => {

    let authToken = '';

    ///////////////////////////
    // Authentication        //
    ///////////////////////////
    const createTokenBtn = document.getElementById('createToken');
    const clearTokenBtn = document.getElementById('clearToken');

    createTokenBtn.addEventListener('click', event => {
        const userpassword = {
            username: 'admin',
            password: 'admin'
        };

        authenticate(userpassword).then(({ access_token }) => {
            authToken = access_token;
        }).catch(console.warn)
    });

    clearTokenBtn.addEventListener('click', event => {
        authToken = '';
    });

    ///////////////////////////
    // Load data with fetch  //
    ///////////////////////////
    const buttonLoadCarsFetch = document.getElementById('loadcarsfetch');
    const buttonLoadCarFetch = document.getElementById('loadcarfetch');
    const buttonAddCarFetch = document.getElementById('addfetch');

    buttonLoadCarsFetch.addEventListener('click', (event) => {
        event.stopPropagation();
        cleanTable('cars-table');
        getAllCarsWithFetch(authToken).then(readBodyAsJson).then(allCarsSuccessHandlerFetch).catch(errorHandler);
    });

    buttonLoadCarFetch.addEventListener('click', (event) => {
        event.stopPropagation();
        const carId = retrieveCarId();
        getCarByIdWithFetch(carId, authToken).then(readBodyAsJson).then(singleCarSuccessHandlerFetch).catch(errorHandler);
    });

    buttonAddCarFetch.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        const car = retrieveCarForm();
        addCarWithFetch(car, authToken).then(_ => {
            buttonLoadCarsFetch.click();
        });
    });

    ///////////////////////////
    // Load data with axios  //
    ///////////////////////////
    const buttonLoadCarsAxios = document.getElementById('loadcarsaxios');
    const buttonLoadCarAxios = document.getElementById('loadcaraxios');
    const buttonAddCarAxios = document.getElementById('addaxios');

    buttonLoadCarsAxios.addEventListener('click', (event) => {
        event.stopPropagation();
        cleanTable('cars-table');
        getAllCarsWithAxios(authToken).then(allCarsSuccessHandlerAxios).catch(errorHandler);
    });

    buttonLoadCarAxios.addEventListener('click', (event) => {
        event.stopPropagation();
        const carId = retrieveCarId();
        getCarByIdWithAxios(carId, authToken).then(singleCarSuccessHandlerAxios).catch(errorHandler);
    });

    buttonAddCarAxios.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        const car = retrieveCarForm();
        addCarWithAxios(car, authToken).then(_ => {
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


// Axios handlers
const allCarsSuccessHandlerAxios = ({ data }) => {
    addCarRows(data, 'cars-table');
}

const singleCarSuccessHandlerAxios = ({ data }) => {
    populateEditCarForm(data);
}

// Fetch handlers
const allCarsSuccessHandlerFetch = (data) => {
    addCarRows(data, 'cars-table');
}

const singleCarSuccessHandlerFetch = (data) => {
    populateEditCarForm(data);
}

const readBodyAsJson = (response) => response.json();


// Error handler
const errorHandler = (err) => {
    alert(err);
    return [];
}