<template>
  <b-modal v-model="isActiveModal">
    <div slot="modal-header" class="w-100">
      <p class="float-left">Информация о компании</p>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="onClickCloseEditModal">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="d-block">
      <b-form @submit.prevent="onClickSaveCompany">
        <b-form-group
          label="ИНН"
          label-for="inn"
        >
          <b-form-input
            id="inn"
            type="text"
            v-model.trim="inn"
            :readonly="isCompanyEdit ? isCompanyEdit : false"/>
          <div class="error">{{ errors.inn }}</div>
        </b-form-group>
        <b-form-group
          label="Наименование"
          label-for="companyName"
        >
          <vue-bootstrap-typeahead
            v-model.trim="companyName"
            :data="selectedCompanyNameItems"
            ref="companyName"
          />
          <div class="error">{{ errors.companyName }}</div>
        </b-form-group>
        <b-form-group
          label="Руководитель"
          label-for="managerName"
        >
          <vue-bootstrap-typeahead
            v-model.trim="managerName"
            :data="selectedManagerNameItems"
            ref="managerName"
          />
          <div class="error">{{ errors.managerName }}</div>
        </b-form-group>
        <b-button class="mt-3" type="submit" variant="outline-primary" block>Сохранить</b-button>
      </b-form>
    </div>
    <div slot="modal-footer"></div>
  </b-modal>
</template>

<script>
  import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
  import validate from '../validations/validations';

	export default {
	  props: ['isCompanyEdit'],
    data() {
      return {
        isActiveModal: true,
        selectedCompanyNameItems: [],
        selectedManagerNameItems: [],
        valid: true,
        errors: {
          companyName: null,
          inn: null,
          managerName: null
        },
        message: null
      }
    },
    created() {
      this.getAutocompleteCompanyName();
      this.getAutocompleteManagerName();
    },
    computed: {
      inn: {
        get() {
          return this.$store.state.companies.companyInfo.inn;
        },
        set(value) {
          this.$store.dispatch('companies/setInnToState', value);
          this.validateInn();
        }
      },
      companyName: {
        get() {
          if(this.$refs.companyName) {
            this.$refs.companyName.inputValue = this.$store.state.companies.companyInfo.companyName;
          }
          return this.$store.state.companies.companyInfo.companyName;
        },
        set(value) {
          this.getAutocompleteCompanyName(value);
          this.$store.dispatch('companies/setCompanyNameToState', value);
          this.validateCompanyName();
        }
      },
      managerName:{
        get() {
          if(this.$refs.managerName) {
            this.$refs.managerName.inputValue = this.$store.state.companies.companyInfo.managerName;
          }
          return this.$store.state.companies.companyInfo.managerName;
        },
        set(value) {
          this.getAutocompleteManagerName(value);
          this.$store.dispatch('companies/setManagerNameToState', value);
          this.validateManagerName();
        }
      }
    },
    methods: {
	    validateInn() {
        let validInn = validate.validateInn(this.inn);
        this.errors.inn = validInn.error;
        if (this.valid) {
          this.valid = validInn.valid;
        }
      },
      validateCompanyName() {
        let validCompanyName = validate.validateCompanyName(this.companyName);
        this.errors.companyName = validCompanyName.error;
        if (this.valid) {
          this.valid = validCompanyName.valid;
        }
      },
      validateManagerName() {
        let validManagerName = validate.validateManagerName(this.managerName);
        this.errors.managerName = validManagerName.error;
        if (this.valid) {
          this.valid = validManagerName.valid;
        }
      },
      validate() {
        this.validateInn();
        this.validateCompanyName();
        this.validateManagerName();
      },
      resetError() {
        this.errors = {
          companyName: null,
          inn: null,
          managerName: null
        };
        this.valid = true;
      },
      onClickCloseEditModal() {
        this.$store.dispatch ('companies/resetCompanyInfoInState');
        this.$emit('onCloseEditModal');
        this.resetError();
      },
      async onClickSaveCompany() {
	      this.resetError();

	      this.validate();

        let isCompanyInnExist = await this.$store.dispatch('companies/isCompanyInnExist');
        if(isCompanyInnExist && !this.isCompanyEdit) {
          this.errors.inn = "Такой ИНН уже существует";
          this.valid = false;
        } else if(this.valid) {
          this.valid = true;
        }

        if(this.valid) {
          this.$store.dispatch('companies/save');
          this.$emit('onClickSaveCompany');
        }
      },
      getAutocompleteCompanyName(value) {
        if (value === undefined) {
          value = '';
        }

        clearTimeout(this.debounce);
        this.debounce = setTimeout(async() => {
          this.selectedCompanyNameItems = await this.$store.dispatch('companies/getCompanyNameMatchItems', value);
        }, 300);
      },
      getAutocompleteManagerName(value) {
        if (value === undefined) {
          value = '';
        }

        clearTimeout(this.debounce);
        this.debounce = setTimeout(async() => {
          this.selectedManagerNameItems = await this.$store.dispatch('companies/getManagerNameMatchItems', value);
        }, 300);
      }
    },
    components: {
      VueBootstrapTypeahead
    }
	}
</script>

<style scoped>
  .error {
    color: red;
    font-size: 11px;
  }
</style>
