<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-layout row wrap class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn text small color="grey" dark v-on="on" @click="sortBy('title')">
              <v-icon small left>folder</v-icon>
              <span class="caption text-lowercase">By project Name</span>
            </v-btn>
          </template>
          <span>Sort project by project name</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn text small color="grey" dark v-on="on" @click="sortBy('person')">
              <v-icon small left>person</v-icon>
              <span class="caption text-lowercase">By person</span>
            </v-btn>
          </template>
          <span>Sort project by person</span>
        </v-tooltip>
      </v-layout>
      <v-card
        flat
        v-for="(project,index) in projects "
        :key="index"
        :class="` project ${project.status}`"
      >
        <v-card-text>
          <v-layout row wrap class="pa-3">
            <v-flex xs12 md6>
              <div class="caption grey--text">Project Title</div>
              <div>{{project.title}}</div>
            </v-flex>
            <v-flex xs-6 sm2 md2>
              <div class="caption grey--text">Person</div>
              <div>{{project.person}}</div>
            </v-flex>
            <v-flex xs-6 sm2 md2>
              <div class="caption grey--text">Due By</div>
              <div>{{project.due}}</div>
            </v-flex>
            <v-flex xs-2 sm4 md2>
              <div>
                <v-chip
                  small
                  class="white--text caption my-2"
                  :color="get_color(project.status)"
                >{{project.status}}</v-chip>
              </div>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
    </v-container>
  </div>
</template>

<script>
import db from "@/fb";
export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      projects: []
    };
  },
  methods: {
    get_color(status) {
      if (status == "complete") return "#3cd1c2";
      else if (status == "ongoing") return "orange";
      else return "red";
    },
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    }
  },
  created() {
    console.log("created");

    db.collection("projects").onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === "added") {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });
  }
};
</script>
<style>
.project.complete {
  border-left: 4px solid #3cd1c2;
}

.project.ongoing {
  border-left: 4px solid orange;
}
.project.overdue {
  border-left: 4px solid red;
}
</style>