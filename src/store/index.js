import Vue from "vue";
import Vuex from "vuex";
import TableApi from "../api/table";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tableData: [],
        filteredTableData: []
    },
    actions: {
        loadTableData({commit}) {
            TableApi.getData(tableData => {
                commit('setTableData', tableData)
            })
        },
        filterTableData({state, commit}, filter) {
            if (filter === '') {
                commit('setFilteredTableData', state.tableData)
                return
            }

            const promise = new Promise((resolve) => {
                resolve(state.tableData.filter(el => {
                    return (el.id.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1)
                        || (el.first_name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
                        || (el.last_name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
                        || (el.email.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
                        || (el.phone.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
                }))
            })

            promise.then((filtered) => {
                commit('setFilteredTableData', filtered)
            });
        }
    },
    mutations: {
        setTableData(state, tableData) {
            state.tableData = tableData
            state.filteredTableData = state.tableData
        },
        setFilteredTableData(state, filteredTableData) {
            state.filteredTableData = filteredTableData
        }
    }
})