export default {
  getAllCompanies() {
    if (localStorage.getItem("companies") !== null) {
      return JSON.parse(localStorage.getItem("companies"));
    }
    return [];
  },
  getAllCompaniesLength() {
    let companies = this.getAllCompanies();
    return companies.length;
  },
  getSelectedCompanies(paging) {
    let companies = this.getAllCompanies();
    companies.sort(function(a, b) {
      if (paging.sortDesc) {
        if (a[paging.sortBy] > b[paging.sortBy]) {
          return -1;
        }
        if (a[paging.sortBy] < b[paging.sortBy]) {
          return 1;
        }
        return 0;
      } else {
        if (a[paging.sortBy] > b[paging.sortBy]) {
          return 1;
        }
        if (a[paging.sortBy] < b[paging.sortBy]) {
          return -1;
        }
        return 0;
      }
    });
    let selectedCompanies = [];
    let from = paging.rowsOnPage * (paging.currentPage - 1);
    for (let i = from; i < companies.length; i++) {
      if(i < (from + paging.rowsOnPage)) {
        selectedCompanies.push(companies[i]);
      }
    }
    return selectedCompanies;
  },
  saveAllCompanies(companies) {
    localStorage.setItem('companies', JSON.stringify(companies));
  },
  getIndex(companyInfo) {
    let companies = this.getAllCompanies();
    for (let i = 0; i < companies.length; i++) {
      if(companies[i].inn === companyInfo.inn) {
        return i;
      }
    }

    return -1;
  },
  save(companyInfo) {
    let companies = this.getAllCompanies();
    let index = this.getIndex(companyInfo);
    let company = {
      inn: companyInfo.inn,
      companyName: companyInfo.companyName,
      managerName: companyInfo.managerName
    };

    if(index !== -1) {
      companies[index] = company;
    } else {
      companies.push(company);
    }
    this.saveAllCompanies(companies);
  },
  delete(companyInn) {
    let companies = this.getAllCompanies();
    for (let i = 0; i < companies.length; i++) {
      if(companies[i].inn === companyInn) {
        companies.splice(i, 1);
        this.saveAllCompanies(companies);
        return;
      }
    }
  },
  setCompanyInfoToState(companyInn) {
    let companies = this.getAllCompanies();
    for (let i = 0; i < companies.length; i++) {
      if(companies[i].inn === companyInn) {
        return {
          inn: companies[i].inn,
          companyName: companies[i].companyName,
          managerName: companies[i].managerName
        };
      }
    }
  }
}

