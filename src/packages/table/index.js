import vEleTable from './src/table';

vEleTable.install = function (Vue) {
    Vue.component(vEleTable.name, vEleTable);
};

export default vEleTable;
