<template>
    <el-container>
        <el-aside width="400px">
            <el-calendar v-model="value">
                <!-- Use 2.5 slot syntax. If you use Vue 2.6, please use new slot syntax-->
                <template
                        slot="dateCell"
                        slot-scope="{date, data}">
                    <div :click="changeSelectedDay()">
                        <el-badge v-if="toDoList.some(item=>item.date == data.day)" is-dot class="item">
                            <p :class="data.isSelected ? 'is-selected' : ''">
                                {{ data.day.split('-').slice(2).join('-') }}
                            </p>
                        </el-badge>
                        <p v-if="!toDoList.some(item=>item.date == data.day)" :class="data.isSelected ? 'is-selected' : ''">
                            {{ data.day.split('-').slice(2).join('-') }}
                        </p>
                    </div>

                </template>
            </el-calendar>
            <div>
                <DailyToDoList/>
            </div>

            <div>
                <el-button v-on:click="addNew" icon="el-icon-circle-plus-outline" type="primary" round>Add new to do
                </el-button>
            </div>

        </el-aside>
        <el-main>
            <h2>To do for <span class="header-date">{{selectedDay}}</span></h2>

            <SelectedToDo v-if="this.$store.state.selectedToDo.title"/>
            <ToDoForm v-if="!this.$store.state.selectedToDo.title" v-bind:selectedDate="value"/>

        </el-main>
    </el-container>
</template>

<script>
    import ToDoForm from "@/components/ToDoForm";
    import DailyToDoList from "@/components/DailyToDoList";
    import SelectedToDo from "@/components/SelectedToDo";
    import {mapState} from "vuex";
    import moment from 'moment'

    export default {
        name: "ToDo",
        components: {
            SelectedToDo,
            ToDoForm,
            DailyToDoList
        },
        data() {
            return {
                value: new Date(),
                methods: {}
            }
        },
        computed: mapState({
            selectedDay: state => moment(state.selectedDay).format('LL'),
            toDoList: state => state.toDoList

        }),
        methods: {
            changeSelectedDay() {
                this.$store.commit("changeSelectedDay", {date: this.value})
            },
            addNew() {
                this.$store.commit("clickAddNew")
            }
        }

    }
</script>

<style lang="scss" scoped>
    .header-date {
        color: #898888;
    }

    .el-aside {
        /*background-color: #c2ccd9;*/
        height: 100vh;
        border-right: #cbc3c3 solid 1px;
    }

    .el-button {
        margin-left: 100px;
        width: 200px;
    }

    p {
        margin: 0;
    }

    .is-selected {
        color: #1989FA;
    }

</style>
<style lang="scss">
    .el-calendar-day {
        max-height: 30px !important;
    }
</style>