<template>
  <div class="">
    <q-layout view="lHh Lpr lFf">
      <q-header elevated class="header">
        <q-toolbar>
          <q-img
            src="../assets/logo.png"
            spinner-color="white"
            style="height: 30px; max-width: 160px"
          />
        </q-toolbar>
      </q-header>

      <q-page-container class="bg-secondary">
        <q-page class="q-ma-lg flex flex-center">
          <q-card class="my-card">
            <q-card-section class="flex flex-center">
              <div class="text-weight-bold text-h5">
                Welcome to Smartlead.ai
              </div>
              <div class="text-weight-regular text-subtitle2">
                Log in to your account
              </div>
            </q-card-section>
            <q-card-section>
              <div class="text-weight-regular text-subtitle2 input-label">
                Email
              </div>
              <q-input v-model="email" type="email" dense outlined />
              <div
                class="text-weight-regular text-subtitle2 input-label flex justify-between q-mt-md"
              >
                <div>Password</div>
                <div class="text-primary">Forgot Password?</div>
              </div>
              <q-input
                v-model="password"
                :type="!showPassword ? 'password' : ''"
                dense
                outlined
              >
                <template v-slot:append>
                  <q-btn
                    flat
                    @click="showPassword = !showPassword"
                    class="text-capitalize"
                    >{{ showPassword ? "Hide" : "Show" }}</q-btn
                  >
                </template>
              </q-input>
              <q-btn
                flat
                class="text-weight-medium text-subtitle2 flex flex-center text-capitalize full-width q-mt-md no-shadow"
                style="background-color: #edeef8; color: #a9abc1"
                @click="authenticateUser"
                >Sign in</q-btn
              >
            </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const usersArray = [
  { id: 1, email: "John@abc.com", password: "123" },
  { id: 2, email: "Priya@abc.com", password: "456" },
  { id: 3, email: "Joseph@abc.com", password: "789" },
];
const router = useRouter();
const store = useStore();
const email = ref("");
const password = ref("");
const showPassword = ref(false);

const authenticateUser = () => {
  const user = usersArray.find(
    (user) => user.email === email.value && user.password === password.value
  );
  if (user) {
    store.commit("setUser", user);
    router.push("/home");
  } else {
    alert("Invalid credentials");
  }
};
</script>
<style scoped lang="scss">
.header {
  background-color: #00056a;
}
.my-card {
  border-radius: 3px;
  padding: 20px;
  width: 400px;
}
.input-label {
  color: #7a7d9c;
}
</style>
