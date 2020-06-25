import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from "vuex-persistedstate";
import moment from 'moment'
Vue.use(Vuex);


export default new Vuex.Store({

    state: {
        toDoList:[],
        selectedDay: moment().format("YYYY-MM-DD"),
        selectedToDo:{}
    },
    mutations: {
        // put sychronous functions for changing state e.g. add, edit, delete
        addToDo(state, payload){

                const newToDo = {
                    id: Date.now(),
                    date: payload.date,
                    title: payload.toDo.title,
                    time: moment(payload.toDo.time).format("HH:mm"),
                    description: payload.toDo.description,
                    importance: payload.toDo.importance,
                }

                state.toDoList.push(newToDo)


            console.log(state.toDoList)
        },

        removeById(state, id){
            state.toDoList=state.toDoList.filter(item => id !== item.id);
            if (id===state.selectedToDo.id){
                state.selectedToDo={}
            }
        },

        changeSelectedDay(state, payload){
            state.selectedDay = moment(payload.date).format("YYYY-MM-DD")
        },

        selectToDo(state, toDo){
            state.selectedToDo = toDo
        },

        clickAddNew(state){
            state.selectedToDo={}
        }

    },
    actions: {
        // put asynchronous functions that can call one or more mutation functions
    },

    plugins:[createPersistedState()],
})