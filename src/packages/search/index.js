import vEleSearch from './src/search';

vEleSearch.install = function (Vue) {
    Vue.component(vEleSearch.name, vEleSearch);
};

export default vEleSearch;
