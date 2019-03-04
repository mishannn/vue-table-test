import Vue from "vue";
import Vuex from "vuex";
import TableApi from "../api/table";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tableData: []
    },
    actions: {
        loadTableData({commit}) {
            TableApi.getData(tableData => {
                commit('setTableData', tableData)
            })
        }
    },
    mutations: {
        setTableData(state, tableData) {
            state.tableData = tableData
        }
    }
})