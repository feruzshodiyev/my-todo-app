<template>
    <div>
        <h2>{{selectedToDo.title}}</h2>
        <p>Time: <span>{{selectedToDo.time}}</span></p>
        <p>Description: <span>{{selectedToDo.description}}</span></p>
        <p> Importances: <span>{{selectedToDo.importance}}</span></p>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "SelectedToDo",

        computed: mapState({
            selectedToDo: state => state.selectedToDo
        }),
    }

</script>

<style lang="scss" scoped>
    h2 {
        text-align: center;
        color: #1989FA;
    }

</style>