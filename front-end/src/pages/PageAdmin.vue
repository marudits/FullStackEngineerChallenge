<template lang="pug">
    el-container.page-admin
        el-header
            h1 Admin Page
        el-main
            el-row.page-admin__employee
                h3 Employee Data
                el-button(type="success" icon="el-icon-plus" @click="handleAction('dialog-employee-add')") Add Employee

                el-table(
                    :data="list.employee"
                    v-loading="loading.list.employee"
                    element-loading-text="Fetching data"
                    max-height="400"
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
                    el-table-column(label="Created At" prop="created_at" min-width="175")
                        template(slot-scope="scope") 
                            | {{ scope.row.created_at | toDateTime }}
                    el-table-column(label="Operations" fixed="right" min-width="150")
                        template(slot-scope="scope") 
                            .operations
                                el-button(@click="handleAction('dialog-employee-details', scope.row)" icon="el-icon-view" size="medium" circle disabled)
                                el-button(@click="handleAction('dialog-employee-update', scope.row)" icon="el-icon-edit" size="medium"  type="warning" circle)
                                el-button(@click="handleAction('dialog-employee-delete', scope.row)" icon="el-icon-delete" size="medium"  type="danger" circle)

            el-row.page-admin__review
                h3 Review Data
                .actions
                    el-button(type="success" icon="el-icon-plus" @click="handleAction('dialog-review-add')") Add Review
                    el-button(type="success" icon="el-icon-plus" @click="handleAction('dialog-review-assign')") Assign Review
                el-table(
                    :data="list.review"
                    v-loading="loading.list.review"
                    element-loading-text="Fetching data"
                    max-height="400"
                )
                    el-table-column(label="No" fixed width="50")
                        template(slot-scope="scope") 
                            | {{ scope.$index + 1 }}
                    el-table-column(label="Reviewer" prop="reviewer_name" sortable fixed min-width="150")
                        template(slot-scope="scope") 
                            | {{ scope.row.reviewer_name }}
                    el-table-column(label="Reviewee" prop="reviewee_name" sortable fixed min-width="150")
                        template(slot-scope="scope") 
                            | {{ scope.row.reviewee_name }}
                    el-table-column(label="Rate" prop="rate" sortable min-width="150")
                        template(slot-scope="scope") 
                            | {{ scope.row.rate }}
                    el-table-column(label="Comment" prop="comment" sortable min-width="150")
                        template(slot-scope="scope") 
                            | {{ scope.row.comment }}
                    el-table-column(label="Created At" prop="created_at" min-width="175")
                        template(slot-scope="scope") 
                            | {{ scope.row.created_at | toDateTime }}
                    el-table-column(label="Operations" fixed="right" min-width="150")
                        template(slot-scope="scope") 
                            .operations
                                el-button(@click="handleAction('dialog-review-details', scope.row)" icon="el-icon-view" size="medium" circle disabled)
                                el-button(@click="handleAction('dialog-review-update', scope.row)" icon="el-icon-edit" size="medium"  type="warning" circle)
                                el-button(@click="handleAction('dialog-review-delete', scope.row)" icon="el-icon-delete" size="medium"  type="danger" circle)

        el-dialog.dialog(
            :title="dialog.title"
            :visible.sync="dialog.is_visible"
        )
            content(v-if="dialog.type === 'employee-add'")
                el-form(ref="form" :model="dialog.form")
                    el-form-item(label="Name")
                        el-input(v-model="dialog.form.name")
                    el-form-item(label="Email")
                        el-input(v-model="dialog.form.email")
                    el-form-item(label="Department")
                        el-input(v-model="dialog.form.department")
                    el-form-item(label="Position")
                        el-input(v-model="dialog.form.position")
                    el-form-item
                        el-button(
                            type="success" 
                            @click="() => handleAction('confirm-employee-add')"
                        )
                            | Submit
            content(v-if="dialog.type === 'employee-update'")
                el-form(ref="form" :model="dialog.form")
                    el-form-item(label="Name")
                        el-input(v-model="dialog.form.name")
                    el-form-item(label="Email")
                        el-input(v-model="dialog.form.email")
                    el-form-item(label="Department")
                        el-input(v-model="dialog.form.department")
                    el-form-item(label="Position")
                        el-input(v-model="dialog.form.position")
                    el-form-item
                        el-button(
                            type="warning" 
                            @click="() => handleAction('confirm-employee-update')"
                        )
                            | Update
            content(v-if="dialog.type === 'employee-delete'")
                el-form(ref="form" :model="dialog.form")
                    el-form-item
                        p Are you sure to delete employee 
                            b &nbsp;{{ this.dialog.form.name }}
                            | &nbsp;? Type
                            b &nbsp;confirm
                            | &nbsp;to proceed the action
                    el-form-item
                        el-input(v-model="dialog.form.confirm" placeholder="Type confirm")
                    el-form-item
                        el-button(
                            type="danger" 
                            @click="() => handleAction('confirm-employee-delete')"
                            :disabled="dialog.form.confirm.toLowerCase() !== 'confirm'"
                        )
                            | Delete
            content(v-if="dialog.type === 'review-assign'")
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
                    el-form-item
                        el-button(
                            type="success" 
                            @click="() => handleAction('confirm-review-assign')"
                        )
                            | Assign
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
            content(v-if="dialog.type === 'review-update'")
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
                            type="warning" 
                            @click="() => handleAction('confirm-review-update')"
                        )
                            | Update
            content(v-if="dialog.type === 'review-delete'")
                el-form(ref="form" :model="dialog.form")
                    el-form-item
                        p Are you sure to delete review from 
                            b &nbsp;{{ this.dialog.form.reviewer_name }}
                            | &nbsp; to 
                            b &nbsp;{{ this.dialog.form.reviewee_name }} ? 
                            | Type
                            b &nbsp;confirm
                            | &nbsp;to proceed the action
                    el-form-item
                        el-input(v-model="dialog.form.confirm" placeholder="Type confirm")
                    el-form-item
                        el-button(
                            type="danger" 
                            @click="() => handleAction('confirm-review-delete')"
                            :disabled="dialog.form.confirm.toLowerCase() !== 'confirm'"
                        )
                            | Delete
    
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
    filters: {
        toDateTime: (timestamp) => {
            return new Date(timestamp).toLocaleString()
        }
    },
    data: () => {
        return {
            list: {
                employee: [],
                review: [],
                options: {
                    employee: []
                }
            },
            loading: {
                list: {
                    employee: false,
                    review: false
                }
            },
            dialog: {
                type: null,
                title: null,
                is_visible: false,
                form: {}
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
                case 'dialog-employee-add':
                    this.dialog = {
                        title: 'Employee - Add',
                        type: 'employee-add',
                        is_visible: true,
                        form: {
                            name: null,
                            email: null,
                            department: null,
                            position: null
                        }
                    }
                    break;
                case 'dialog-employee-update':
                    this.dialog = {
                        title: 'Employee - Update',
                        type: 'employee-update',
                        is_visible: true,
                        form: {
                            name: params.name,
                            email: params.email,
                            department: params.department,
                            position: params.position,
                            uuid: params.uuid
                        }
                    }
                    break;
                case 'dialog-employee-delete':
                    this.dialog = {
                        title: 'Employee - Delete',
                        type: 'employee-delete',
                        is_visible: true,
                        form: {
                            confirm: '',
                            name: params.name,
                            uuid: params.uuid
                        }
                    }
                    break;
                case 'dialog-review-assign':
                    this.dialog = {
                        title: 'Review - Assign',
                        type: 'review-assign',
                        is_visible: true,
                        form: {
                            reviewer_id: null,
                            reviewer_name: null,
                            reviewee_id: null,
                            reviewee_name: null,
                        }
                    }
                    break;
                case 'dialog-review-add':
                    this.dialog = {
                        title: 'Review - Add',
                        type: 'review-add',
                        is_visible: true,
                        form: {
                            reviewer_id: null,
                            reviewer_name: null,
                            reviewee_id: null,
                            reviewee_name: null,
                            rate: null,
                            comment: null
                        }
                    }
                    break;
                case 'dialog-review-update':
                    this.dialog = {
                        title: 'Review - Update',
                        type: 'review-update',
                        is_visible: true,
                        form: params
                    }
                    break;
                case 'dialog-review-delete':
                    this.dialog = {
                        title: 'Review - Delete',
                        type: 'review-delete',
                        is_visible: true,
                        form: Object.assign({}, { confirm: '' }, params)
                    }
                    break;
                case 'confirm-employee-add':
                    employeesService.addEmployee(this.dialog.form.name, this.dialog.form.email, this.dialog.form.department, this.dialog.form.position)
                        .then(res => {
                            if(res.body.successful && res.body.payload){
                                this.handleAction('dialog-close');
                                this.loadEmployeeData();
                            }
                        })
                        .catch(err => {
                            console.error('Failed on ', type, ' : ', err);
                        })
                    break;
                case 'confirm-employee-update':
                    employeesService.updateEmployee(this.dialog.form)
                        .then(res => {
                            if(res.body.successful && res.body.payload){
                                this.handleAction('dialog-close');
                                this.loadEmployeeData();
                            }
                        })
                        .catch(err => {
                            console.error('Failed on ', type, ' : ', err);
                        })
                    break;
                case 'confirm-employee-delete':
                    employeesService.deleteEmployee(this.dialog.form)
                        .then(res => {
                            if(res.body.successful && res.body.payload){
                                this.handleAction('dialog-close');
                                this.loadEmployeeData();
                            }
                        })
                        .catch(err => {
                            console.error('Failed on ', type, ' : ', err);
                        })
                    break;
                case 'confirm-review-assign':
                    reviewsService.assignReview(this.dialog.form.reviewer_id, this.dialog.form.reviewee_id)
                        .then(res => {
                            if(res.body.successful && res.body.payload){
                                this.handleAction('dialog-close');
                                this.loadReviewData();
                            }
                        })
                        .catch(err => {
                            console.error('Failed on ', type, ' : ', err);
                        })
                    break;
                case 'confirm-review-add':
                    console.log(type, this.dialog.form);
                    reviewsService.addReview(this.dialog.form.reviewer_id, this.dialog.form.reviewee_id, this.dialog.form.rate, this.dialog.form.comment)
                        .then(res => {
                            if(res.body.successful && res.body.payload){
                                this.handleAction('dialog-close');
                                this.loadReviewData();
                            }
                        })
                        .catch(err => {
                            console.error('Failed on ', type, ' : ', err);
                        })
                    break;
                case 'confirm-review-update':
                    reviewsService.updateReview(this.dialog.form)
                        .then(res => {
                            if(res.body.successful && res.body.payload){
                                this.handleAction('dialog-close');
                                this.loadReviewData();
                            }
                        })
                        .catch(err => {
                            console.error('Failed on ', type, ' : ', err);
                        })
                    break;
                case 'confirm-review-delete':
                    reviewsService.deleteReview(this.dialog.form)
                        .then(res => {
                            if(res.body.successful && res.body.payload){
                                this.handleAction('dialog-close');
                                this.loadReviewData();
                            }
                        })
                        .catch(err => {
                            console.error('Failed on ', type, ' : ', err);
                        })
                    break;
                case 'dialog-close':
                    this.dialog = {
                        title: null,
                        type: null,
                        is_visible: false,
                        form: {}
                    }
                    break;
                case 'select-review-assign-reviewee':
                    this.dialog.form.reviewee_id = params.label;
                    this.dialog.form.reviewee_name = params.value;
                    break;
                case 'select-review-assign-reviewer':
                    this.dialog.form.reviewer_id = params.label;
                    this.dialog.form.reviewer_name = params.value;
                    break;
                default:
                    console.log(type, params);
                    break;
            }
            
        },
        loadEmployeeData(){

            this.loading.list.employee = true;

            employeesService.getEmployees()
                .then(res => {
                    if(res.body.successful && res.body.payload){
                        this.list.employee = res.body.payload;
                        this.list.options.employee = res.body.payload.map(x => Object.assign({}, { label: x.uuid, value: x.name }))
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
    .dialog
        .block.rate
            margin-top 2.5rem
</style>

