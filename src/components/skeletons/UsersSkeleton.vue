<template>
    <div class="q-pa-sm" >

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
                                
                <div v-if="skeleton === false">
                    <slot></slot>
                </div>
     

       

        

        
       
    </div>
</template>

<script>
export default {
    name: "UsersSkeleton",
    props: {
        skeleton: Boolean,
    },
    data(){
        return {
           
        }
    }
}
</script>