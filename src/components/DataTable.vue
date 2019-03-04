<template>
    <div class="data-table-tab">
        <b-row class="actions-row">
            <b-col class="actions-col" md="6" xs="12">
                <b-input-group>
                    <b-input-group-text slot="prepend">Show items on page:</b-input-group-text>
                    <b-select id="per-page-select" v-model="perPage" :options="perPageSelectOptions"></b-select>
                </b-input-group>
            </b-col>

            <b-col class="actions-col" md="6" xs="12">
                <b-input-group>
                    <b-input-group-text slot="prepend">Search for:</b-input-group-text>
                    <b-input id="filter-input"
                             v-model="filterInput"
                             @keyup="filterInput = $event.target.value"
                             placeholder="Input the filter here"></b-input>
                    <b-input-group-append>
                        <b-button @click="clearFilter">Clear</b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>

        <b-table id="data-table"
                 responsive bordered striped show-empty
                 :per-page="perPage"
                 :current-page="currentPage"
                 :items="filteredTableData"
                 :busy="tableBusy">
            <template slot="empty" slot-scope="scope">
                <span>{{ scope.emptyText }}</span>
            </template>
            <template slot="emptyfiltered" slot-scope="scope">
                <span>{{ scope.emptyFilteredText }}</span>
            </template>
            <!--<template slot="table-busy" class="text-center text-danger my-2">-->
                <!--<span>Loading...</span>-->
            <!--</template>-->
        </b-table>

        <b-pagination v-model="currentPage" :per-page="perPage" :total-rows="filteredTableData.length"></b-pagination>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import _ from 'lodash'

    export default {
        name: 'DataTable',
        data() {
            return {
                perPageSelectOptions: [10, 25, 50, 100],
                perPage: 10,
                currentPage: 1,
                filterInput: '',
                tableBusy: true
            }
        },
        computed: {
            ...mapState({
                filteredTableData: state => state.filteredTableData
            })
        },
        watch: {
            perPage() {
                this.currentPage = 1
            },
            filteredTableData() {
                this.currentPage = 1
            },
            filterInput() {
                if (this.filteredTableData.length > 0) {
                    this.tableBusy = true
                }

                _.debounce(() => {
                    this.filterTableData(this.filterInput).finally(() => {
                        this.tableBusy = false
                    })
                }, 300)()
            }
        },
        methods: {
            clearFilter() {
                this.filterInput = ''
            },
            ...mapActions({
                loadTableData: 'loadTableData',
                filterTableData: 'filterTableData'
            })
        },
        created() {
            this.loadTableData().finally(() => {
                this.tableBusy = false
            })
        }
    }
</script>

<style>
    .table {
        margin: 0 !important;
    }

    .table-responsive {
        margin-bottom: 1rem;
    }

    .table th,
    .table td {
        white-space: nowrap;
    }

    .actions-row > .actions-col {
        margin-bottom: 1rem;
    }
</style>