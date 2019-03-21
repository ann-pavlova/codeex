export default {
  validateInn(inn) {
    if (inn === '') {
      return { valid: false, error: "Поле не должно быть пустым" };
    }

    return { valid: true, error: null };
  },
  validateCompanyName(companyName) {
    if (companyName === '') {
      return { valid: false, error: "Поле не должно быть пустым" };
    }
    return { valid: true, error: null };
  },
  validateManagerName(managerName) {
    if (managerName === '') {
      return { valid: false, error: "Поле не должно быть пустым" };
    }
    return { valid: true, error: null };
  }
}
