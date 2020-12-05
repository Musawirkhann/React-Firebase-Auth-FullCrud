import firebase from '../helpers/db';
import Customer from '../models/customer';


const firestore = firebase.firestore();

export const getCustomers = async () => {
    try {
        const response = await firestore.collection('customers');
        const data = await response.get();
        let array = [];
        data.forEach(doc => {
            const customer = new Customer(
                doc.id,
                doc.data().firstname,
                doc.data().lastname,
                doc.data().phonenumber,
                doc.data().maritalstatus,
                doc.data().gender,
                doc.data().postcode,
                doc.data().city
            );

            array.push(customer);
        });
        return array;
    } catch (error) {
        throw error;
    }
}

export const addCustomer = async (customer) => {
    try {
        await firestore.collection('customers').doc().set(customer);
    } catch (error) {
        throw error;
    }
}

export const getCustomer = async (id) => {
    try {
        const customer = await firestore.collection('customers').doc(id);
        const data = await customer.get();
        return data.data();
    } catch (error) {
        throw error;
    }
}

export const updateCustomer = async (id, data) => {
    try {
        const customer = await firestore.collection('customers').doc(id);
        await customer.update(data)
    } catch (error) {
        throw error;
    }
}

export const deleteCustomer = async (id) => {
    try {
        await firestore.collection('customers').doc(id).delete();
    } catch (error) {
        throw error;
    }
}