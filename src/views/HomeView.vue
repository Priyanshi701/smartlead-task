<template>
  <div class="">
    <q-layout view="hHh Lpr lff">
      <q-header elevated class="header">
        <q-toolbar class="flex justify-between">
          <q-img
            src="../assets/logo.png"
            spinner-color="white"
            style="height: 30px; max-width: 160px"
          />
          <div class="row inline flex-center">
            <q-btn
              unelevated
              class="upgrade text-capitalize"
              rounded
              label="Trail expires in 12 days"
              text-color="white"
              ><img src="../assets/star.png" alt="star"
            /></q-btn>
            <img
              src="../assets/Union.png"
              alt="Question"
              class="q-pl-sm"
              style="height: 18px"
            />
            <img
              src="../assets/gifts.png"
              alt="Question"
              class="q-pl-sm"
              style="height: 20px"
            />
            <q-btn round class="q-px-sm" @click="logout">
              <img
                src="../assets/Ellipse.png"
                alt="profile"
                style="height: 20px"
              />
              <q-tooltip> {{ store.state.user.email }} </q-tooltip>
            </q-btn>
          </div>
        </q-toolbar>
      </q-header>
      <q-drawer v-model="drawer" show-if-above :width="250" :breakpoint="500">
        <q-scroll-area class="fit relative">
          <q-list padding class="menu-list">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-img
                  src="../assets/leads.png"
                  style="width: 20px; height: 20px"
                />
              </q-item-section>

              <q-item-section class="text-weight-regular">
                All Leads
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-img
                  src="../assets/inbox.png"
                  style="width: 20px; height: 20px"
                />
              </q-item-section>

              <q-item-section class="text-weight-regular">
                Master Inbox
              </q-item-section>
            </q-item>
            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-img
                  src="../assets/campaign.png"
                  style="width: 20px; height: 20px"
                />
              </q-item-section>

              <q-item-section class="text-weight-regular">
                Email Campaigns
              </q-item-section>
            </q-item>
          </q-list>
          <q-list padding class="menu-list absolute-bottom">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-img
                  src="../assets/slack.png"
                  style="width: 20px; height: 20px"
                />
              </q-item-section>

              <q-item-section class="text-weight-regular">
                Join Slack Community
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-img
                  src="../assets/tutorial.png"
                  style="width: 20px; height: 20px"
                />
              </q-item-section>

              <q-item-section class="text-weight-regular">
                Smartlead Tutorials
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>
      <q-page-container class="bg-secondary">
        <q-page class="q-pa-xs">
          <div class="flex justify-between bg-white">
            <div class="q-pa-md">All Campaigns (24)</div>
            <div class="row inline items-center">
              <q-input
                dense
                v-model="search"
                outlined
                bg-color=""
                placeholder="Search Campaigns"
                type="search"
              >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
              <q-btn
                color="primary"
                dense
                icon="add"
                label="Add Campaign"
                class="q-ml-sm"
                padding="7px"
              />
            </div>
          </div>
          <q-table
            flat
            bordered
            dense
            ref="tableRef"
            :rows="filteredRows"
            :columns="columns"
            row-key="name"
            :selected-rows-label="getSelectedString"
            selection="multiple"
            :selected="selected"
            @selection="onSelection"
            table-class="abc"
          >
            <template v-slot:body="props">
              <q-tr :props="props" @click="onRowClick(props.row)">
                <q-td auto-width>
                  <q-checkbox v-model="props.selected" />
                </q-td>
                <q-td key="details" :props="props">
                  <div class="row items-center">
                    <q-circular-progress
                      show-value
                      font-size="12px"
                      :value="props.row.details.percent"
                      size="40px"
                      :thickness="0.22"
                      :color="
                        props.row.details.lastActivity === 'Stopped'
                          ? 'negative'
                          : 'positive'
                      "
                      track-color="grey-3"
                      class="q-ma-md"
                      ><div
                        v-if="
                          props.row.details.percent == 0 &&
                          props.row.details.lastActivity === 'Drafted'
                        "
                        style="height: 12px; width: 12px"
                      >
                        <q-img
                          src="../assets/drafted_icon.jpg"
                          style="max-width: 16px; height: 12px"
                        />
                      </div>
                      <div
                        v-else-if="props.row.details.lastActivity === 'Stopped'"
                        style="height: 12px; width: 12px"
                      >
                        <q-img
                          src="../assets/block_icon.png"
                          style="max-width: 16px; height: 12px"
                        />
                      </div>
                      <div v-else>{{ props.row.details.percent }}%</div>
                    </q-circular-progress>
                    <div class="column">
                      <div
                        class="text-weight-bold text-subtitle1"
                        style="color: #6e58f1"
                      >
                        {{ props.row.details.name
                        }}<q-btn
                          flat
                          round
                          icon="open_in_new"
                          color="blue-grey-3"
                          size="sm"
                        />
                      </div>
                      <div
                        class="row inline items-center text-subtitle2 text-weight-regular"
                        style="color: #282b42; opacity: 60%"
                      >
                        <span
                          class="dot q-mr-xs"
                          :style="
                            props.row.details.lastActivity == 'Sent'
                              ? 'background-color: green;'
                              : props.row.details.lastActivity == 'Drafted'
                              ? 'background-color:grey;'
                              : 'background-color:red;'
                          "
                        ></span
                        >{{ props.row.details.lastActivity }} on
                        {{ props.row.details.lastActivityDate }} |
                        {{ props.row.details.Sequence }} Sequences
                      </div>
                    </div>
                  </div>
                </q-td>
                <q-td key="report" :props="props">
                  <div
                    class="row inline items-center text-h6 text-weight-medium"
                  >
                    <div class="column q-py-md q-pr-md" style="color: #6e58f1">
                      {{ props.row.report.Sent }}
                      <p
                        class="row inline items-center text-subtitle2 text-weight-regular"
                        style="color: #282b42"
                      >
                        <span style="opacity: 60%" class="q-mr-xs">Sent</span>
                        <span
                          v-if="props.row.report.IsError"
                          style="width: 15px"
                          ><q-img
                            src="../assets/error.png"
                            style="max-width: 16px"
                        /></span>
                      </p>
                    </div>
                    <div class="column q-pa-md" style="color: #eeb728">
                      <div>
                        {{ props.row.report.Clicked
                        }}<span
                          style="color: #282b42; opacity: 60%"
                          class="text-caption"
                          >19.6%</span
                        >
                      </div>
                      <p
                        class="row inline items-center text-subtitle2 text-weight-regular"
                        style="color: #282b42"
                      >
                        <span style="opacity: 60%" class="q-mr-xs"
                          >Clicked</span
                        >
                        <span
                          v-if="props.row.report.IsError"
                          style="width: 15px"
                          ><q-img
                            src="../assets/error.png"
                            style="max-width: 16px"
                        /></span>
                      </p>
                    </div>
                    <div class="column q-pa-md" style="color: #bf51c1">
                      <div>
                        {{ props.row.report.Opened
                        }}<span
                          style="color: #282b42; opacity: 60%"
                          class="text-caption"
                          >39.8%</span
                        >
                      </div>
                      <p
                        class="row inline items-center text-subtitle2 text-weight-regular"
                        style="color: #282b42"
                      >
                        <span style="opacity: 60%" class="q-mr-xs">Opened</span>
                        <span
                          v-if="props.row.report.IsError"
                          style="width: 15px"
                          ><q-img
                            src="../assets/error.png"
                            style="max-width: 16px"
                        /></span>
                      </p>
                    </div>
                    <div class="column q-pa-md" style="color: #51c1c1">
                      <div>
                        {{ props.row.report.Replied
                        }}<span
                          style="color: #282b42; opacity: 60%"
                          class="text-caption"
                          >12.4%</span
                        >
                      </div>
                      <p
                        class="row inline items-center text-subtitle2 text-weight-regular"
                        style="color: #282b42"
                      >
                        <span style="opacity: 60%" class="q-mr-xs"
                          >Replied</span
                        >
                        <span
                          v-if="props.row.report.IsError"
                          style="width: 15px"
                          ><q-img
                            src="../assets/error.png"
                            style="max-width: 16px"
                        /></span>
                      </p>
                    </div>
                    <div class="column q-pa-md" style="color: #2cdb28">
                      <div>
                        {{ props.row.report.PositiveReply
                        }}<span
                          style="color: #282b42; opacity: 60%"
                          class="text-caption"
                          >0.0%</span
                        >
                      </div>
                      <p
                        class="row inline items-center text-subtitle2 text-weight-regular"
                        style="color: #282b42; opacity: 60%"
                      >
                        Positive Reply<q-btn
                          flat
                          round
                          icon="info_outlined"
                          color="blue-grey-3"
                          size="xs"
                        />
                      </p>
                    </div>
                  </div>
                </q-td>
                <q-td key="actions">
                  <div class="row inline items-center">
                    <q-btn
                      square
                      outline
                      icon="pause_circle_outline_outlined"
                      color="blue-grey-3"
                      size="md"
                      class="q-mr-md"
                    />
                    <q-btn
                      square
                      outline
                      icon="edit_outlined"
                      color="blue-grey-3"
                      size="md"
                      class="q-mr-md"
                    />
                    <q-btn
                      square
                      outline
                      icon="more_horiz_outlined"
                      color="blue-grey-3"
                      size="md"
                    />
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
function logout() {
  store.commit("signOut");
  router.push("/login");
}

const columns = [
  {
    name: "details",
    label: "Campaign Details",
    field: "details",
    align: "left",
  },
  {
    name: "report",
    label: "Report",
    field: "report",
    align: "left",
  },
  {
    name: "actions",
    label: "",
    field: "actions",
    align: "right",
  },
];

const rows = [
  {
    details: {
      percent: 30,
      name: "SW Zero Personalisation 1",
      lastActivity: "Sent",
      lastActivityDate: "15 Apr 2023",
      Sequence: "3",
    },
    report: {
      Sent: 520,
      Clicked: 39,
      Opened: 202,
      Replied: 4,
      PositiveReply: 0,
      IsError: false,
    },
  },
  {
    details: {
      percent: 0,
      name: "Untitled Campaign",
      lastActivity: "Drafted",
      lastActivityDate: "13 Apr 2023",
      Sequence: "3",
    },
    report: {
      Sent: 0,
      Clicked: 0,
      Opened: 0,
      Replied: 0,
      PositiveReply: 0,
      IsError: true,
    },
  },
  {
    details: {
      percent: 30,
      name: "SW Zero Personalisation 1",
      lastActivity: "Sent",
      lastActivityDate: "15 Apr 2023",
      Sequence: "3",
    },
    report: {
      Sent: 520,
      Clicked: 39,
      Opened: 202,
      Replied: 4,
      PositiveReply: 0,
      IsError: false,
    },
  },
  {
    details: {
      percent: 30,
      name: "SW Zero Personalisation 1",
      lastActivity: "Stopped",
      lastActivityDate: "15 Apr 2023",
      Sequence: "3",
    },
    report: {
      Sent: 520,
      Clicked: 39,
      Opened: 202,
      Replied: 4,
      PositiveReply: 0,
      IsError: false,
    },
  },
  {
    details: {
      percent: 30,
      name: "SW Zero Personalisation 1",
      lastActivity: "Sent",
      lastActivityDate: "15 Apr 2023",
      Sequence: "3",
    },
    report: {
      Sent: 520,
      Clicked: 39,
      Opened: 202,
      Replied: 4,
      PositiveReply: 0,
      IsError: false,
    },
  },
];

const selected = ref([]);
const search = ref("");
const filteredRows = computed(() => {
  return rows.filter((row) => {
    return row.details.name.toLowerCase().includes(search.value.toLowerCase());
  });
});
</script>
<style scoped lang="scss">
.header {
  background-color: #00056a;
}
.upgrade {
  opacity: 20%;
  background-color: white;
}
.search-input {
}

.dot {
  height: 5px;
  width: 5px;
  border-radius: 50%;
  display: inline-block;
}
</style>
