import { $ } from "./../../utils.js";

const Validator = {
  valid(formSelect, option = {}) {
    var formRules = {};
    function getParent (element, selector) {
      while (element.parentElement) {
        if (element.parentElement.matches(selector)) return element.parentElement;
        element = element.parentElement;
      }
    }
    const validatorRules = {
      required: (value) => {
        return value ? undefined : "Please enter this field.";
      },
      email: (value) => {
        const regex = /.{1}[a-z0-9_\.]{5,22}\@[a-z\.]{2,}\.\w{2,3}/;
        return regex.test(value) ? undefined : "Please enter your email.";
      },
      phone: (value) => {
        const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        return regex.test(value) ? undefined : "Please enter your email.";
      },
      max: (max) => (value) => {
        return value.length <= max ? undefined : `Please enter at most ${max} characters.`;
      },
      min: (min) => (value) => {
        return value.length >= min ? undefined : `Please enter at least ${min} characters.`;
      }
    }
    const formElement = $(formSelect);
    if (formElement) {
      let inputs = formElement.querySelectorAll("[id][rules]");
      inputs.forEach(input => {
        const rules = input.getAttribute("rules").split("|");
        rules.forEach(rule => {
          var ruleInfo;
          let isRuleHasValue = rule.includes(":");
          if (isRuleHasValue) {
            ruleInfo = rule.split(":");
            rule = ruleInfo[0];
          }
          var ruleFunc = validatorRules[rule];
          if (isRuleHasValue) ruleFunc = ruleFunc(ruleInfo[1]);
          if (Array.isArray(formRules[input.id])) {
            formRules[input.id].push(ruleFunc);
          } else {
            formRules[input.id] = [ruleFunc];
          }
        });
        input.addEventListener("blur", handleErrorMessage);
        input.addEventListener("input", event => {
          const formGroup = getParent(event.target, "#formGroup");
          if (formGroup.classList.contains("invalidForm")) {
            formGroup.classList.remove("invalidForm");
            const selectorError = formGroup.querySelector("#errorMessage");
              if (selectorError) selectorError.innerHTML = "";
          }
        });
      });
    }
    function handleErrorMessage (event) {
      const rules = formRules[event.target.id];
      var errorMessage;
      for (var rule of rules) {
        errorMessage = rule(event.target.value);
        if (errorMessage) break;
      }
      if (errorMessage) {
        const formGroup = getParent(event.target, "#formGroup");
        formGroup.classList.add("invalidForm");
        if (formGroup) {
          const selectorError = formGroup.querySelector("#errorMessage");
          if (selectorError) selectorError.innerHTML = errorMessage;
        }
      }
      return !errorMessage;
    }
    formElement.addEventListener("submit", event => {
      event.preventDefault();
      let inputs = formElement.querySelectorAll("[id][rules]");
      var isValid = true;
      inputs.forEach(input => {
        if (!handleErrorMessage({ target: input })) isValid = false;
      });
      if (isValid) {
        if (typeof option.onSubmit === 'function') {
          const enableInputs = formElement.querySelectorAll('[id][rules]');
          const formValue = Array.from(enableInputs).reduce((values, input) => {
            values[input.id] = input.value;
            return values;
          }, {});
          option.onSubmit(formValue);
        }
      }
    });
  }
}

export default Validator;