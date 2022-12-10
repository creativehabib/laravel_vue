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
                                        <input type="text" v-model="productForm.title" id="title" :class="{ 'is-invalid': productForm.errors.has('title')}" class="form-control" name="title" placeholder="Product title">
                                        <div v-if="productForm.errors.has('title')" v-html="productForm.errors.get('title')" />
                                    </div>
                                    <div class="form-group mb-2">
                                        <label for="price">Product Price:</label>
                                        <input type="number" v-model="productForm.price" id="price" :class="{ 'is-invalid': productForm.errors.has('price')}" class="form-control" name="price" placeholder="Product price">
                                        <div v-if="productForm.errors.has('price')" v-html="productForm.errors.get('price')" />
                                    </div>
                                    <div class="form-group mb-2">
                                        <label for="description">Product Description:</label>
                                        <textarea class="form-control" v-model="productForm.description" id="description" :class="{ 'is-invalid': productForm.errors.has('description')}" placeholder="Product Description" rows="3"></textarea>                                      
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-success">Update Product</button>
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

export default{
    data(){
        return {
            productForm: new Form({
                title: '',
            }),
        }
    },
    methods: {
        updateProduct(){
            let id = this.$route.params.id;
            this.productForm.put(`/api/product/${id}`).then(() =>{
                
                alert('Product updated successfully!');
            })
        },
        loadProduct(){
            let id = this.$route.params.id;

            axios.get(`/api/product/${id}/edit`).then(response => {
                this.productForm.title = response.data.title;
                this.productForm.price = response.data.price;
                this.productForm.description = response.data.description;
            });
        }
    },
    mounted(){
        this.loadProduct();
    }
}
</script>

<style>

</style>
