<template lang="pug">
    el-container.page-admin
        el-header
            h1 Admin Page
        el-main
            el-row.page-admin__employee
                h3 Employee Data
                el-table(
                    :data="list.employee"
                    v-loading="loading.list.employee"
                    element-loading-text="Fetching data"
                    )
                    el-table-column(label="No" fixed width="50")
                        template(slot-scope="scope") 
                            | {{ scope.$index + 1 }}
                    el-table-column(label="Name" prop="name" sortable fixed min-width="150")
                        template(slot-scope="scope") 
                            | {{ scope.row.name }}
                    el-table-column(label="Email" prop="email" sortable min-width="150")
                        template(slot-scope="scope") 
                            | {{ scope.row.email }}
                    el-table-column(label="Department" prop="department" sortable min-width="150")
                        template(slot-scope="scope") 
                            | {{ scope.row.department }}
                    el-table-column(label="Position" prop="position" sortable min-width="150")
                        template(slot-scope="scope") 
                            | {{ scope.row.position }}
                    el-table-column(label="Operations" fixed="right" min-width="150")
                        template(slot-scope="scope") 
                            .operations
                                <el-button @click="handleClick('employee-details', scope.row)" icon="el-icon-view" size="medium" circle>
                                </el-button>
                                <el-button @click="handleClick('employee-update', scope.row)" icon="el-icon-edit" size="medium"  type="warning" circle>
                                </el-button>
                                <el-button @click="handleClick('employee-delete', scope.row)" icon="el-icon-delete" size="medium"  type="danger" circle>
                                </el-button>

            el-row.page-admin__review
                h3 Review Data
                el-table(
                    :data="list.review"
                    v-loading="loading.list.review"
                    element-loading-text="Fetching data"
                    )
    
</template>

<script>
// service
import { employeesService } from '../services/employees';
import { reviewsService } from '../services/reviews';

export default {
    name: 'PageAdmin',
    mounted(){
        this.loadEmployeeData();
        this.loadReviewData();
    },
    data: () => {
        return {
            list: {
                employee: null,
                review: null
            },
            loading: {
                list: {
                    employee: false,
                    review: false
                }
            }
        }
    },
    methods: {
        handleAction(type, params){
            console.log(type, params);
        },
        loadEmployeeData(){

            this.loading.list.employee = true;

            employeesService.getEmployees()
                .then(res => {
                    if(res.body.successful && res.body.payload){
                        this.list.employee = res.body.payload
                    }

                    this.loading.list.employee = false;
                })
                .catch(err => {
                    console.error('Failed on loadEmployeeData: ', err);
                    this.loading.list.employee = false;
                });
            
        },
        loadReviewData(){
            this.loading.list.review = true;

            reviewsService.getReviews()
                .then(res => {
                    if(res.body.successful && res.body.payload){
                        this.list.review = res.body.payload
                    }
                    this.loading.list.review = false;
                })
                .catch(err => {
                    console.error('Failed on loadEmployeeData: ', err);
                    this.loading.list.review = false;
                });
            
        }
    }
}
</script>


<style lang="stylus" scoped>

</style>

