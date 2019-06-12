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
                    placeholder="Select Employee"
                    @select="(e) => handleAction('select-reviews-emp', e)"
                    style="width: 100%"
                    )
            el-row
                el-tabs(v-model="tabs.active_name" @tab-click="(e) => handleAction('change-tab')") 
                    el-tab-pane(label="Pending Review" name="pending") 
                        h2 Pending Review
                        div.reviews.pending(v-if="list.reviews.pending && list.reviews.pending.length > 0")
                            .reviews-item(v-for="(item, index) in list.reviews.pending")
                                p To
                                    b &nbsp;{{ item.reviewee_name}}
                                el-button(
                                    type="success"
                                    disabled
                                ) Submit Review
                        div(v-else)
                            h3 No Data
                    el-tab-pane(label="As Reviewer" name="reviewer") 
                        h2 As Reviewer
                        div.reviews.reviewer(v-if="list.reviews.reviewer && list.reviews.reviewer.length > 0")
                            .reviews-item(v-for="(item, index) in list.reviews.reviewer")
                                h4 {{ item.comment }}
                                p Rate: {{ item.rate }}
                                el-divider(content-position="left") To {{ item.reviewee_name }}
                        div(v-else)
                            h3 No Data
                    el-tab-pane(label="As Reviewee" name="reviewee") 
                        h2 As Reviewee
                        div.reviews.reviewee(v-if="list.reviews.reviewee && list.reviews.reviewee.length > 0")
                            .reviews-item(v-for="(item, index) in list.reviews.reviewee")
                                h4 {{ item.comment }}
                                p Rate: {{ item.rate }}
                                el-divider(content-position="left") From {{ item.reviewer_name }}
                        div(v-else)
                            h3 No Data
        el-dialog.dialog(
            :title="dialog.title"
            :visible.sync="dialog.is_visible"
        )
            content(v-if="dialog.type === 'review-add'")
                el-form(ref="form" :model="dialog.form")
                    el-form-item(label="Reviewer")
                        el-autocomplete(
                            v-model="dialog.form.reviewer_name"
                            class="inline-input"
                            :fetch-suggestions="fetchEmployee"
                            placeholder="Select Reviewer"
                            @select="(e) => handleAction('select-review-assign-reviewer', e)"
                            style="width: 100%"
                            )
                    el-form-item(label="Reviewee")
                        el-autocomplete(
                            v-model="dialog.form.reviewee_name"
                            class="inline-input"
                            :fetch-suggestions="fetchEmployee"
                            placeholder="Select Reviewee"
                            @select="(e) => handleAction('select-review-assign-reviewee', e)"
                            style="width: 100%"
                            )
                    el-form-item(label="Rate")
                        .block.rate
                            el-rate(v-model="dialog.form.rate")
                    el-form-item(label="Comment")
                        el-input(type="textarea" v-model="dialog.form.comment")
                    el-form-item
                        el-button(
                            type="success" 
                            @click="() => handleAction('confirm-review-add')"
                        )
                            | Add
            
                
</template>

<script>
// service
import { employeesService } from '../services/employees';
import { reviewsService } from '../services/reviews';

// shared
import CONSTANTS from '../shared/constants';

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
                emp_name: null,
                emp_id: null
            },
            list: {
                reviews: {
                    pending: [],
                    reviewer: [],
                    reviewee: []
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
                    if(this.form.emp_id){
                        console.log('change-tab call loadReview');
                        this.loadReviewsByType(this.form.emp_id, this.tabs.active_name);
                    }
                    console.log(type, this.tabs.active_name, this.form);
                    break;
                case 'dialog-review-submit':
                    this.dialog = {
                        type: 'review-submit',
                        title: 'Review Submit',
                        form: {
                            reviewer_id: params.emp_id,
                            reviewer_name: params.emp_name,
                            reviewee_id: null,
                            reviewee_name: null,
                            rate: null,
                            comment: null
                        }
                    };
                    break;
                case 'select-reviews-emp':
                    this.form.emp_id = params.label;
                    this.form.emp_name = params.value;
                    console.log(type, params);
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
        loadReviewsByType(emp_id = null, type = 'pending'){
            console.log('loadReviewsByType: ', emp_id, type);
            reviewsService.getReviewsByType(emp_id, type)
                .then(res => {
                    if(res.body.successful && res.body.payload){
                        this.list.reviews[type] = res.body.payload;
                    }
                })
                .catch(err => {
                    console.error('Failed on loadReviewsByType: ', type, ' : ', err);
                })
        }
    }
}
</script>


<style lang="stylus" scoped>

    .reviews-item
        text-align left
        h4
            font-style italic
        p
            font-size 0.85rem
</style>

