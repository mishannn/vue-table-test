<template>
    <div class="data-table">
        <b-row class="actions-row">
            <b-col md="6">
                <b-input-group>
                    <b-input-group-text slot="prepend">Show items on page:</b-input-group-text>
                    <b-select id="per-page-select" v-model="perPage" :options="perPageSelectOptions"></b-select>
                </b-input-group>
            </b-col>

            <b-col md="6">
                <b-input-group>
                    <b-input-group-text slot="prepend">Search for:</b-input-group-text>
                    <b-input id="filter-input"
                             v-model="filterInput"
                             placeholder="Input the filter here"
                             @keypress.enter="applyFilter"></b-input>
                    <b-input-group-append>
                        <b-button @click="applyFilter">OK</b-button>
                        <b-button variant="outline-secondary" @click="disableFilter">Disable</b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>

        <b-table bordered striped show-empty
                 :per-page="perPage"
                 :current-page="currentPage"
                 :fields="fields"
                 :items="tableData"
                 :filter="filter"
                 @filtered="onFiltered">
            <template slot="empty" slot-scope="scope">
                <span>{{ scope.emptyText }}</span>
            </template>
            <template slot="emptyfiltered" slot-scope="scope">
                <span>{{ scope.emptyFilteredText }}</span>
            </template>
        </b-table>

        <b-pagination v-model="currentPage" :per-page="perPage" :total-rows="totalRows"></b-pagination>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: 'DataTable',
        data() {
            return {
                perPageSelectOptions: [10, 25, 50, 100],
                fields: ['id', 'first_name', 'last_name', 'email', 'phone'],
                perPage: 10,
                currentPage: 1,
                filter: '',
                filterInput: '',
                totalRows: 0
            }
        },
        computed: {
            ...mapState({
                tableData: state => state.tableData
            })
        },
        watch: {
            tableData(newValue) {
                this.totalRows = newValue.length
                this.currentPage = 1
            }
        },
        methods: {
            applyFilter() {
                this.filter = this.filterInput
            },
            disableFilter() {
                this.filterInput = ''
                this.filter = ''
                this.currentPage = 1
            },
            onFiltered(data, length) {
                this.totalRows = length
                this.currentPage = 1
            }
        },
        created() {
            this.$store.dispatch('loadTableData')
        }
    }
</script>

<style scoped>
    .actions-row {
        margin-bottom: 1rem;
    }
</style>