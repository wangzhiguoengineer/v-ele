import vElTable from './src/table';

vElTable.install = function (Vue) {
    Vue.component(vElTable.name, vElTable);
};

export default vElTable;
