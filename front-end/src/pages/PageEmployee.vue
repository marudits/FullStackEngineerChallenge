<template lang="pug">
    el-container.page-employee
        el-header
            h1 Page employee
        el-main
            el-row
                el-autocomplete(
                    v-model="form.reviewer_name"
                    class="inline-input"
                    :fetch-suggestions="fetchEmployee"
                    placeholder="Select Reviewer"
                    @select="(e) => handleAction('select-pending-review-reviewer', e)"
                    style="width: 100%"
                    )
            el-row
                el-tabs(v-model="tabs.active_name" @tab-click="(e) => handleAction('change-tab')") 
                    el-tab-pane(label="Pending Review" name="pending-review") 
                        h2 Pending Review
                    el-tab-pane(label="As Reviewer" name="as-reviewer") 
                        h2 As Reviewer
                    el-tab-pane(label="As Reviewee" name="as-reviewee") 
                        h2 As Reviewee
                
</template>

<script>
// service
import { employeesService } from '../services/employees';
import { reviewsService } from '../services/reviews';

export default {
    name: 'PageEmployee',
    mounted(){

    },
    filters: {
        toDateTime: (timestamp) => {
            return new Date(timestamp).toLocaleString()
        }
    },
    data: () => {
        return {
            dialog: {
                type: null,
                title: null,
                is_visible: false,
                form: {}
            },
            form: {
                reviewer_name: null,
                reviewer_id: null
            },
            list: {
                reviews: {
                    pending: [],
                    to_me: [],
                    to_others: []
                },
                options: {
                    employee: []
                }
            },
            loading: {
                list: {
                    reviews: false,
                }
            },
            tabs: {
                active_name: 'pending-review'
            }
        }
    }, 
    methods: {
        fetchEmployee(query, cb){
            if(!this.list.options.employee || this.list.options.employee.length < 1){
                this.loadEmployeeData();
            }
            let result = query ? this.list.options.employee.filter(x => x.value.toUpperCase().indexOf(query.toUpperCase()) !== -1) : this.list.options.employee.slice(0, 10);
            cb(result);
        },
        handleAction(type, params){
            switch(type){
                case 'change-tab':
                    console.log(this.tabs.active_name);
                    break;
                default:
                    console.log(type, params);
                    break;
            }
        },
        loadEmployeeData(){
            employeesService.getEmployees()
                .then(res => {
                    if(res.body.successful && res.body.payload){
                        this.list.options.employee = res.body.payload.map(x => Object.assign({}, { label: x.uuid, value: x.name }))
                    }
                })
                .catch(err => {
                    console.error('Failed on loadEmployeeData: ', err);
                });
            
        },
    }
}
</script>


<style lang="stylus" scoped>

</style>

