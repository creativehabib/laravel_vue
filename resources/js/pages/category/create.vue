<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5>Create Category</h5>
                        <router-link :to="{name: 'category-list'}" class="btn btn-primary">Category List</router-link>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 offset-3">
                                <form @submit.prevent="createCategory" @keydown="categoryForm.onKeydown($event)">
                                    <div class="form-group mb-2">
                                        <label for="name">Category Name:</label>
                                        <input type="text" v-model="categoryForm.name" id="name" :class="{ 'is-invalid': categoryForm.errors.has('name')}" class="form-control" name="name" placeholder="Category name">
                                        <div v-if="categoryForm.errors.has('name')" v-html="categoryForm.errors.get('name')" />
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-success">Create Category</button>
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
            categoryForm: new Form({
                name: '',
            }),
        }
    },
    methods: {
        createCategory(){
            this.categoryForm.post('/api/category').then(({data}) => {
                this.categoryForm.name = '';

                alert('Category Created successfully!');
            })
        }
    }
}
</script>

<style>

</style>
