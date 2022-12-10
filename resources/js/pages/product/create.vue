<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5>Create Product</h5>
                        <router-link :to="{name: 'product-list'}" class="btn btn-primary">Product List</router-link>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 offset-3">
                                <form @submit.prevent="createProduct" enctype="multipart/form-data">
                                    <div class="form-group mb-2">
                                        <label for="title">Product Title:</label>
                                        <input type="text" v-model="productForm.title" id="title" :class="{ 'is-invalid': productForm.errors.has('title')}" class="form-control" name="title" placeholder="Product Title">
                                        <div v-if="productForm.errors.has('title')" v-html="productForm.errors.get('title')" />
                                    </div>
                                    <div class="form-group mb-2">
                                        <label for="price">Product Price:</label>
                                        <input type="number" v-model="productForm.price" id="price" :class="{ 'is-invalid': productForm.errors.has('price')}" class="form-control" name="price" placeholder="Product Price">
                                        <div v-if="productForm.errors.has('price')" v-html="productForm.errors.get('price')" />
                                    </div>
                                    <div class="form-group mb-2">
                                        <label for="image">Product Image:</label>
                                        <input type="file" id="image" @change="onImageChange" :class="{ 'is-invalid': productForm.errors.has('image')}" class="form-control" name="image">
                                        <div v-if="productForm.errors.has('image')" v-html="productForm.errors.get('image')" />
                                    </div>
                                    <div class="form-group mb-2">
                                        <label for="description">Product Description:</label>
                                        <textarea class="form-control" v-model="productForm.description" id="description" :class="{ 'is-invalid': productForm.errors.has('description')}" placeholder="Product Description" rows="3"></textarea>
                                        
                                    <div v-if="productForm.errors.has('description')" v-html="productForm.errors.get('description')" />
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-success">Create Product</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Form from 'vform'
import { objectToFormData } from 'object-to-formdata'

export default{
    data(){
        return {
            productForm: new Form({
                title: '',
                price: '',
                image: '',
                description: '',
            }),
        }
    },
    methods: {
        createProduct(){
            this.productForm.post('/api/product', {
                    transformRequest: [function (data, headers) {
                        return objectToFormData(data)
                    }],
                    onUploadProgress: e => {
                        // Do whatever you want with the progress event
                        console.log(e)
                    }
                }).then(({data}) => {
                this.productForm.title = '';
                this.productForm.price = '';
                this.productForm.image = '';
                this.productForm.description = '';
                console.log(data);

                alert('Product Created successfully!');
            })
        },
        onImageChange(e) {
            const file = e.target.files[0]
            // Do some client side validation...
            this.productForm.image = file
        },
    }
  
}
</script>

<style>

</style>
