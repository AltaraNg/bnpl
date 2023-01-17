<template>
    <div class="flex items-center justify-between p-5  w-full">
        <div>
            <img src="../assets/images/logo2.png"/>
        </div>
        <div>
            <hamburger/>
        </div>
        
    </div>
</template>
<script>
import hamburger from '../assets/svgs/hamburger.vue';
export default{
    components:{
        hamburger
    }
}
</script>