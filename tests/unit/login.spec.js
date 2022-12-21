import { shallowMount } from "@vue/test-utils";
import LoginPage from "../../src/views/LoginPage.vue";
import RegisterPage from "../../src/views/RegisterPage.vue";
import HomeView from "../../src/views/HomeView.vue";

describe("LoginPage.vue", () => {
  it("this is login page", () => {
    const wrapper = shallowMount(LoginPage);
    expect(wrapper.isVisible()).toBe(true);
  });
});

describe("RegisterPage", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(LoginPage);
    wrapper.find("#register").trigger("click");
  });

  it("switch to resgiter page", () => {
    wrapper = shallowMount(RegisterPage);
    expect(wrapper.isVisible()).toBe(true);
  });
});

// #email:"meo@gmail.com";
// #password: "test1234";

// #email:"vue@gmail.com";
// #password: "firebase";
