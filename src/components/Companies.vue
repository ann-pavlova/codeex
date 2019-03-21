<template>
  <div>
    <b-button class="mb-3" variant="outline-primary" @click="onClickOpenCreateModal">Создать компанию</b-button>
    <EditCompany v-show="isEditModalActive" :isCompanyEdit="isCompanyEdit" @onCloseEditModal="closeEditModal" @onClickSaveCompany="onClickSaveCompany"></EditCompany>
    <div v-if="selectedCompanies.length > 0">
      <b-table
        ref="table"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        no-local-sorting
        id="companies"
        :bordered="true"
        :fields="tableHeader"
        :items="selectedCompanies"
        small>
        <template slot="icons" slot-scope="selectedCompanies">
          <b-button class="mt-1" variant="outline-primary" block
                    :inn="selectedCompanies.item.inn"
                    @click="onClickEditCompany">Редактировать
          </b-button>
          <b-button class="mt-1" variant="outline-primary" block
                    :inn="selectedCompanies.item.inn"
                    @click.prevent="onClickDeleteCompany">Удалить
          </b-button>
        </template>
      </b-table>
      <b-row>
        <b-col class="mb-3" sm="3">
          <b-form-select v-model="rowsOnPage" :options="countRowsVariant"/>
        </b-col>
        <b-col class="mb-3">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="rowsOnPage"
            aria-controls="companies"
          />
        </b-col>
      </b-row>
    </div>
    <div v-else>
      <p>Компаний пока не существует</p>
    </div>
  </div>
</template>

<script>
  import EditCompany from './EditCompany';

  export default {
    data() {
      return {
        isEditModalActive: false,
        isCompanyEdit: false,
        countRowsVariant: [
          { value: 5, text: 5 },
          { value: 10, text: 10 },
          { value: 25, text: 25 },
          { value: 50, text: 50 }
        ],
        tableHeader: [
          {key: 'inn', label: 'ИНН', sortable: true},
          {key: 'companyName', label: 'Название компании', sortable: true},
          {key: 'managerName', label: 'Руководитель', sortable: true},
          {key: 'icons', label: ''}
        ]
      }
    },
    created() {
      this.$store.dispatch('companies/update');
      this.$store.dispatch('companies/setAllCompaniesLength');
    },
    computed: {
      sortBy: {
        get() {
          return this.$store.state.companies.paging.sortBy;
        },
        set(value) {
          this.$store.dispatch('companies/setSortBy', value);
        }
      },
      sortDesc: {
        get() {
          return this.$store.state.companies.paging.sortDesc;
        },
        set(value) {
          this.$store.dispatch('companies/setSortDesc', value);
        }
      },
      currentPage: {
        get() {
          return this.$store.state.companies.paging.currentPage;
        },
        set(value) {
          this.$store.dispatch('companies/setSelectedCompany', value);
        }
      },
      rows() {
        return this.$store.state.companies.allCompaniesLength;
      },
      rowsOnPage: {
        get() {
          return this.$store.state.companies.paging.rowsOnPage;
        },
        set(value) {
          this.$store.dispatch('companies/setRowsOnPage', value);
          this.currentPage = 1;
        }
      },
      selectedCompanies() {
        return this.$store.state.companies.selectedCompanies;
      }
    },
    methods: {
      onClickOpenCreateModal() {
        this.isEditModalActive = true;
        this.isCompanyEdit = false;
      },
      onClickDeleteCompany($event) {
        this.$store.dispatch ('companies/delete', $event.currentTarget.getAttribute('inn'));
        if(this.selectedCompanies.length === 0 && this.currentPage > 1) {
          this.currentPage -= 1;
        }
      },
      onClickEditCompany($event) {
        this.$store.dispatch ('companies/setCompanyInfoToState', $event.currentTarget.getAttribute('inn'));
        this.isCompanyEdit = true;
        this.isEditModalActive = true;
      },
      closeEditModal() {
        this.isEditModalActive = false;
        this.isCompanyEdit = false;
      },
      onClickSaveCompany() {
        this.isEditModalActive = false;
        this.isCompanyEdit = false;
      }
    },

    components: {
      EditCompany
    }
  }
</script>

<style scoped>

</style>
