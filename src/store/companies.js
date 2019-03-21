import apiCompanies from './apiCompanies';
import suggesionApi from './suggesionApi';

export default {
  namespaced: true,
  state: {
    selectedCompanies: [],
    allCompaniesLength: null,
    paging: {
      currentPage: 1,
      rowsOnPage: 5,
      sortBy: 'inn',
      sortDesc: false
    },
    companyInfo: {
      inn: "",
      companyName: "",
      managerName: ""
    }
  },
  mutations: {
    setRowsOnPage(state, value) {
      state.paging.rowsOnPage = value;
    },
    updateSelectedCompanies(state) {
      state.selectedCompanies = apiCompanies.getSelectedCompanies(state.paging);
    },
    setAllCompaniesLength(state, length) {
      state.allCompaniesLength = length;
    },
    setInnToState(state, value) {
      state.companyInfo.inn = value;
    },
    setCompanyNameToState(state, value) {
      state.companyInfo.companyName = value;
    },
    setManagerNameToState(state, value) {
      state.companyInfo.managerName = value;
    },
    setCompanyInfoToState(state, companyInfo) {
      state.companyInfo = companyInfo;
    },
    resetCompanyInfoInState(state) {
      state.companyInfo.inn = '';
      state.companyInfo.companyName = '';
      state.companyInfo.managerName = '';
    },
    setCurrentPage(state, value) {
      state.paging.currentPage = value;
    },
    setSortBy(state, value) {
      state.paging.sortBy = value;
    },
    setSortDesc(state, value) {
      state.paging.sortDesc = value;
    }
  },
  actions: {
    setRowsOnPage({commit}, value) {
      commit('setRowsOnPage', value);
      commit('updateSelectedCompanies');
    },
    save({commit, dispatch, state}) {
      apiCompanies.save(state.companyInfo);
      dispatch('setAllCompaniesLength');
      dispatch('resetCompanyInfoInState');
      commit('updateSelectedCompanies');
    },
    delete({commit, dispatch}, companyInn) {
      apiCompanies.delete(companyInn);
      dispatch('setAllCompaniesLength');
      commit('updateSelectedCompanies');
    },
    update({commit}) {
      commit('updateSelectedCompanies');
    },
    setAllCompaniesLength({commit}) {
      let length = apiCompanies.getAllCompaniesLength();
      commit('setAllCompaniesLength', length);
    },
    setInnToState({commit}, value) {
      commit('setInnToState', value);
    },
    setCompanyNameToState({commit}, value) {
      commit('setCompanyNameToState', value);
    },
    setManagerNameToState({commit}, value) {
      commit('setManagerNameToState', value);
    },
    async setCompanyInfoToState({commit, state}, companyInn) {
      let companyInfo = await apiCompanies.setCompanyInfoToState(companyInn);
      commit('setCompanyInfoToState', companyInfo);
    },
    resetCompanyInfoInState({commit}) {
      commit('resetCompanyInfoInState');
    },
    setSelectedCompany({commit, state}, value) {
      commit('setCurrentPage', value);
      commit('updateSelectedCompanies');
    },
    setSortBy({commit}, value) {
      commit('setSortBy', value);
      commit('updateSelectedCompanies');
    },
    setSortDesc({commit}, value) {
      commit('setSortDesc', value);
      commit('updateSelectedCompanies');
    },
    getCompanyNameMatchItems({commit}, value) {
      return suggesionApi.getCompanyNameMatchItems(value);
    },
    getManagerNameMatchItems({commit}, value) {
      return suggesionApi.getManagerNameMatchItems(value);
    },
    async isCompanyInnExist({state}) {
      let index = await apiCompanies.getIndex(state.companyInfo);
      return index !== -1;
    },
  }
}
