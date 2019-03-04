<template>
    <div id="app">
        <b-container>
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Text" active>
                        <simple-text/>
                    </b-tab>
                    <b-tab title="Table">
                        <data-table/>
                    </b-tab>
                </b-tabs>
            </b-card>
        </b-container>
    </div>
</template>

<script>
    import SimpleText from './components/SimpleText'
    import DataTable from "./components/DataTable";

    export default {
        name: 'App',
        components: {DataTable, SimpleText}
    }
</script>

<style scoped>
    :focus {
        outline: none;
    }

    #app {
        margin-top: 1rem;
    }
</style>
