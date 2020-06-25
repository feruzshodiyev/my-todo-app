<template>
    <div class="daily-todo-list">

        <ul v-for="(toDo,index) in dailyToDoList" :key="index">
            <li class="todo-item" :class="toDo.importance">
                <el-row type="flex" class="row-bg" justify="">
                    <el-col :span="21" >
                            <p v-on:click="selectToDo(toDo)" class="todo-title">{{toDo.title}}</p>
                            <p class="todo-time">{{toDo.time}}</p>
                    </el-col>
                    <el-col :span="3">
                        <el-button v-on:click="deleteToDo(toDo.id)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
                    </el-col>
                </el-row>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "DailyToDoList",
        computed: mapState({
            dailyToDoList: state => state.toDoList.filter(item => item.date == state.selectedDay),
            selectedDay: state => state.selectedDay
        }),
        data() {
            return {}
        },
        methods: {
            deleteToDo(id){
                this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    this.$store.commit("removeById",id)
                    this.$message({
                        type: 'success',
                        message: 'Delete completed'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Delete canceled'
                    });
                });

            },
            selectToDo(toDo){

                this.$store.commit("selectToDo",toDo)
            }
        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
    ul {
        list-style: none;
        margin: 5px;
    }

    .daily-todo-list {
        width: 90%;
        height: 300px;
        overflow: hidden;
        overflow-y: auto;
    }
    .daily-todo-list::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: #F5F5F5;
    }

    .daily-todo-list::-webkit-scrollbar
    {
        width: 5px;
        background-color: #F5F5F5;
    }

    .daily-todo-list::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #555;
    }

    .todo-title {
        margin: 0;
        color: #1989FA;
        font-weight: bolder;
        cursor: pointer;
    }
    .todo-time{
        margin: 0;
    }

    .todo-item {
        border-radius: 10px;
        padding: 5px;
    }


    .High {
        border: #ff0909 1px solid;
    }

    .Medium {
        border: #039340 1px solid;
    }

    .Low {
        border: #898888 1px solid;
    }
</style>