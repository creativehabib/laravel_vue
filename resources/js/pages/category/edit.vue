<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5>Edit Category - {{ categoryForm.name }}</h5>
                        <router-link :to="{name: 'category-list'}" class="btn btn-primary">Category List</router-link>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 offset-3">
                                <form @submit.prevent="updateCategory">
                                    <div class="form-group mb-2">
                                        <label for="name">Category Name:</label>
                                        <input type="text" v-model="categoryForm.name" id="name" :class="{ 'is-invalid': categoryForm.errors.has('name')}" class="form-control" name="name" placeholder="Category name">
                                        <div v-if="categoryForm.errors.has('name')" v-html="categoryForm.errors.get('name')" />
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-success">Update Category</button>
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
        updateCategory(){
            let id = this.$route.params.id;
            this.categoryForm.put(`/api/category/${id}`).then(() =>{
                
                alert('Category updated successfully!');
            })
        },
        loadCategory(){
            let id = this.$route.params.id;

            axios.get(`/api/category/${id}/edit`).then(response => {
                this.categoryForm.name = response.data.name;
            });
        }
    },
    mounted(){
        this.loadCategory();
    }
}
</script>

<style>

</style>
