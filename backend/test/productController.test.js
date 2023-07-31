require('@babel/register')
const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app')

let testProduct

// Create and save a test product to the database
testProduct = {
    title: 'ProductTest',
    description: 'This is a test product',
    price: 10,
    category: ['Test Category'],
}

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(
        'mongodb+srv://rnunes:g3ODOCA10QkABOkP@cluster0.yyjhb1f.mongodb.net/Product-API?retryWrites=true&w=majority'
    )
    await request(app).post('/api/addproducts').send(testProduct)
})

/* Dropping the database and closing connection after each test. */
afterEach(async () => {
    const response = await request(app).get('/api/products/title/ProductTest')
    await request(app).delete(`/api/deleteproducts/${response.body[0]._id}`)
    // await mongoose.connection.dropDatabase();
    await mongoose.connection.close()
})

describe('POST /api/products', () => {
    test('should respond with status code 200', async () => {
        const response = await request(app).post('/api/addproducts').send({
            title: 'test',
            description: 'test',
            price: 1,
            category: 'test',
        })
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
        await request(app).delete(`/api/deleteproducts/${response.body._id}`)
    })
    test('should specify json in the content type header', async () => {
        const response = await request(app).post('/api/addproducts').send({
            title: 'test',
            description: 'test',
            price: 1,
            category: 'test',
        })
        expect(response.headers['content-type']).toEqual(
            expect.stringContaining('json')
        )
        await request(app).delete(`/api/deleteproducts/${response.body._id}`)
    })
    test('should respond with status code 500', async () => {
        const response = await request(app).post('/api/addproducts').send({})
        expect(response.statusCode).toBe(500)
    })
})

describe('GET /api/products', () => {
    test('should respond with status code 200', async () => {
        const response = await request(app).get('/api/products')
        expect(response.statusCode).toBe(200)
    })

    test('should specify json in the content type header', async () => {
        const response = await request(app).get('/api/products')
        expect(response.headers['content-type']).toEqual(
            expect.stringContaining('json')
        )
    })

    test('should respond with status code 200', async () => {
        const response = await request(app).get(
            `/api/products/title/${testProduct.title}`
        )
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
        expect(response.body[0].title).toStrictEqual(testProduct.title)
    })

    test('should respond with status code 200', async () => {
        const response = await request(app).get(
            `/api/products/category/${testProduct.category}`
        )
        expect(response.statusCode).toBe(200)
        expect(response.body[0].category).toStrictEqual(testProduct.category)
    })
})

describe('PUT /api/updateproducts/:id', () => {
    test('should update a product and respond with status code 200', async () => {
        // Create a new product to update
        const newProduct = {
            title: 'New Product',
            description: 'This is a new product',
            price: 20,
            category: ['New Category'],
        }

        // Add the new product to the database
        const addResponse = await request(app)
            .post('/api/addproducts')
            .send(newProduct)

        // Update the product
        const updatedProduct = {
            title: 'Updated Product',
            description: 'This is an updated product',
            price: 30,
            category: ['Updated Category'],
        }
        const updateResponse = await request(app)
            .put(`/api/updateproducts/${addResponse.body._id}`)
            .send(updatedProduct)

        expect(updateResponse.statusCode).toBe(200)
        expect(updateResponse.body).toBeDefined()

        const getProductResponse = await request(app).get(
            `/api/products/title/${updatedProduct.title}`
        )

        // Check if the product was successfully updated
        expect(getProductResponse.statusCode).toBe(200)
        expect(getProductResponse.body).toBeDefined()
        expect(getProductResponse.body[0].title).toBe(updatedProduct.title)
        expect(getProductResponse.body[0].description).toBe(
            updatedProduct.description
        )
        expect(getProductResponse.body[0].price).toBe(updatedProduct.price)
        expect(getProductResponse.body[0].category).toEqual(
            updatedProduct.category
        )

        await request(app).delete(
            `/api/deleteproducts/${getProductResponse.body[0]._id}`
        )
    })
})

describe('DELETE /api/products', () => {
    test('should delete a product respond with status code 200', async () => {
        //arrange
        await request(app).post('/api/addproducts').send(testProduct)
        const deleteProduct = await request(app).get(
            `/api/products/title/${testProduct.title}`
        )
        console.log(deleteProduct.body)
        const response = await request(app).delete(
            `/api/deleteproducts/${deleteProduct.body[0]._id}`
        )

        //assert
        expect(response.statusCode).toBe(200)
    })
})
