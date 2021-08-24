<template>
  <div class="">
    <div v-if="type === 'a'">
      <q-markup-table flat v-if="skeleton === true">
        <thead>
          <tr>
            <th class="text-left" style="width: 150px">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="n in 5" :key="n">
            <td class="text-left">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="50px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="35px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="65px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="25px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>

    <div v-if="type === 'b'">
      <transition-group
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        v-if="skeleton === true"
      >
        <q-list
          bordered
          class="rounded-borders q-mb-md"
          dense
          v-for="x in 6"
          :key="x"
        >
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-skeleton type="QAvatar" size="40px" />
            </q-item-section>

            <q-item-section>
              <q-skeleton type="text" style="width: 200px" />
              <q-skeleton type="text" style="width: 150px" />
            </q-item-section>
            <q-item-section side>
              <q-skeleton type="QAvatar" size="20px" />
            </q-item-section>
          </q-item>
        </q-list>
      </transition-group>
    </div>

    <div v-if="skeleton === false">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Skeleton",
  props: {
    skeleton: Boolean,
    type: String
  },
  data() {
    return {};
  }
};
</script>
