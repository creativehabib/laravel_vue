<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5>Edit Product - {{ productForm.title }}</h5>
                        <router-link :to="{name: 'product-list'}" class="btn btn-primary">Product List</router-link>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 offset-3">
                                <form @submit.prevent="updateProduct" enctype="multipart/form-data">
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
                                    <div class="row">
                                        <div class="col-8">
                                            <div class="form-group mb-2">
                                                <label for="image">Product Image:</label>
                                                <input type="file" id="image" @change="onImageChange" :class="{ 'is-invalid': productForm.errors.has('image')}" class="form-control-file" name="image">
                                                <div v-if="productForm.errors.has('image')" v-html="productForm.errors.get('image')" />
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div style="width: 50%;max-height: 100px;overflow:hidden">
                                                <img :src="image" class="img-fluid" alt="">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="des">Product Description</label>
                                        <textarea v-model="productForm.description" id="des" class="form-control" name="description" placeholder="Product description" :class="{'is-invalid': productForm.errors.has('description')}" rows="3"></textarea>
                                        <div v-if="productForm.errors.has('description')" v-html="productForm.errors.get('description')" />
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-success">Edit Product</button>
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
import { Form } from 'vform'
import { objectToFormData } from 'object-to-formdata'

export default{
    data(){
        return {
            productForm: new Form({
                title: '',
                price: '',
                image: '',
                description: '',
                _method: 'put',
            }),
            image: '',
        }
    },
    methods: {
        updateProduct(){
            let id = this.$route.params.id;

            this.productForm.post(`/api/product/${id}`, {
                transformRequest: [function (data, headers){
                    return objectToFormData(data)
                }],
                onUploadProgress: e => {
                    console.log(e)
                }
            }).then(({ data }) => {
                this.image = data.image;

                alert('Data updated');
            })
        },
        loadProduct(){
            let id = this.$route.params.id;
            axios.get(`/api/product/${id}/edit`).then(response => {
                let product = response.data;

                this.productForm.title = product.title;
                this.productForm.price = product.price;
                this.productForm.description = product.description;
                this.image = product.image;
            });
        },
        onImageChange(e){
            const file = e.target.files[0]
            this.productForm.image = file
        }
    },
    mounted(){
        this.loadProduct();
    }

}
</script>

<style>

</style>
