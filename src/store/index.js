import { createStore } from "vuex";
export default createStore({
  state: {
    user: {
      name: "",
      email: "",
    },
    signedIn: false,
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.signedIn = true;
    },
    signOut(state) {
      state.user = {
        name: "",
        email: "",
      };
      state.signedIn = false;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    signOut({ commit }) {
      commit("signOut");
    },
  },
  modules: {},
});
